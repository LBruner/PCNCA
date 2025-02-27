import {db} from "@/db";
import {Autor, Cultura} from "@prisma/client";
import {FilterCollection} from "@/models/shared/FilterCollection";


export const pegaAutoresUnicos = async (): Promise<Autor[]> => {
    return db.autor.findMany({
        where: {
            noticias: {
                some: {}
            }
        },
        distinct: ['autorId']
    });
}

export const pegaCulturasUnicas = async (): Promise<Cultura[]> => {
    return db.cultura.findMany();
}

export const getAutoresFilterColletion = async (): Promise<FilterCollection[]> => {
    const autoresUnicos = await pegaAutoresUnicos();

    return autoresUnicos.map((autor: Autor) => {
        return {
            uid: autor.nomeAutor,
            name: autor.nomeAutor
        }
    });
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
