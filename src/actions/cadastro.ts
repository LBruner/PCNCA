'use server'

import {z} from "zod";
import {db} from "@/db";
import {Prisma} from "@prisma/client";

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

const registerSchema = z.object({
    nome: z.string().min(3, {message: 'O nome deve ter pelo menos 1 caractere'}),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {message: 'CPF inválido'}),
    empresa: z.string().min(1, {message: 'O nome da empresa deve ter pelo menos 1 caractere'}),
    email: z.string().email({message: 'E-mail inválido'}),
    senha: z.string().min(6, {message: 'A senha deve ter pelo menos 6 caracteres'}),
    termos: z.string({message: 'Você deve aceitar os termos'})
});

export async function validarCadastro(_: CreateUserProps, formData: FormData): Promise<CreateUserProps> {
    const result = registerSchema.safeParse({
        nome: formData.get('nome'),
        cpf: formData.get('cpf'),
        empresa: formData.get('empresa'),
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
        await db.user.create({
            data: {
                name: result.data.nome,
                cpf: result.data.cpf,
                //TODO: Add empresa
                // empresa: result.data.empresa,
                email: result.data.email,
                password: result.data.senha,

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