import { notFound } from "next/navigation";
import { pegaDetalhesProduto } from "@/actions/estoques";
import { pegaReviewsProduto } from "@/actions/reviews";
import ProdutoDetalhes from "@/components/ecommerce/produto/detalhes/ProdutoDetalhes";

interface ShowProductPageProps {
  params: Promise<{ produto: string }>;
}

export default async function ShowProductPage({ params }: ShowProductPageProps) {
  const { produto: produtoId } = await params;
  const produto = await pegaDetalhesProduto(produtoId);

  if (!produto) {
    notFound();
  }

  const reviews = await pegaReviewsProduto(produto.id);

  return (
    <div className="w-full mt-12">
      <ProdutoDetalhes
        product={produto}
        initialReviews={reviews.map((review) => ({
          ...review,
          createdAt: review.createdAt.toISOString(),
        }))}
      />
    </div>
  );
}
