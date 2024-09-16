'use server';

import {db} from "@/db";
import {getServerSession} from "next-auth";

export const buscarVendas = async () => {
    return await db.sale.findMany({
        include: {
            saleItems: {
                include: {
                    product: true,
                },
            },
            seller: true,
        },
    });
}

export const buscarNomeClientes = async () => {
    const session = await getServerSession();

    if (!session) return;

    const sellerId = session.user.id;

    const sales = await db.sale.findMany({
        where: {
            sellerId: sellerId,  // Filtra por vendedor específico
        },
    });

    return Array.from(new Set(sales.map(sale => sale.customerName)));
}