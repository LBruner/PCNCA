'use server';

import {db} from "@/db";
import {CategoriaPessoa, Pessoa, PessoaFisica, PessoaJuridica} from "@prisma/client";

export type CategoriaPessoaComEmpresa = CategoriaPessoa & {
    pessoas: (Pessoa & { pessoaJuridica?: PessoaJuridica | null, pessoaFisica?: PessoaFisica | null })[],
}

export const pegaTodosClientes = (): Promise<CategoriaPessoaComEmpresa[]> => {
    return db.categoriaPessoa.findMany({
        include: {
            pessoas: {
                include: {
                    pessoaJuridica: true,
                    pessoaFisica: true,
                }
            }
        }
    })
}