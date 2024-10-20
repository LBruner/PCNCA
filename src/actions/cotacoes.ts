'use server';

import {db} from "@/db";

export const getCotacoes = async () => {
    // const session = await getServerSession();
    //
    // if (!session) return;

    return db.product.findMany({
        orderBy: { name: 'asc' },
        include: {
            supplier: true,
        },
    });
}