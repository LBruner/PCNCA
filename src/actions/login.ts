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
    const result = loginSchema.safeParse({
        email: formData.get('email'), senha: formData.get('senha')
    });

    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    try {
        const verifyResponse = await fetch('/api/auth/check-credentials', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: result.data.email,
                password: result.data.senha,
            }),
        });

        if (!verifyResponse.ok) {
            const payload = await verifyResponse.json().catch(() => ({}));
            const message = typeof payload?.message === 'string' ? payload.message : 'Email ou senha inválidos';

            return {
                errors: {
                    _form: [message],
                },
            };
        }
    } catch (error) {
        console.error('Erro ao verificar credenciais:', error);
        return {
            errors: {
                _form: ['Não foi possível validar as credenciais. Tente novamente.'],
            },
        };
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
