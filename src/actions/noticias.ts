'use server';

import {db} from "@/db";
import {getServerSession} from "next-auth";

export const getNoticias = async () => {
    const session = await getServerSession();

    if (!session) return;

    return db.article.findMany();
}

export const getCategorias = async () => {
    const session = await getServerSession();

    if (!session) return;

    return db.category.findMany();
}