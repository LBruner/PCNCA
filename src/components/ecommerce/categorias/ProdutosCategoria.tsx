"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Droplet, Leaf, Sprout } from "lucide-react";
import { Estoque } from "@prisma/client";

import { formatToBrazilianCurrency } from "@/helpers";

interface ProdutosCategoriaProps {
  estoques: Estoque[];
}

const ITEMS_PER_PAGE = 9;
const quantityFormatter = new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 });

const truncateText = (text: string, limit = 140) => {
  if (text.length <= limit) return text;
  return `${text.substring(0, limit).trimEnd()}…`;
};

const ProdutosCategoria: React.FC<ProdutosCategoriaProps> = ({ estoques }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const productSectionRef = useRef<HTMLElement | null>(null);

  const orderedProducts = useMemo(
    () =>
      [...estoques].sort((a, b) => a.produto.localeCompare(b.produto, "pt-BR", { sensitivity: "base" })),
    [estoques],
  );

  const safeTotalPages = Math.max(1, Math.ceil(orderedProducts.length / ITEMS_PER_PAGE));

  useEffect(() => {
    if (currentPage > safeTotalPages) {
      setCurrentPage(safeTotalPages);
    }
  }, [safeTotalPages, currentPage]);

  const currentProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return orderedProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [currentPage, orderedProducts]);

  const categoriaNome = orderedProducts[0]?.tipo ?? "Produtos";
  const totalDisponivel = useMemo(
    () => orderedProducts.reduce((total, produto) => total + produto.quantidade, 0),
    [orderedProducts],
  );
  const precoMedio = useMemo(() => {
    if (!orderedProducts.length) return 0;
    const soma = orderedProducts.reduce((total, produto) => total + produto.preco, 0);
    return soma / orderedProducts.length;
  }, [orderedProducts]);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + currentProducts.length;

  const handleChangePage = (page: number) => {
    if (page < 1 || page > safeTotalPages) return;
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      window.requestAnimationFrame(() => {
        if (!productSectionRef.current) return;
        const target = Math.max(productSectionRef.current.offsetTop - 100, 0);
        window.scrollTo({ top: target, behavior: "smooth" });
      });
    }
  };

  if (!orderedProducts.length) {
    return (
      <section className="mx-auto flex w-full max-w-4xl flex-col items-center justify-center gap-6 px-4 py-24 text-center">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-lime-100 dark:bg-emerald-900/60">
          <Sprout className="h-12 w-12 text-emerald-700 dark:text-emerald-300" />
        </div>
        <h2 className="text-3xl font-semibold text-emerald-900 dark:text-emerald-100">Ainda estamos germinando por aqui</h2>
        <p className="max-w-2xl text-base text-emerald-800/80 dark:text-emerald-200/80">
          Não encontramos produtos cadastrados nesta categoria no momento. Volte em breve para descobrir novas variedades,
          ou explore outras seções do nosso marketplace agrícola.
        </p>
        <Link
          href="/ecommerce"
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-6 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-emerald-700"
        >
          <Leaf className="h-4 w-4" />
          Explorar catálogo completo
        </Link>
      </section>
    );
  }

  return (
    <div className="w-full dark:bg-customDarkBg">
      <div className="mx-auto w-full max-w-7xl px-4 pt-16 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-r from-lime-100 via-emerald-50 to-emerald-100 px-6 py-11 shadow-sm dark:border-emerald-900/60 dark:from-emerald-950 dark:via-emerald-900 dark:to-emerald-950 sm:px-12">
          <span className="absolute -left-20 top-24 h-40 w-40 rounded-full bg-lime-300/40 blur-3xl dark:bg-emerald-700/40" />
          <span className="absolute -right-12 -bottom-8 h-44 w-44 rounded-full bg-emerald-200/60 blur-3xl dark:bg-emerald-600/20" />

          <div className="relative flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl space-y-5">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-700 shadow-sm dark:bg-emerald-900/40 dark:text-emerald-200">
                Seleção orgânica
              </p>
              <h1 className="text-4xl font-bold text-emerald-900 dark:text-emerald-100 sm:text-5xl">{categoriaNome}</h1>
              <p className="text-base leading-relaxed text-emerald-800/80 dark:text-emerald-200/80">
                Cultivamos uma curadoria especial de sementes, mudas e insumos naturais para potencializar a sua produção.
                Filtre, avalie e encontre o que sua lavoura precisa com praticidade e um visual feito para quem vive o campo.
              </p>
            </div>

            <div className="grid w-full gap-4 rounded-2xl bg-white/80 p-5 shadow-lg backdrop-blur dark:bg-emerald-950/80 sm:grid-cols-3 sm:p-6 lg:w-auto">
              {[
                {
                  icon: Sprout,
                  label: "Produtos disponíveis",
                  value: `${orderedProducts.length}`,
                },
                {
                  icon: Leaf,
                  label: "Preço médio",
                  value: formatToBrazilianCurrency(precoMedio),
                },
                {
                  icon: Droplet,
                  label: "Estoque disponível",
                  value: `${quantityFormatter.format(totalDisponivel)} unidades`,
                },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex flex-col gap-2 rounded-xl border border-emerald-100/70 bg-emerald-50/60 p-4 text-left dark:border-emerald-800 dark:bg-emerald-900/40"
                >
                  <Icon className="h-5 w-5 text-emerald-700 dark:text-emerald-300" />
                  <p className="text-sm font-medium text-emerald-800/80 dark:text-emerald-200/80">{label}</p>
                  <span className="text-lg font-semibold text-emerald-950 dark:text-white">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          ref={productSectionRef}
          className="relative mt-14 flex flex-col p-6"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-6 -top-10 h-24 rounded-3xl bg-gradient-to-b from-emerald-100/60 via-white/0 to-transparent blur-xl dark:from-emerald-900/30"
          />
          <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">
            {currentProducts.map((produto) => {
              const detalhesRelevantes = [produto.variedade, produto.tipoDeSolo, produto.requisitosDeLuz]
                .filter(Boolean)
                .slice(0, 2);

              return (
                <article
                  key={produto.id}
                  className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl dark:border-emerald-900/60 dark:bg-emerald-950/60 dark:hover:border-emerald-700"
                >
                  <div className="relative h-52 w-full overflow-hidden">
                    {produto.imagemLink ? (
                      <Image
                        src={produto.imagemLink}
                        alt={produto.produto}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        priority={false}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-lime-200 via-lime-100 to-emerald-100 dark:from-emerald-900 dark:via-emerald-950 dark:to-emerald-900">
                        <Sprout className="h-14 w-14 text-emerald-700 dark:text-emerald-300" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/15 via-transparent to-transparent" />
                  </div>

                  <div className="flex flex-1 flex-col gap-5 p-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-emerald-950 transition group-hover:text-emerald-700 dark:text-white dark:group-hover:text-emerald-200">
                          {produto.produto}
                        </h2>
                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium uppercase tracking-wide text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200">
                          {produto.tipo}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-emerald-800/80 dark:text-emerald-200/80">
                        {truncateText(produto.descricao)}
                      </p>
                    </div>

                    <div className="space-y-3">
                      <p className="text-xl font-bold text-emerald-900 dark:text-emerald-100">
                        {formatToBrazilianCurrency(produto.preco)}
                      </p>
                      {detalhesRelevantes.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {detalhesRelevantes.map((detalhe) => (
                            <span
                              key={detalhe}
                              className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-200"
                            >
                              {detalhe}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="mt-auto">
                      <Link
                        href={`/ecommerce/produto/${produto.id}`}
                        className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-500 dark:bg-emerald-700 dark:hover:bg-emerald-600"
                      >
                        Ver detalhes e comprar
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <nav className="mt-14 flex flex-col items-center gap-4 text-sm sm:flex-row sm:justify-between">
            <p className="text-emerald-800/80 dark:text-emerald-300/80">
              Mostrando {startIndex + 1} - {endIndex} de {orderedProducts.length} produtos cultivados
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleChangePage(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center rounded-full border border-emerald-200 px-3 py-1 font-medium text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:border-emerald-100 disabled:text-emerald-500 dark:border-emerald-800 dark:text-emerald-200 dark:hover:bg-emerald-900/60 dark:disabled:border-emerald-900 dark:disabled:text-emerald-700"
              >
                Anterior
              </button>
              {Array.from({ length: safeTotalPages }).map((_, index) => {
                const pageNumber = index + 1;
                const isActive = pageNumber === currentPage;
                return (
                  <button
                    type="button"
                    key={pageNumber}
                    onClick={() => handleChangePage(pageNumber)}
                    className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold transition ${
                      isActive
                        ? "border-transparent bg-emerald-600 text-white shadow-md"
                        : "border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-800 dark:text-emerald-200 dark:hover:bg-emerald-900/60"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
              <button
                type="button"
                onClick={() => handleChangePage(currentPage + 1)}
                disabled={currentPage === safeTotalPages}
                className="inline-flex items-center rounded-full border border-emerald-200 px-3 py-1 font-medium text-emerald-700 transition hover:bg-emerald-50 disabled:cursor-not-allowed disabled:border-emerald-100 disabled:text-emerald-300 dark:border-emerald-800 dark:text-emerald-200 dark:hover:bg-emerald-900/60 dark:disabled:border-emerald-900 dark:disabled:text-emerald-700"
              >
                Próximo
              </button>
            </div>
          </nav>
        </section>
      </div>
    </div>
  );
};

export default ProdutosCategoria;
