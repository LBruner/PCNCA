'use client';

import {signIn} from 'next-auth/react';
import {z} from "zod";

export interface LoginProps {
    errors: {
        _form?: string[],
        email?: string[];
        senha?: string[];
    }
}


const loginSchema = z.object({
    email: z.string().email({message: 'E-mail inválido'}),
    senha: z.string().min(6, {message: 'A senha deve ter pelo menos 6 caracteres'}),
});

export async function validarLogin(formState: LoginProps, formData: FormData): Promise<LoginProps> {
    console.log(formData)
    const result = loginSchema.safeParse({
        email: formData.get('email'), senha: formData.get('senha')
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const response = await signIn('credentials', {
        redirect: false,
        email: result.data.email,
        password: result.data.senha,
    });

    if (!response || !response.ok) {
        return {
            errors: {
                _form: ['Email ou senha inválidos']
            }
        }
    }

    return {
        errors: {
            _form: []
        }
    }
}
