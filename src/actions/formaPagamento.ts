'use server';

import {FormaPagamento} from "@prisma/client";
import {db} from "@/db";

export const pegaTodasFormasPagamento = (): Promise<FormaPagamento[]> => {
    return db.formaPagamento.findMany()
}