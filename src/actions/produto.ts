'use server';

import { z, ZodError } from "zod";
import { db } from "@/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import paths from "@/paths";
import { redirect } from "next/navigation";
import { CategoriaPessoa, Estoque, Pessoa, PessoaJuridica, Usuario } from "@prisma/client";
import { authOptions } from "@/app/AuthOptions";
import { user } from "@heroui/react";
import { EstoqueComCultura } from "./estoques";

const createProductSchema = z.object({
    nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    categoria: z.string(),
    preco: z.number().min(0, 'O preço deve ser maior que 0'),
    estoque: z.number().min(0, 'O valor em estoque deve ser maior que 0'),
    imagem: z.string({ message: 'URL inválida' }),
    tipoComodity: z.string().min(1, 'Por favor, selecione um tipo'),
    descricao: z.string(),
    unidade: z.string(),
    status: z.string(),
    empresaId: z.number().optional(),
    categoriaCulturaId: z.number().optional(),

    genero: z.string().optional().nullable(),
    especie: z.string().optional().nullable(),
    variedade: z.string().optional().nullable(),
    corDaFolhagem: z.string().optional().nullable(),
    requisitosDeLuz: z.string().optional().nullable(),
    requisitosDeUmidade: z.string().optional().nullable(),
    tipoDeSolo: z.string().optional().nullable(),
    zonaDeResistencia: z.string().optional().nullable(),
    diasParaMaturidade: z.string().optional().nullable(),
    alturaMadura: z.string().optional().nullable(),
    diasParaGerminacao: z.string().optional().nullable(),
    infoSolSombra: z.string().optional().nullable(),
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
        fornecedor?: string[],
        unidade?: string[],
        status?: string[],
        genero?: string[],
        especie?: string[],
        variedade?: string[],
        corDaFolhagem?: string[],
        requisitosDeLuz?: string[],
        requisitosDeUmidade?: string[],
        tipoDeSolo?: string[],
        zonaDeResistencia?: string[],
        diasParaMaturidade?: string[],
        alturaMadura?: string[],
        diasParaGerminacao?: number,
        infoSolSombra?: string[],

        _form?: string[],
    }
}

type FormDataValidationResult = {
    success: boolean;
    data?: z.infer<typeof createProductSchema>;
    error?: ZodError;
};

