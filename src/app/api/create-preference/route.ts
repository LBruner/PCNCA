import { NextResponse } from "next/server";
import { MercadoPagoConfig, Preference } from "mercadopago";
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
});
import { criarVendaPendente } from "@/actions/vendas";
import { db } from "@/db";


export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { items, shippingCost } = body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json(
        { error: "Items são obrigatórios" },
        { status: 400 }
      );
    }

    // 1. BUSCAR INFORMAÇÕES DOS PRODUTOS (incluindo empresaId)
    const estoqueIds = items.map((item: any) => parseInt(item.id));
    const produtos = await db.estoque.findMany({
      where: {
        id: { in: estoqueIds }
      },
      select: {
        id: true,
        produto: true,
        preco: true,
        empresaId: true,
        imagemLink: true,
      }
    });

    // 2. AGRUPAR ITEMS POR EMPRESA
    const itemsPorEmpresa = new Map<number | null, any[]>();
    
    items.forEach((item: any) => {
      const produtoInfo = produtos.find(p => p.id === parseInt(item.id));
      if (!produtoInfo) return;

      console.log("Produto info:", produtoInfo);

      const empresaId = produtoInfo.empresaId;
      
      if (!itemsPorEmpresa.has(empresaId)) {
        itemsPorEmpresa.set(empresaId, []);
      }
      
      itemsPorEmpresa.get(empresaId)!.push({
        ...item,
        estoqueId: produtoInfo.id,
        empresaId: empresaId,
      });
    });

    // 3. CRIAR UMA VENDA PARA CADA EMPRESA
    const vendasCriadas = [];
    
    for (const [empresaId, itensEmpresa] of itemsPorEmpresa) {
      const vendaId = await criarVendaPendente({
        itens: itensEmpresa.map((item: any) => ({
          estoqueId: item.estoqueId,
          produto: item.title,
          quantidade: item.quantity,
          preco: item.unit_price,
          imagemLink: item.picture_url,
        })),
        observacoes: body.observacoes,
        compradorId: body.compradorId,
        empresaId: empresaId!, 
      });

      vendasCriadas.push({
        vendaId,
        empresaId,
        itens: itensEmpresa,
      });

      console.log(`✅ Venda ${vendaId} criada para empresa ${empresaId || 'sem empresa'}`);
    }

    // 4. CRIAR PREFERÊNCIA DO MERCADOPAGO COM TODOS OS ITEMS
    // Mas salvar metadata com múltiplas vendas
    const preference = new Preference(client);
    
    const parsedShippingCost =
      typeof shippingCost === "number" && !Number.isNaN(shippingCost)
        ? shippingCost
        : 0;
    const preferenceData: any = {
      items: items.map((item: any) => ({
        id: item.id?.toString(),
        title: item.title,
        quantity: item.quantity,
        unit_price: item.unit_price,
        currency_id: "BRL",
        picture_url: item.picture_url,
      })),

      // Usar array de vendas como referência
      external_reference: JSON.stringify({
        vendas: vendasCriadas.map(v => v.vendaId),
        type: 'multiple_vendors'
      }),

      back_urls: {
        success: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?vendas=${vendasCriadas.map(v => v.vendaId).join(',')}`,
        failure: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/failure?vendas=${vendasCriadas.map(v => v.vendaId).join(',')}`,
        pending: `${process.env.NEXT_PUBLIC_APP_URL}/ecommerce`
      },

      auto_return: "approved",

      notification_url: `https://kennith-cokelike-kerrie.ngrok-free.dev/api/webhook/mercadopago`,

      payment_methods: {
        excluded_payment_methods: [],
        excluded_payment_types: [],
        installments: 12,
      },

      metadata: {
        vendas_ids: vendasCriadas.map(v => v.vendaId),
        empresas_ids: vendasCriadas.map(v => v.empresaId),
        created_at: new Date().toISOString(),
        shipping_cost: parsedShippingCost,
      },
    };



    if (parsedShippingCost > 0) {
      preferenceData.shipments = {
        cost: parsedShippingCost,
        mode: "not_specified",
      };
    }

    const response = await preference.create({ body: preferenceData });

    console.log("✅ Preferência criada:", response.id);

    return NextResponse.json({
      id: response.id,
      vendas: vendasCriadas,
    });

  } catch (error: any) {
    console.error("❌ Erro ao criar preferência:", error);

    return NextResponse.json(
      {
        error: "Erro ao processar pagamento",
        details: error.message
      },
      { status: 500 }
    );
  }
}
