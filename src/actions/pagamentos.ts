import { db } from "@/db";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

interface PreferenceInputProps {
    id: string;
    title: string;
    quantity: number;
}

export const pegaPreference = async (preferenceData: PreferenceInputProps[]): Promise<string> => {
    try {
        const response = await fetch(`/api/create-preference`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({items: preferenceData}),
        });

        const data = await response.json();
        return data.id;
    }
    catch (error) {
        console.error('Erro ao obter formas de pagamento:', error);
        throw error;
    }
}

interface SearchParams {
  vendas?: string;
  payment_id?: string;
  external_reference?: string;
}
interface SearchParams {
  vendas?: string;
  payment_id?: string;
  external_reference?: string;
}

export async function CheckoutSuccessPage(searchParams: SearchParams) {
  // Extrair IDs das vendas da URL
  const vendasParam = searchParams.vendas || searchParams.external_reference;
  
  if (!vendasParam) {
    // Se não tem parâmetros, redirecionar para home
    redirect('/');
  }

  let vendasIds: number[] = [];

  // Parse dos IDs das vendas
  try {
    if (vendasParam.includes(',')) {
      // Múltiplas vendas separadas por vírgula
      vendasIds = vendasParam.split(',').map(id => parseInt(id.trim()));
    } else {
      // Tentar parsear como JSON ou como número único
      try {
        const parsed = JSON.parse(vendasParam);
        vendasIds = parsed.vendas || [parseInt(vendasParam)];
      } catch {
        vendasIds = [parseInt(vendasParam)];
      }
    }
  } catch (error) {
    console.error('Erro ao parsear IDs de vendas:', error);
    redirect('/');
  }

  // Filtrar IDs inválidos
  vendasIds = vendasIds.filter(id => !isNaN(id) && id > 0);

  if (vendasIds.length === 0) {
    redirect('/');
  }

  // Buscar vendas do banco de dados
  const vendas = await db.venda.findMany({
    where: {
      id: { in: vendasIds }
    },
    include: {
      empresa: {
        select: {
          id: true,
          nome: true
        }
      },
      estoques: {
        include: {
          estoque: {
            select: {
              id: true,
              produto: true,
              preco: true,
              imagemLink: true,
            }
          }
        }
      }
    },
    orderBy: {
      id: 'asc'
    }
  });

  if (!vendas || vendas.length === 0) {
    redirect('/');
  }

  // Buscar transação relacionada
  const transacao = await db.transacao.findFirst({
    where: {
      vendaId: { in: vendasIds }
    },
    select: {
      id: true,
      valorTotal: true,
      pagadorEmail: true,
      mercadoPagoPaymentId: true,
      status: true
    },
    orderBy: {
      id: 'desc'
    }
  });

  // Formatar dados para o componente
  const vendasFormatadas = vendas.map(venda => ({
    id: venda.id,
    status: venda.status,
    dataPagamento: venda.dataPagamento,
    empresa: venda.empresa,
    estoques: venda.estoques.map(ve => ({
      id: ve.id,
      quantidade: ve.quantidade,
      estoque: ve.estoque
    }))
  }));

  return {
    vendas: vendasFormatadas,
    transacao: transacao || undefined
  };
}