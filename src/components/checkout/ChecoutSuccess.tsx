'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle, Package, ShoppingBag, ArrowRight, Download, Mail, Clock } from 'lucide-react';

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
  };
}

const CheckoutSuccess: React.FC<CheckoutSuccessProps> = ({ vendas, transacao }) => {
  const [confetti, setConfetti] = useState(true);

  useEffect(() => {
    // Remover confetti após animação
    const timer = setTimeout(() => setConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

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
    return vendas.reduce((total, venda) => {
      return total + venda.estoques.reduce((sum, item) => {
        return sum + (item.quantidade * item.estoque.preco);
      }, 0);
    }, 0);
  };

  // Agrupar vendas por empresa
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Confetti Effect */}
      {confetti && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-fall"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div className={`w-2 h-2 rounded-full ${
                i % 3 === 0 ? 'bg-green-500' : i % 3 === 1 ? 'bg-emerald-500' : 'bg-teal-500'
              }`} />
            </div>
          ))}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Success Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4 animate-scale-in">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Pagamento Confirmado!
          </h1>
          <p className="text-xl text-gray-600">
            Seu pedido foi recebido com sucesso
          </p>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6 animate-slide-up">
          <div className="grid md:grid-cols-3 gap-6 mb-6 pb-6 border-b">
            <div className="text-center">
              <Package className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Total de Itens</p>
              <p className="text-2xl font-bold text-gray-900">{getTotalItems()}</p>
            </div>
            <div className="text-center">
              <ShoppingBag className="w-8 h-8 text-green-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Pedidos</p>
              <p className="text-2xl font-bold text-gray-900">{vendas.length}</p>
            </div>
            <div className="text-center">
              <div className="text-sm text-gray-600">Valor Total</div>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(transacao?.valorTotal || getTotalValue())}
              </p>
            </div>
          </div>

          {/* Transaction Info */}
          {transacao && (
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">ID da Transação</p>
                  <p className="font-mono font-semibold">#{transacao.id}</p>
                </div>
                <div>
                  <p className="text-gray-600">ID MercadoPago</p>
                  <p className="font-mono text-xs">{transacao.mercadoPagoPaymentId}</p>
                </div>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center gap-2">
              <Clock className="w-5 h-5 text-green-500" />
              Próximos Passos
            </h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <Mail className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Confirmação por E-mail</p>
                  <p className="text-sm text-gray-600">
                    Enviamos os detalhes do pedido para {transacao?.pagadorEmail || 'seu e-mail'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Package className="w-5 h-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">Acompanhe seus Pedidos</p>
                  <p className="text-sm text-gray-600">
                    Os vendedores foram notificados e prepararão seus produtos
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Orders by Vendor */}
        <div className="space-y-4 mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Seus Pedidos</h2>
          
          {Object.entries(vendasPorEmpresa).map(([key, { empresa, vendas: vendasEmpresa }]) => (
            <div key={key} className="bg-white rounded-xl shadow-md p-6 animate-slide-up">
              {/* Vendor Header */}
              <div className="flex items-center justify-between mb-4 pb-4 border-b">
                <div>
                  <p className="text-sm text-gray-600">Vendido por</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {empresa?.nome || 'Vendedor Independente'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Pedido(s)</p>
                  <p className="text-lg font-semibold">
                    {vendasEmpresa.map(v => `#${v.id}`).join(', ')}
                  </p>
                </div>
              </div>

              {/* Items */}
              <div className="space-y-3">
                {vendasEmpresa.map(venda => 
                  venda.estoques.map((item, idx) => (
                    <div key={`${venda.id}-${idx}`} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                      {item.estoque.imagemLink && (
                        <img 
                          src={item.estoque.imagemLink} 
                          alt={item.estoque.produto}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                      )}
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{item.estoque.produto}</p>
                        <p className="text-sm text-gray-600">
                          Quantidade: {item.quantidade}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatCurrency(item.quantidade * item.estoque.preco)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatCurrency(item.estoque.preco)} cada
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Vendor Total */}
              <div className="mt-4 pt-4 border-t flex justify-between items-center">
                <span className="font-semibold text-gray-900">Subtotal desta loja</span>
                <span className="text-lg font-bold text-gray-900">
                  {formatCurrency(
                    vendasEmpresa.reduce((total, venda) => 
                      total + venda.estoques.reduce((sum, item) => 
                        sum + (item.quantidade * item.estoque.preco), 0
                      ), 0
                    )
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-2 gap-4">
          <button 
            onClick={() => window.location.href = '/pedidos'}
            className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-4 rounded-xl font-semibold hover:bg-green-700 transition-colors"
          >
            Ver Meus Pedidos
            <ArrowRight className="w-5 h-5" />
          </button>
          <button 
            onClick={() => window.location.href = '/loja'}
            className="flex items-center justify-center gap-2 bg-white border-2 border-gray-300 text-gray-700 px-6 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
          >
            Continuar Comprando
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 text-center text-sm text-gray-600">
          <p>Precisa de ajuda? Entre em contato com nosso suporte</p>
          <a href="/suporte" className="text-green-600 hover:text-green-700 font-medium">
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