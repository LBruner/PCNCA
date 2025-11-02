'use server'

import {z} from "zod";
import {db} from "@/db";
import {Empresa, Prisma} from "@prisma/client";
import bcrypt from "bcryptjs";

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
    nome: z.string().min(3, {message: 'O nome deve ter pelo menos 3 caracteres'}),
    cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, {message: 'CPF inválido'}),
    empresa: z.string().transform((val) => {
        // Se for vazio ou "nenhuma", retorna null
        if (!val || val === '' || val === 'nenhuma') return null;
        const num = parseInt(val);
        return isNaN(num) ? null : num;
    }).nullable(),
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
        const senhaHash = await bcrypt.hash(result.data.senha, 10);
        const cpfNumerico = result.data.cpf.replace(/\D/g, "");
        const cpfHash = await bcrypt.hash(cpfNumerico, 10);

        await db.usuario.create({
            data: {
                nome: result.data.nome,
                cpf: cpfHash,
                ...(result.data.empresa && { empresaId: result.data.empresa }),
                email: result.data.email,
                senha: senhaHash,
            }
        });

    } catch (err: unknown) {
        console.log(err)
        if (err instanceof Prisma.PrismaClientKnownRequestError) {
            //Checa por campos únicos
            if (err.code === 'P2002') {
                const target = err.meta?.target as string[];
                const field = Array.isArray(target) ? target[0] : target;
                return {
                    errors: {
                        [field]: [`Campo ${field} já cadastrado`]
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
