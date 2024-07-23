'use server';

import {z, ZodError} from "zod";
import {db} from "@/db";
import {getServerSession} from "next-auth";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {redirect} from "next/navigation";

const createProductSchema = z.object({
    nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    categoria: z.string().min(3),
    preco: z.number().min(0, 'O preço deve ser maior que 0'),
    estoque: z.number().min(0, 'O valor em estoque deve ser maior que 0'),
    imagem: z.string().url({message: 'URL inválida'}),
    tipoComodity: z.string().min(1, 'Por favor, selecione um tipo'),
    descricao: z.string(),
    unidade: z.string(),
    status: z.string(),
});

export interface CreatePostFormState {
    errors: {
        nome?: string[],
        categoria?: string[],
        preco?: string[],
        estoque?: string[],
        descricao?: string[],
        imagem?: string[],
        tipoComodity?: string[],
        unidade?: string[],
        status?: string[],
        _form?: string[],
    }
}

type FormDataValidationResult = {
    success: boolean;
    data?: z.infer<typeof createProductSchema>;
    error?: ZodError;
};

function validateForm(formData: FormData): FormDataValidationResult {
    const result = createProductSchema.safeParse({
        nome: formData.get('nome'),
        categoria: formData.get('categoria'),
        descricao: formData.get('descricao'),
        tipoComodity: formData.get('tipoComodity') || '',
        preco: parseFloat(formData.get('preco') as string) || 0,
        estoque: parseFloat(formData.get('estoque') as string) || 0,
        imagem: formData.get('imagem'),
        unidade: formData.get('unidade'),
        status: (formData.get('status') == null ? 'Desativado' : 'Ativo'),
    });

    return {
        success: result.success,
        data: result.success ? result.data : undefined,
        error: result.success ? undefined : result.error,
    };
}

interface Session {
    user: {
        email: string;
    };
}

async function getSessionAndValidateForm(formData: FormData): Promise<{
    session?: Session,
    result?: FormDataValidationResult,
    errors?: CreatePostFormState['errors']
}> {
    const session: Session | null = await getServerSession();

    if (!session || !session.user) {
        return {
            errors: {
                _form: ['You must be signed in to post.'],
            }
        };
    }

    const result = validateForm(formData);

    if (!result.success) {
        return {
            errors: result.error?.flatten().fieldErrors
        };
    }

    return {session, result};
}

async function getUserId(email: string): Promise<string> {
    const user = await db.user.findUnique({
        where: {
            email: email
        }
    });

    if (!user) {
        throw new Error('User not found');
    }

    return user.id;
}

type CreateOrUpdateFn = (data: z.infer<typeof createProductSchema>, userId: string) => Promise<void>;

async function handleFormSubmission(formData: FormData, createOrUpdate: CreateOrUpdateFn): Promise<CreatePostFormState> {
    const {session, result, errors} = await getSessionAndValidateForm(formData);

    if (errors) {
        return {errors};
    }

    try {
        const userId = await getUserId(session!.user.email);

        await createOrUpdate(result!.data!, userId);


    } catch (error) {
        console.log(error);
        return {
            errors: {
                _form: ['Erro ao processar a solicitação.'],
            }
        };
    }
    revalidatePath(paths.estoque());
    redirect(paths.estoque());
}

export async function pegaProduto(produtoId: string){
    return db.product.findUnique({
        where: {
            id: parseInt(produtoId),
        },
    });
}

export async function criarProduto(_: CreatePostFormState, formData: FormData): Promise<CreatePostFormState> {
    return handleFormSubmission(formData, async (data, userId) => {
        await db.product.create({
            data: {
                name: data.nome,
                category: data.categoria,
                description: data.descricao,
                price: data.preco,
                stock: data.estoque,
                imageUrl: data.imagem,
                userId: userId,
                unity: data.unidade,
                status: data.status,
            }
        });
    });
}

export async function editarProduto(productId:string, _: CreatePostFormState, formData: FormData): Promise<CreatePostFormState> {

    return handleFormSubmission(formData, async (data, userId) => {
        console.log(data.status)
        await db.product.update({
            where: {
                id: parseInt(productId),
            },
            data: {
                name: data.nome,
                category: data.categoria,
                description: data.descricao,
                price: data.preco,
                stock: data.estoque,
                imageUrl: data.imagem,
                userId: userId,
                unity: data.unidade,
                status: data.status,
            }
        });
    });
}

export async function deletarProduto(productId:string) {
    await db.product.delete({
        where: {
            id: parseInt(productId),
        },
    });
    revalidatePath(paths.estoque());
}