function validateForm(formData: FormData): FormDataValidationResult {
    console.log("Validating form data:", Object.fromEntries(formData.entries()));
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

        genero: formData.get('genero'),
        especie: formData.get('especie'),
        variedade: formData.get('variedade'),
        corDaFolhagem: formData.get('corDaFolhagem'),
        requisitosDeLuz: formData.get('requisitosDeLuz'),
        requisitosDeUmidade: formData.get('requisitosDeUmidade'),
        tipoDeSolo: formData.get('tipoDeSolo'),
        zonaDeResistencia: formData.get('zonaDeResistencia'),
        diasParaMaturidade: formData.get('diasParaMaturidade'),
        alturaMadura: formData.get('alturaMadura'),
        infoSolSombra: formData.get('infoSolSombra'),
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

export async function getSessionAndValidateForm(formData: FormData): Promise<{
    session?: Session,
    result?: FormDataValidationResult,
    errors?: CreatePostFormState['errors']
}> {
    const session: Session | null = await getServerSession(authOptions);

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

    return { session, result };
}

export async function getUser(email: string): Promise<Usuario> {
    const user = await db.usuario.findUnique({
        where: {
            id: email
        }
    });

    if (!user) {
        throw new Error('User not found');
    }

    return user;
}

type CreateOrUpdateFn = (data: z.infer<typeof createProductSchema>, userId: string) => Promise<void>;

async function handleFormSubmission(formData: FormData, createOrUpdate: CreateOrUpdateFn): Promise<CreatePostFormState> {
    const { session, result, errors } = await getSessionAndValidateForm(formData);

    if (errors) {
        console.log(errors);
        return { errors };
    }

    try {
        // @ts-ignore
        const user = await getUser(session!.user.id!);
        await createOrUpdate({ ...result?.data!, empresaId: user.empresaId! }, user.id);

    } catch (error) {
        console.log(`Erro ao criar produto: ${error}`)
        return {
            errors: {
                _form: ['Erro ao processar a solicitação.'],
            }
        };
    }
    revalidatePath(paths.estoque());
    redirect(paths.estoque());
}


export const pegaTodosProdutosQueVenderam = async (): Promise<Estoque[]> => {
    return db.estoque.findMany({
        where: {
            historicos: {
                some: {
                    comprador: false
                },
            },
        },
    });
};

export const pegaTodosProdutos = async (): Promise<Estoque[]> => {
    return db.estoque.findMany();
};

export async function pegaProduto(produtoId: number): Promise<EstoqueComCultura | null> {
    return db.estoque.findUnique({
        where: {
            id: produtoId
        },
        include: {
            categoriaId: true,
        },
    }
    );
}

export type Fornecedor = {
    id: string;
    name: string | null;
    email: string | null;
    image: string | null
}

export type FornecedorComRelacoes = Pessoa & {
    categoria: CategoriaPessoa;
    pessoaJuridica: PessoaJuridica | null;
}

export async function pegaFornecedores(): Promise<FornecedorComRelacoes[]> {
    return db.pessoa.findMany({
        where: {
            categoria: {
                descricao: 'Fornecedor',
            }
        },
        include: {
            categoria: true,
            pessoaJuridica: true,
        }
    });
}

export async function criarProduto(_: CreatePostFormState, formData: FormData): Promise<CreatePostFormState> {
    return handleFormSubmission(formData, async (data, userId) => {
        // Check if it's a seeds category (5000)
        const isSeedsCategory = parseInt(data.categoria) === 5000;
        console.log("Creating product with data:", { data, userId, isSeedsCategory });
        const estoque = await db.estoque.create({
            data: {
                produto: data.nome,
                descricao: data.descricao,
                preco: data.preco,
                tipo: data.tipoComodity,
                quantidade: data.estoque,
                imagemLink: data.imagem,
                unidadeMedida: data.unidade,
                categoriaculturaId: parseInt(data.categoria), // Fixed: lowercase 'c'
                empresaId: data.empresaId!,

                // Seeds-specific fields (only if seeds category)
                ...(isSeedsCategory && {
                    genero: data.genero || null,
                    especie: data.especie || null,
                    variedade: data.variedade || null,
                    corDaFolhagem: data.corDaFolhagem || null,
                    requisitosDeLuz: data.requisitosDeLuz || null,
                    requisitosDeUmidade: data.requisitosDeUmidade || null,
                    tipoDeSolo: data.tipoDeSolo || null,
                    zonaDeResistencia: data.zonaDeResistencia || null,
                    diasParaMaturidade: data.diasParaMaturidade ? data.diasParaMaturidade : null,
                    alturaMadura: data.alturaMadura || null,
                    infoSolSombra: data.infoSolSombra || null,
                }),
            },
        });
    });
}


export async function editarProduto(estoqueId: number, _: CreatePostFormState, formData: FormData): Promise<CreatePostFormState> {
    return handleFormSubmission(formData, async (data, userId) => {
        const isSeedsCategory = parseInt(data.categoria) === 5000;

        console.log("Editing product:", { estoqueId, data, userId });
        await db.estoque.update({
            where: {
                id: estoqueId,
            },
            data: {
                produto: data.nome,
                descricao: data.descricao,
                preco: data.preco,
                tipo: data.tipoComodity,
                quantidade: data.estoque,
                imagemLink: data.imagem,
                unidadeMedida: data.unidade,
                categoriaculturaId: parseInt(data.categoria),

                // Seeds-specific fields (only if seeds category)
                ...(isSeedsCategory && {
                    genero: data.genero || null,
                    especie: data.especie || null,
                    variedade: data.variedade || null,
                    corDaFolhagem: data.corDaFolhagem || null,
                    requisitosDeLuz: data.requisitosDeLuz || null,
                    requisitosDeUmidade: data.requisitosDeUmidade || null,
                    tipoDeSolo: data.tipoDeSolo || null,
                    zonaDeResistencia: data.zonaDeResistencia || null,
                    diasParaMaturidade: data.diasParaMaturidade ? data.diasParaMaturidade : null,
                    alturaMadura: data.alturaMadura || null,
                    diasParaGerminacao: data.diasParaGerminacao || null,
                    infoSolSombra: data.infoSolSombra || null,
                }),
            },
        });
    });
}

export async function deletarProduto(estoqueId: number) {
    // const historicoEstoque = await db.estoque.findUnique({
    //     where: {
    //         id: historicoEstoqueId
    //     },
    //     include: {
    //         venda: true
    //     }
    // });

    // if (!historicoEstoque) return false;
    // const estoqueId = historicoEstoque?.estoqueId;

    const estoque = await db.estoque.findFirst({
        where: {
            id: estoqueId,
        }
    });

    if (estoque && estoque.foiUtilizado) {
        await db.estoque.update({
            where: {
                id: estoqueId
            }, data: {
                ativo: false,
            }
        });

        revalidatePath(paths.estoque());

        return false;
    }

    // const vendaEstoque = await db.vendaEstoque.findFirst({
    //     where: {
    //         vendaId: historicoEstoque.venda.id
    //     }
    // })

    // await db.historicoEstoque.delete({
    //     where: {
    //         id: historicoEstoque.id,
    //     }
    // });

    // await db.vendaEstoque.delete({
    //     where: {
    //         id: vendaEstoque?.id,
    //     }
    // });

    await db.estoque.delete({
        where: {
            id: estoqueId,
        },
    });

    revalidatePath(paths.estoque());
    return true;
}

export async function desativaProduto(historicoEstoqueId: number): Promise<void> {
    const historicoEstoque = await db.historicoEstoque.findUnique({
        where: {
            id: historicoEstoqueId
        },
        include: {
            estoque: true
        }
    });
    if (!historicoEstoque) return;
    console.log(historicoEstoque)

    await db.estoque.updateMany({
        where: {
            id: historicoEstoque.estoqueId,
        },
        data: {
            ativo: false
        }
    });

    revalidatePath(paths.estoque());
}

export async function ativaProduto(historicoEstoqueId: number): Promise<void> {
    const historicoEstoque = await db.historicoEstoque.findUnique({
        where: {
            id: historicoEstoqueId
        },
        include: {
            estoque: true
        }
    });

    if (!historicoEstoque) return;

    await db.estoque.updateMany({
        where: {
            id: historicoEstoque.estoqueId,
        },
        data: {
            ativo: true
        }
    });

    revalidatePath(paths.estoque());
}