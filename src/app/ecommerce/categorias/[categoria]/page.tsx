import { pegaProdutosPorCategoria } from "@/actions/ecommerce";
import ProdutosCategoria from "@/components/ecommerce/categorias/ProdutosCategoria";
import { notFound } from "next/navigation";

interface ShowProductByCategoryPageProps {
    params: Promise<{ estoque: string }>;
}

const page: React.FC<ShowProductByCategoryPageProps> = async ({ params }) => {
    const { estoque } = await params;

    const produtosCategoria = await pegaProdutosPorCategoria(estoque);
console.log(produtosCategoria)
    if (!produtosCategoria) {
        return notFound();
    }

    return (
        <>
            <ProdutosCategoria estoques={produtosCategoria} />
        </>
    )
}

export default page