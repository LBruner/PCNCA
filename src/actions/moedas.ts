import {db} from "@/db";
import {Moed} from "@prisma/client";

export const pegaTodasMoedas = async (): Promise<Moed[]> => {
    return db.moed.findMany();
}