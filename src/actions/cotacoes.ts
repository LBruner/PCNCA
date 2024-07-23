'use server';

import {db} from "@/db";
import {getServerSession} from "next-auth";

export const getCotacoes = async () => {
    const session = await getServerSession();

    if (!session) return;

    const userId = await db.user.findUnique({
        where: {
            'email': session.user.email!
        }
    })

    return db.product.findMany({
        where: {userId: userId!.id},
        orderBy: {name: 'asc'},
    });
}