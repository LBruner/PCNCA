import {db} from "@/db";
import {Moeda} from "@prisma/client";

export const pegaTodasMoedas = async (): Promise<Moeda[]> => {
    return db.moeda.findMany();
}