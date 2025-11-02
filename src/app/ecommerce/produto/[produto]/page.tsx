import { notFound } from "next/navigation";
import { pegaDetalhesProduto } from "@/actions/estoques";
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

  return (
    <div className="w-full">
      <ProdutoDetalhes product={produto} />
    </div>
  );
}