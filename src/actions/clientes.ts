'use server';

import {db} from "@/db";
import {CategoriaPessoa, Pessoa, PessoaJuridica} from "@prisma/client";

export type CategoriaPessoaComEmpresa = CategoriaPessoa & {
    pessoas: (Pessoa & { pessoaJuridica?: PessoaJuridica | null })[],
}

export const pegaTodosClientes = (): Promise<CategoriaPessoaComEmpresa[]> => {
    return db.categoriaPessoa.findMany({
        where: {
            descricao: 'Cliente',
        },
        include: {
            pessoas: {
                include: {
                    pessoaJuridica: true,
                }
            }
        }
    })
}