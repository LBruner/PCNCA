'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/app/context/CartContext';
import { CheckCircle, Package, ShoppingBag, ArrowRight, Mail, Clock } from 'lucide-react';
import paths from '@/paths';

interface VendaItem {
  id: number;
  quantidade: number;
  estoque: {
    produto: string;
    preco: number;
    imagemLink?: string;
    vendorName?: string;
  };
}

interface Venda {
  id: number;
  status: string;
  dataPagamento?: Date;
  empresa?: {
    nome: string;
    id: number;
  };
  estoques: VendaItem[];
}

interface CheckoutSuccessProps {
  vendas: Venda[];
  transacao?: {
    id: number;
    valorTotal: number;
    pagadorEmail?: string;
    mercadoPagoPaymentId: string;
    shippingCost?: number;
  };
}

const CheckoutSuccess: React.FC<CheckoutSuccessProps> = ({ vendas, transacao }) => {
  const { clearCart, isLoaded } = useCart();

  useEffect(() => {
    if (isLoaded) {
      clearCart();
    }
  }, [clearCart, isLoaded]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getTotalItems = () => {
    return vendas.reduce((total, venda) => {
      return total + venda.estoques.reduce((sum, item) => sum + item.quantidade, 0);
    }, 0);
  };

  const getTotalValue = () => {
    const produtosTotal = vendas.reduce((total, venda) => {
      return total + venda.estoques.reduce((sum, item) => {
        return sum + (item.quantidade * item.estoque.preco);
      }, 0);
    }, 0);

    return produtosTotal + (transacao?.shippingCost ?? 0);
  };

  const vendasPorEmpresa = vendas.reduce((acc, venda) => {
    const empresaKey = venda.empresa?.id || 'sem-empresa';
    if (!acc[empresaKey]) {
      acc[empresaKey] = {
        empresa: venda.empresa,
        vendas: []
      };
    }
    acc[empresaKey].vendas.push(venda);
    return acc;
  }, {} as Record<string, { empresa?: Venda['empresa']; vendas: Venda[] }>);

  return (
    <div className="h-auto bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-900 dark:to-gray-800">
     
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 dark:bg-green-600 rounded-full mb-4 animate-scale-in">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Pagamento Confirmado!
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Seu pedido foi recebido com sucesso
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mb-6 animate-slide-up">
          <div className="grid md:grid-cols-3 gap-6 mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <Package className="w-8 h-8 text-green-500 dark:text-green-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Total de Itens</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{getTotalItems()}</p>
            </div>
            <div className="text-center">
              <ShoppingBag className="w-8 h-8 text-green-500 dark:text-green-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400">Pedidos</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{vendas.length}</p>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600 dark:text-gray-400">Valor Total</div>
              <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatCurrency(getTotalValue())}
              </p>
            </div>
          </div>

          {/* Transaction Info */}
          {transacao && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-gray-600 dark:text-gray-400">ID da Transação</p>
                  <p className="font-mono font-semibold text-gray-900 dark:text-white">#{transacao.id}</p>
                </div>
                <div>
                  <p className="text-gray-600 dark:text-gray-400">ID MercadoPago</p>
                  <p className="font-mono text-xs text-gray-900 dark:text-gray-300">{transacao.mercadoPagoPaymentId}</p>
                </div>
                {typeof transacao.shippingCost === 'number' && (
                  <div>
                    <p className="text-gray-600 dark:text-gray-400">Valor do Frete</p>
                    <p className="font-mono font-semibold text-gray-900 dark:text-white">
                      {formatCurrency(transacao.shippingCost)}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2 text-gray-900 dark:text-white">
              <Clock className="w-5 h-5 text-green-500 dark:text-green-400" />
              Próximos Passos
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <Mail className="w-5 h-5 text-green-600 dark:text-green-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Confirmação por E-mail</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enviamos os detalhes do pedido para {transacao?.pagadorEmail || 'seu e-mail'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Package className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Acompanhe seus Pedidos</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Os vendedores foram notificados e prepararão seus produtos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders by Vendor */}
        <div className="space-y-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Seus Pedidos</h2>
          
          {Object.entries(vendasPorEmpresa).map(([key, { empresa, vendas: vendasEmpresa }]) => (
            <div key={key} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 animate-slide-up">
              {/* Vendor Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200 dark:border-gray-700">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Vendido por</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {empresa?.nome || 'Vendedor Independente'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pedido(s)</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {vendasEmpresa.map(v => `#${v.id}`).join(', ')}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {vendasEmpresa.map(venda => 
                  venda.estoques.map((item, idx) => (
                    <div key={`${venda.id}-${idx}`} className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      {item.estoque.imagemLink && (
                        <img 
                          src={item.estoque.imagemLink} 
                          alt={item.estoque.produto}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900 dark:text-white">{item.estoque.produto}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Quantidade: {item.quantidade}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {formatCurrency(item.quantidade * item.estoque.preco)}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {formatCurrency(item.estoque.preco)} cada
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Vendor Total */}
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <span className="font-semibold text-gray-900 dark:text-white">Subtotal desta loja</span>
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {formatCurrency(
                    getTotalValue()
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <button 
            onClick={() => window.location.href = paths.minhasCompras()}
            className="flex items-center justify-center gap-2 bg-green-600 dark:bg-green-700 text-white px-6 py-4 rounded-xl font-semibold hover:bg-green-700 dark:hover:bg-green-600 transition-colors"
          >
            Ver Meus Pedidos
            <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => window.location.href = '/ecommerce'}
            className="flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
          >
            Continuar Comprando
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Precisa de ajuda? Entre em contato com nosso suporte</p>
          <a href="/suporte" className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium">
            suporte@agriplatform.com
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes scale-in {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fall {
          animation: fall linear forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-scale-in {
          animation: scale-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default CheckoutSuccess;
