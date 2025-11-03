import {pegaComprasUsuario} from "@/actions/ecommerce";
import type {TransacaoComVenda} from "@/actions/ecommerce";
import Image from "next/image";
import {Prisma} from "@prisma/client";

type MetadataItem = {
  id?: string;
  title?: string;
  quantity?: number;
  unit_price?: number;
};

type VendaProduto = NonNullable<TransacaoComVenda["venda"]>["estoques"][number];

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  dateStyle: "short",
  timeStyle: "short",
});

const quantityFormatter = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 3,
});

const statusConfig: Record<string, {bg: string; text: string; label: string}> = {
  approved: {
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    text: "text-emerald-700 dark:text-emerald-400",
    label: "Aprovado"
  },
  pending: {
    bg: "bg-amber-50 dark:bg-amber-950/30",
    text: "text-amber-700 dark:text-amber-400",
    label: "Pendente"
  },
  rejected: {
    bg: "bg-rose-50 dark:bg-rose-950/30",
    text: "text-rose-700 dark:text-rose-400",
    label: "Rejeitado"
  },
  cancelled: {
    bg: "bg-slate-50 dark:bg-slate-800/50",
    text: "text-slate-700 dark:text-slate-300",
    label: "Cancelado"
  },
  refunded: {
    bg: "bg-blue-50 dark:bg-blue-950/30",
    text: "text-blue-700 dark:text-blue-400",
    label: "Reembolsado"
  },
};

const normalizeShippingValue = (value: Prisma.JsonValue | undefined): number | null => {
  if (typeof value === "number" && !Number.isNaN(value)) {
    return value;
  }
  if (typeof value === "string") {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }
  return null;
};

const extractShippingCost = (metadata: TransacaoComVenda["metadata"]): number | null => {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
    return null;
  }

  const jsonMetadata = metadata as Prisma.JsonObject;

  const nestedMetadata =
    jsonMetadata.metadata && typeof jsonMetadata.metadata === "object" && !Array.isArray(jsonMetadata.metadata)
      ? (jsonMetadata.metadata as Prisma.JsonObject)
      : undefined;

  const shipmentsObject =
    jsonMetadata.shipments && typeof jsonMetadata.shipments === "object" && !Array.isArray(jsonMetadata.shipments)
      ? (jsonMetadata.shipments as Prisma.JsonObject)
      : undefined;

  const nestedShipments =
    nestedMetadata?.shipments && typeof nestedMetadata.shipments === "object" && !Array.isArray(nestedMetadata.shipments)
      ? (nestedMetadata.shipments as Prisma.JsonObject)
      : undefined;

  const candidates = [
    jsonMetadata.shippingCost,
    jsonMetadata.shipping_cost,
    jsonMetadata.shipping_amount,
    nestedMetadata?.shippingCost,
    nestedMetadata?.shipping_cost,
    nestedMetadata?.shipping_amount,
    shipmentsObject?.cost,
    nestedShipments?.cost,
  ];

  for (const candidate of candidates) {
    const normalized = normalizeShippingValue(candidate);
    if (normalized !== null) {
      return normalized;
    }
  }

  return null;
};

const extractItems = (metadata: TransacaoComVenda["metadata"]): MetadataItem[] => {
  if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) return [];

  const rawMetadata = metadata as Prisma.JsonObject;
  const additionalInfo = rawMetadata?.additional_info as Prisma.JsonObject | undefined;
  const rawItems = additionalInfo?.items;

  if (!Array.isArray(rawItems)) return [];

  return rawItems.map((item) => {
    if (!item || typeof item !== "object") return {};

    const itemRecord = item as Record<string, unknown>;
    const quantity = itemRecord.quantity;
    const unitPrice = itemRecord.unit_price;

    return {
      id: typeof itemRecord.id === "string" ? itemRecord.id : undefined,
      title: typeof itemRecord.title === "string" ? itemRecord.title : undefined,
      quantity:
        typeof quantity === "number"
          ? quantity
          : typeof quantity === "string" && !Number.isNaN(Number(quantity))
            ? Number(quantity)
            : undefined,
      unit_price:
        typeof unitPrice === "number"
          ? unitPrice
          : typeof unitPrice === "string" && !Number.isNaN(Number(unitPrice))
            ? Number(unitPrice)
            : undefined,
    } satisfies MetadataItem;
  });
};

const parseExternalReference = (externalReference: string | null) => {
  if (!externalReference) return null;

  try {
    return JSON.parse(externalReference) as Record<string, unknown>;
  } catch (error) {
    return null;
  }
};

const getStatusConfig = (status: string) =>
  statusConfig[status.toLowerCase()] ?? {
    bg: "bg-slate-50 dark:bg-slate-800/50",
    text: "text-slate-700 dark:text-slate-300",
    label: status.toUpperCase()
  };

