'use server';

import {z, ZodError} from "zod";
import {db} from "@/db";
import {getServerSession} from "next-auth";
import {revalidatePath} from "next/cache";
import paths from "@/paths";
import {redirect} from "next/navigation";
import {CategoriaPessoa, Estoque, Pessoa, PessoaJuridica} from "@prisma/client";
import {ProdutoEstoqueComRelacoes} from "@/actions/estoques";
import {authOptions} from "@/app/AuthOptions";

const createProductSchema = z.object({
    nome: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    categoria: z.string(),
    preco: z.number().min(0, 'O preço deve ser maior que 0'),
    estoque: z.number().min(0, 'O valor em estoque deve ser maior que 0'),
    imagem: z.string({message: 'URL inválida'}),
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
        fornecedor?: string[],
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

    return {session, result};
}

export async function getUserId(email: string): Promise<string> {
    const user = await db.usuario.findUnique({
        where: {
            id: email
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
        console.log(errors);
        return {errors};
    }

    try {
        // @ts-ignore
        const userId = await getUserId(session!.user.id!);
        await createOrUpdate(result?.data!, userId);

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

export async function pegaProduto(produtoId: number): Promise<ProdutoEstoqueComRelacoes | null> {
    return db.historicoEstoque.findUnique({
            where: {
                id: produtoId
            },
            include: {
                venda: {
                    include: {
                        estoques: true,
                        pessoas: {
                            include: {
                                pessoa: {
                                    include: {
                                        pessoaJuridica: true,
                                    }
                                },
                            },
                        }
                    }
                },
                estoque: {
                    include: {
                        categoriaId: true,
                        historicos: true,
                    },
                },
            }
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
        const estoque = await db.estoque.create({
            data: {
                produto: data.nome,
                descricao: data.descricao,
                preco: data.preco,
                tipo: data.tipoComodity,
                quantidade: data.estoque,
                imagemLink: data.imagem,
                unidadeMedida: data.unidade,
                categoriaculturaId: parseInt(data.categoria),
            },
        });

        const venda = await db.venda.create({
            data: {
                dataVenda: new Date(),
                valorVenda: (data.preco) * data.estoque,
                quantidadeVenda: data.estoque,
                desconto: 0,
            }
        });

        await db.historicoEstoque.create({
            data: {
                venda: {
                    connect: {
                        id: venda.id
                    }
                },
                comprador: true,
                dataAlter: new Date(),
                horaAlter: new Date().toISOString().slice(11, 16),
                valorAlter: data.estoque,
                usuario: {
                    connect: {
                        id: userId,
                    },
                },
                estoque: {
                    connect: {
                        id: estoque.id,
                    },
                },
            },
        });

        await db.vendaEstoque.create({
            data: {
                precoProp: data.preco,
                estoqueId: estoque.id,
                vendaId: venda.id,
            },
        });
    });
}


export async function editarProduto(vendaId: number, estoqueId: number, _: CreatePostFormState, formData: FormData): Promise<CreatePostFormState> {
    return handleFormSubmission(formData, async (data, userId) => {
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
            }
        });
    });
}

export async function deletarProduto(historicoEstoqueId: number) {
    const historicoEstoque = await db.historicoEstoque.findUnique({
        where: {
            id: historicoEstoqueId
        },
        include: {
            venda: true
        }
    });

    if (!historicoEstoque) return false;
    const estoqueId = historicoEstoque?.estoqueId;

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

    const vendaEstoque = await db.vendaEstoque.findFirst({
        where: {
            vendaId: historicoEstoque.venda.id
        }
    })

    await db.historicoEstoque.delete({
        where: {
            id: historicoEstoque.id,
        }
    });

    await db.vendaEstoque.delete({
        where: {
            id: vendaEstoque?.id,
        }
    });

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