import {db} from "@/db";
import {Cultura} from "@prisma/client";
import {FilterCollection} from "@/models/shared/FilterCollection";

export const pegaCulturasUnicas = async (): Promise<Cultura[]> => {
    return db.cultura.findMany();
}

export const getCategoriasFilterColletion = async (): Promise<FilterCollection[]> => {
    const categoriasUnicas = await pegaCulturasUnicas();

    return categoriasUnicas.map((cultura: Cultura) => {
        return {
            uid: cultura.nome,
            name: cultura.nome
        }
    });
}
