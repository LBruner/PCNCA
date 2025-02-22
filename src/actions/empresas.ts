import {Empresa} from "@prisma/client";
import {db} from "@/db";

export const pegaTodasEmpresas = async (): Promise<Empresa[]> => {
    return db.empresa.findMany();
}