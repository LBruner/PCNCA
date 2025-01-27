'use server'

import {z} from "zod";
import {db} from "@/db";
import {Empresa, Prisma} from "@prisma/client";

export interface CreateUserProps {
    errors: {
        _form?: string[],
        nome?: string[];
        cpf?: string[];
        termos?: string[];
        email?: string[];
        senha?: string[];
        empresa?: string[];
    }
}

export const pegaTodasEmpresas = async (): Promise<Empresa[]> => {
    return db.empresa.findMany();
}


const registerSchema = z.object({
    nome: z.string().min(3, {message: 'O nome deve ter pelo menos 1 caractere'}),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {message: 'CPF inválido'}),
    empresa: z.number(),
    email: z.string().email({message: 'E-mail inválido'}),
    senha: z.string().min(6, {message: 'A senha deve ter pelo menos 6 caracteres'}),
    termos: z.string({message: 'Você deve aceitar os termos'})
});

export async function validarCadastro(_: CreateUserProps, formData: FormData): Promise<CreateUserProps> {
    console.log(formData)
    const result = registerSchema.safeParse({
        nome: formData.get('nome'),
        cpf: formData.get('cpf'),
        empresa: parseInt(formData.get('empresa') as string),
        email: formData.get('email'),
        senha: formData.get('senha'),
        termos: formData.get('termos'),
    });


    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    try {
        await db.usuario.create({
            data: {
                nome: result.data.nome,
                cpf: result.data.cpf,
                empresaId: result.data.empresa,
                email: result.data.email,
                senha: result.data.senha,
            }
        });

    } catch (err: unknown) {
        if (err instanceof Prisma.PrismaClientKnownRequestError) {

            //Checa por campos únicos
            if (err.code === 'P2002') {
                const target = err.meta?.target as string;
                return {
                    errors: {
                        [target]: [`Campo ${target} já cadastrado`]
                    }
                }
            } else {
                return {
                    errors: {
                        _form: [err.message]
                    }
                }
            }
        } else {
            return {
                errors: {
                    _form: ['Algo deu errado'],
                }
            }
        }
    }
    return {errors: {}}
}