import { NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});

import { db } from "@/db";

export async function POST(req: Request) {
  let webhookLogId: number | null = null;

  try {
    const body = await req.json();
    const jsonBody = JSON.stringify(body);
    console.log(jsonBody);

    console.log("Webhook recebido:", body);

    const webhookLog = await db.webhookLog.create({
      data: {
        tipo: body.type || "unknown",
        action: body.action || null,
        paymentId: body?.data?.id || null,
        requestBody: body,
        responseStatus: 200,
      },
    });
    webhookLogId = webhookLog.id;

    if (body.type !== "payment") {
      console.log("ℹ️ Tipo de webhook não é pagamento:", body.type);
      return NextResponse.json({ ok: true, message: "Tipo ignorado" });
    }

    const paymentId = body?.data?.id;

    if (!paymentId) {
      console.warn("⚠️ Webhook sem ID de pagamento:", body);
      await db.webhookLog.update({
        where: { id: webhookLogId },
        data: { 
          erro: "Sem ID de pagamento",
          processadoEm: new Date() 
        },
      });
      return NextResponse.json({ ok: false, reason: "Sem ID" });
    }

    const payment = new Payment(client);
    const result = await payment.get({ id: paymentId });

    console.log("Detalhes do pagamento:", result);

    const metadataPayload = (result as any)?.metadata as Record<string, unknown> | undefined;
    const normalizeShippingValue = (value: unknown): number | null => {
      if (typeof value === "number" && !Number.isNaN(value)) {
        return value;
      }
      if (typeof value === "string") {
        const parsed = Number(value);
        return Number.isNaN(parsed) ? null : parsed;
      }
      return null;
    };

    const shippingCostCandidates = [
      metadataPayload?.["shipping_cost"],
      metadataPayload?.["shippingCost"],
      (result as any)?.shipments?.cost,
      (result as any)?.shipping_amount,
    ];

    const shippingCost =
      shippingCostCandidates
        .map(normalizeShippingValue)
        .find((value): value is number => value !== null) ?? null;

    const externalRef = result.external_reference;
    let vendasIds: number[] = [];
    let isMultipleVendors = false;

    if (externalRef) {
      try {
        const parsed = JSON.parse(externalRef);
        if (parsed.vendas && Array.isArray(parsed.vendas)) {
          vendasIds = parsed.vendas;
          isMultipleVendors = parsed.type === 'multiple_vendors';
          console.log(`Múltiplas vendas detectadas: ${vendasIds.join(', ')}`);
        } else {
          // Fallback: referência única
          vendasIds = [parseInt(externalRef)];
        }
      } catch {
        // Se não for JSON, é uma venda única
        vendasIds = [parseInt(externalRef)];
      }
    }

    // Buscar informações das vendas
    const vendas = await db.venda.findMany({
      where: { 
        id: { in: vendasIds } 
      },
      include: { 
        estoques: {
          include: {
            estoque: true
          }
        }
      },
    });

    if (vendas.length === 0) {
      throw new Error("Nenhuma venda encontrada para o pagamento");
    }

    console.log(`📋 ${vendas.length} venda(s) encontrada(s)`);

    // Calcular valores totais
    const valorTotal = result.transaction_amount || 0;
    const taxaMercadoPago = result.fee_details?.reduce(
      (sum, fee) => sum + (fee.amount || 0), 
      0
    ) || 0;
    const valorLiquido = valorTotal - taxaMercadoPago;

    // Verificar se a transação já existe
    let transacao = await db.transacao.findUnique({
      where: { mercadoPagoPaymentId: paymentId.toString() },
    });

    if (transacao) {
      // Atualizar transação existente
      console.log("🔄 Atualizando transação existente:", transacao.id);
      
      transacao = await db.transacao.update({
        where: { id: transacao.id },
        data: {
          status: result.status || "unknown",
          statusDetail: result.status_detail || null,
          dataAtualizacao: new Date(),
          ...(result.status === "approved" && {
            dataAprovacao: result.date_approved 
              ? new Date(result.date_approved) 
              : new Date(),
          }),
          metadata: {
            ...(result as any),
            vendasIds,
            isMultipleVendors,
            shippingCost,
          },
        },
      });

      await db.webhookLog.update({
        where: { id: webhookLogId },
        data: { 
          transacaoId: transacao.id,
          processadoEm: new Date() 
        },
      });

    } else {
      // Criar nova transação
      console.log("✨ Criando nova transação para pagamento:", paymentId);

      // IMPORTANTE: Para múltiplas vendas, usar a primeira venda como referência principal
      // Você pode ajustar essa lógica conforme necessário
      const vendaPrincipal = vendas[0];

      transacao = await db.transacao.create({
        data: {
          mercadoPagoPaymentId: paymentId.toString(),
          mercadoPagoOrderId: result.order?.id?.toString() || null,
          externalReference: result.external_reference || null,
          
          status: result.status || "pending",
          statusDetail: result.status_detail || null,
          paymentType: result.payment_type_id || "unknown",
          paymentMethod: result.payment_method_id || null,
          
          valorTotal,
          valorLiquido,
          taxaMercadoPago,
          parcelasQuantidade: result.installments || 1,
          
          dataAprovacao: result.status === "approved" && result.date_approved
            ? new Date(result.date_approved)
            : null,
          
          pagadorEmail: result.payer?.email || null,
          pagadorNome: result.payer?.first_name 
            ? `${result.payer.first_name} ${result.payer.last_name || ""}`.trim()
            : null,
          pagadorDocumento: result.payer?.identification?.number || null,
          pagadorTelefone: result.payer?.phone?.number || null,
          
          // Usar venda principal como referência
          vendaId: vendaPrincipal.id,
          empresaId: vendaPrincipal.empresaId,
          usuarioId: vendaPrincipal.usuarioId,
          
          metadata: {
            ...result as any,
            vendasIds, // Adicionar array de vendas ao metadata
            isMultipleVendors,
            shippingCost,
          },
        },
      });

      const allItems = vendas.flatMap(venda => 
        venda.estoques.map(vendaEstoque => ({
          vendaId: venda.id,
          estoque: vendaEstoque.estoque,
          quantidade: vendaEstoque.quantidade,
        }))
      );

      if (allItems.length > 0) {
        await Promise.all(
          allItems.map(async (item) => {
            return db.transacaoItem.create({
              data: {
                transacaoId: transacao!.id,
                estoqueId: item.estoque.id,
                produtoNome: item.estoque.produto,
                quantidade: item.quantidade,
                precoUnitario: item.estoque.preco,
                precoTotal: item.estoque.preco * item.quantidade,
              },
            });
          })
        );
      }

      await db.webhookLog.update({
        where: { id: webhookLogId },
        data: { 
          transacaoId: transacao.id,
          processadoEm: new Date() 
        },
      });

      console.log("✅ Transação criada com sucesso:", transacao.id);
      console.log(`📦 ${allItems.length} item(s) adicionado(s)`);
    }

    // Processar status do pagamento para TODAS as vendas
    if (result.status === "approved") {
      console.log(`✅ Pagamento aprovado para ID: ${paymentId}`);
      
      // NOVO: Atualizar status de TODAS as vendas
      await Promise.all(
        vendasIds.map(async (vendaId) => {
          return db.venda.update({
            where: { id: vendaId },
            data: { 
              status: "PAGO",
              dataPagamento: new Date(),
            },
          });
        })
      );

        console.log(`✅ Pagamento aprovado para ID: ${paymentId}`);
      
      // Atualizar status de TODAS as vendas
      if (vendasIds.length > 0) {
        await db.venda.updateMany({
          where: { id: { in: vendasIds } },
          data: { 
            status: "PAGO",
            dataPagamento: new Date(),
          },
        });

        console.log(`✅ ${vendasIds.length} venda(s) atualizada(s) para PAGO`);
        
        const vendas = await db.venda.findMany({
          where: { id: { in: vendasIds } },
          include: { 
            estoques: {
              include: {
                estoque: true
              }
            }
          },
        });

        for (const venda of vendas) {
          for (const vendaEstoque of venda.estoques) {
            const estoque = vendaEstoque.estoque;
            const quantidadeVendida = vendaEstoque.quantidade;

            // Atualizar quantidade no estoque
            await db.estoque.update({
              where: { id: estoque.id },
              data: {
                quantidade: {
                  decrement: quantidadeVendida
                },
                foiUtilizado: true, // Marcar como utilizado
              },
            });

            console.log(`📦 Estoque atualizado: ${estoque.produto} - Quantidade reduzida em ${quantidadeVendida}`);
          }
        }

        console.log(`✅ Estoque atualizado para ${vendas.length} venda(s)`);
      }


    } else if (result.status === "rejected") {
      console.log(`❌ Pagamento rejeitado: ${result.status_detail}`);
      
      // NOVO: Atualizar status de TODAS as vendas
      await Promise.all(
        vendasIds.map(async (vendaId) => {
          return db.venda.update({
            where: { id: vendaId },
            data: { status: "CANCELADO" },
          });
        })
      );

      console.log(`❌ ${vendasIds.length} venda(s) cancelada(s)`);

    } else if (result.status === "pending") {
      console.log(`⏳ Pagamento pendente: ${result.status_detail}`);
      
      // Manter vendas como PENDENTE
      await Promise.all(
        vendasIds.map(async (vendaId) => {
          return db.venda.update({
            where: { id: vendaId },
            data: { status: "PENDENTE" },
          });
        })
      );

    } else {
      console.log(`⚙️ Pagamento com status: ${result.status}`);
    }

    return NextResponse.json({ 
      received: true, 
      transacaoId: transacao.id,
      vendasProcessadas: vendasIds.length,
    });

  } catch (error: any) {
    console.error("❌ Erro no webhook:", error);

    // Atualizar log com erro
    if (webhookLogId) {
      await db.webhookLog.update({
        where: { id: webhookLogId },
        data: {
          erro: error.message,
          responseStatus: 500,
          processadoEm: new Date(),
        },
      }).catch(console.error);
    }

    return NextResponse.json({ 
      error: error.message 
    }, { 
      status: 500 
    });
  }
}
