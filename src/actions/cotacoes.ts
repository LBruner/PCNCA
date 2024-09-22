'use server';

import {db} from "@/db";
import {getServerSession} from "next-auth";

export const getCotacoes = async () => {
    // const session = await getServerSession();
    //
    // if (!session) return;

    return db.product.findMany({
        orderBy: {name: 'asc'},
    });
}