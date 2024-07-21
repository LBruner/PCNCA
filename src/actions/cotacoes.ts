'use server';

import {db} from "@/db";

export const getCotacoes = async () => {
    return db.product.findMany({
        orderBy: {name: 'asc'},
    });
}