const MinhasComprasPage = async () => {
  const comprasUsuario = await pegaComprasUsuario();
  const comprasOrdenadas = [...comprasUsuario].sort(
    (a, b) => b.dataCriacao.getTime() - a.dataCriacao.getTime(),
  );

  return (
    <div className="h-auto bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 pt-6 pb-12 dark:bg-customDarkBg">
      <div className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8 lg:pb-12">
        <div className="mb-8 space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Minhas Compras
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Acompanhe o histórico completo de suas transações
          </p>
        </div>

        {comprasOrdenadas.length === 0 ? (
          <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-white/60 px-8 py-16 text-center backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/60">
            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
              <svg className="h-10 w-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
              Nenhuma compra realizada
            </h2>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Suas compras aparecerão aqui assim que forem concluídas
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {comprasOrdenadas.map((transacao) => {
              const items = extractItems(transacao.metadata);
              const externalReference = parseExternalReference(transacao.externalReference ?? null);
              const venda = transacao.venda;
              const produtosVenda: VendaProduto[] = venda?.estoques ?? [];
              const statusInfo = getStatusConfig(transacao.status);
              const shippingCost = extractShippingCost(transacao.metadata);
              const valorLiquidoBase =
                typeof transacao.valorLiquido === "number" && !Number.isNaN(transacao.valorLiquido)
                  ? transacao.valorLiquido
                  : null;
              const valorLiquidoComFrete =
                (valorLiquidoBase ?? 0) + (typeof shippingCost === "number" ? shippingCost : 0);
              const mostrarValorLiquido = valorLiquidoBase !== null || typeof shippingCost === "number";

              return (
                <article
                  key={transacao.id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                >
                  {/* Header com gradiente sutil */}
                  <div className="border-b border-slate-100 bg-gradient-to-r from-slate-50 to-white p-6 dark:border-slate-800 dark:from-slate-900 dark:to-slate-900/80">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                            Pedido #{transacao.id}
                          </span>
                          <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusInfo.bg} ${statusInfo.text}`}>
                            {statusInfo.label}
                          </span>
                        </div>
                        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                          {currencyFormatter.format(valorLiquidoComFrete)}
                        </h2>
                        {typeof shippingCost === "number" && (
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            Frete:{" "}
                            <span className="font-semibold text-slate-900 dark:text-white">
                              {currencyFormatter.format(shippingCost)}
                            </span>
                          </p>
                        )}
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {dateFormatter.format(transacao.dataCriacao)}
                        </p>
                      </div>

                      {transacao.dataAprovacao && (
                        <div className="flex items-center gap-2 text-sm text-emerald-600 dark:text-emerald-400">
                          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>Aprovado {dateFormatter.format(transacao.dataAprovacao)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    {/* Grid de informações principais */}
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="space-y-1 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                        <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Pagamento
                        </dt>
                        <dd className="text-sm font-medium text-slate-900 dark:text-white">
                          {transacao.paymentType === 'credit_card' ? 'Cartão de Crédito' :
                           transacao.paymentType === 'debit_card' ? 'Cartão de Débito' :
                           transacao.paymentType === 'pix' ? 'PIX' :
                           transacao.paymentType === 'boleto' ? 'Boleto Bancário' :
                           transacao.paymentType === 'account_money' ? 'Saldo Mercado Pago' :
                           transacao.paymentType ?? 'Outro'}
                        </dd>
                      </div>

                      <div className="space-y-1 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                        <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Parcelas
                        </dt>
                        <dd className="text-sm font-medium text-slate-900 dark:text-white">
                          {transacao.parcelasQuantidade ?? 1}x
                        </dd>
                      </div>

                      <div className="space-y-1 rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-800/40">
                        <dt className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          Valor Líquido
                        </dt>
                        <dd className="text-sm font-medium text-slate-900 dark:text-white">
                          {mostrarValorLiquido
                            ? currencyFormatter.format(valorLiquidoComFrete)
                            : "—"}
                        </dd>
                      </div>
                    </div>

                    {/* Informações do pagador e identificadores */}
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-3 rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-slate-100/50 p-5 dark:border-slate-800 dark:from-slate-800/40 dark:to-slate-900/40">
                        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          Pagador
                        </h3>
                        <div className="space-y-1">
                          <p className="font-medium text-slate-900 dark:text-white">
                            {transacao.pagadorNome ?? transacao.pagadorEmail ?? "Não informado"}
                          </p>
                          {transacao.pagadorDocumento && (
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              CPF/CNPJ: {transacao.pagadorDocumento}
                            </p>
                          )}
                          {transacao.pagadorTelefone && (
                            <p className="text-xs text-slate-600 dark:text-slate-400">
                              Tel: {transacao.pagadorTelefone}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3 rounded-2xl border border-slate-100 bg-gradient-to-br from-slate-50 to-slate-100/50 p-5 dark:border-slate-800 dark:from-slate-800/40 dark:to-slate-900/40">
                        <h3 className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                          </svg>
                          Identificadores
                        </h3>
                        <div className="space-y-1">
                          <p className="font-mono text-sm font-medium text-slate-900 dark:text-white">
                            MP #{transacao.mercadoPagoPaymentId}
                          </p>
                          {transacao.mercadoPagoOrderId && (
                            <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
                              Order: {transacao.mercadoPagoOrderId}
                            </p>
                          )}
                          {transacao.vendaId && (
                            <p className="font-mono text-xs text-slate-600 dark:text-slate-400">
                              Venda #{transacao.vendaId}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Produtos da venda */}
                    {produtosVenda.length > 0 && (
                      <div className="space-y-4">
                        <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                          </svg>
                          Produtos
                        </h3>
                        <div className="space-y-3">
                          {produtosVenda.map((produto) => {
                            const estoqueDetalhes = produto.estoque;
                            const subtotal = produto.quantidade * produto.precoUnitario;
                            const descricaoPreview =
                              estoqueDetalhes?.descricao && estoqueDetalhes.descricao.length > 120
                                ? `${estoqueDetalhes.descricao.slice(0, 120)}...`
                                : estoqueDetalhes?.descricao ?? null;

                            return (
                              <div
                                key={`${transacao.id}-produto-${produto.id}`}
                                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 transition-all hover:shadow-md dark:border-slate-800 dark:bg-slate-900/60 sm:flex-row sm:items-center"
                              >
                                <div className="flex flex-1 items-start gap-4">
                                  {estoqueDetalhes?.imagemLink ? (
                                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                                      <Image
                                        src={estoqueDetalhes.imagemLink}
                                        alt={estoqueDetalhes.produto ?? "Produto"}
                                        width={80}
                                        height={80}
                                        className="h-full w-full object-cover"
                                      />
                                    </div>
                                  ) : (
                                    <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                                      <svg className="h-8 w-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                      </svg>
                                    </div>
                                  )}

                                  <div className="min-w-0 flex-1 space-y-1">
                                    <h4 className="font-semibold text-slate-900 dark:text-white">
                                      {estoqueDetalhes?.produto ?? "Produto"}
                                    </h4>
                                    {descricaoPreview && (
                                      <p className="text-sm text-slate-600 dark:text-slate-400">
                                        {descricaoPreview}
                                      </p>
                                    )}
                                    {estoqueDetalhes?.unidadeMedida && (
                                      <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                        {estoqueDetalhes.unidadeMedida === 'pct' ? 'Pacote': estoqueDetalhes.unidadeMedida}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                <div className="flex flex-col items-end gap-1 text-right">
                                  <div className="text-sm text-slate-600 dark:text-slate-400">
                                    {quantityFormatter.format(produto.quantidade)} un.
                                  </div>
                                  <div className="text-sm text-slate-600 dark:text-slate-400">
                                    {currencyFormatter.format(produto.precoUnitario)}/un
                                  </div>
                                  <div className="text-lg font-bold text-slate-900 dark:text-white">
                                    {currencyFormatter.format(subtotal)}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* Items do Mercado Pago */}
                    {items.length > 0 && (
                      <details className="group/details">
                        <summary className="flex cursor-pointer items-center gap-2 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200">
                          <svg className="h-4 w-4 transition-transform group-open/details:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                          Detalhes do Mercado Pago ({items.length} {items.length === 1 ? 'item' : 'itens'})
                        </summary>
                        <div className="mt-3 space-y-2">
                          {items.map((item, index) => {
                            const subtotal =
                              item.quantity != null && item.unit_price != null
                                ? item.quantity * item.unit_price
                                : undefined;

                            return (
                              <div
                                key={`${transacao.id}-${item.id ?? index}`}
                                className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-3 dark:bg-slate-800/30"
                              >
                                <div className="flex-1 space-y-0.5">
                                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                                    {item.title ?? "Item"}
                                  </p>
                                  {item.id && (
                                    <p className="font-mono text-xs text-slate-500 dark:text-slate-400">
                                      {item.id}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-4 text-xs">
                                  <span className="text-slate-600 dark:text-slate-400">
                                    {item.quantity ?? "—"}x
                                  </span>
                                  <span className="text-slate-600 dark:text-slate-400">
                                    {item.unit_price != null ? currencyFormatter.format(item.unit_price) : "—"}
                                  </span>
                                  {subtotal != null && (
                                    <span className="font-semibold text-slate-900 dark:text-white">
                                      {currencyFormatter.format(subtotal)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </details>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MinhasComprasPage;
