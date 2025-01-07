'use server';

import {db} from "@/db";
import {ProdutoEstoqueComRelacoes} from "@/components/estoque/TabelaEstoque";

export const getEstoques = async ():Promise<ProdutoEstoqueComRelacoes[]> => {
    // const session = await getServerSession();
    //
    // if (!session) return;

    const dados = await db.product.findMany({
        orderBy: { name: 'asc' },
        include: {
            supplier: true,
        },
    });

    return dados;
}