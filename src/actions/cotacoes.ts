'use server';

import {db} from "@/db";
import {ProdutoEstoqueComRelacoes} from "@/components/estoque/estoque-filtragem-card";

export const getCotacoes = async ():Promise<ProdutoEstoqueComRelacoes[]> => {
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