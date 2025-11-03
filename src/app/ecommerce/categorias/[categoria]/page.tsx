import { pegaProdutosPorCategoria } from "@/actions/ecommerce";
import ProdutosCategoria from "@/components/ecommerce/categorias/ProdutosCategoria";
import { notFound } from "next/navigation";

interface ShowProductByCategoryPageProps {
    params: Promise<{ categoria: string }>;
}

const page: React.FC<ShowProductByCategoryPageProps> = async ({ params }) => {
    const { categoria } = await params;

    const produtosCategoria = await pegaProdutosPorCategoria(categoria);
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