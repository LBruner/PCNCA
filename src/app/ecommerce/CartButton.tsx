'use client';

import React, { useState, useEffect } from 'react';
import { ShoppingCart, X, Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { items, totalItems, totalPrice, updateQuantity, removeItem } = useCart();
  const router = useRouter()

  useEffect(() => {
    setMounted(true);
  }, []);

  const formatCurrency = (value: number) =>
    new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);

  const handleClick = () => {
    setIsOpen(false);
    router.push('/vendas/criar');
  }

  const cartSidebar = (
    <>
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
            onClick={() => setIsOpen(false)}
          />

          <div
            className={`fixed top-0 right-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b dark:border-gray-700 bg-white dark:bg-gray-800">
                <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800 dark:text-white">
                  <ShoppingCart className="w-6 h-6 text-green-600" />
                  Meu Carrinho
                  {totalItems > 0 && (
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      ({totalItems} {totalItems === 1 ? 'item' : 'itens'})
                    </span>
                  )}
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
                  aria-label="Fechar carrinho"
                >
                  <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 bg-gray-50 dark:bg-gray-900">
                {items.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 dark:text-gray-500">
                    <ShoppingCart className="w-20 h-20 mb-4 opacity-50" />
                    <p className="text-lg font-medium">Seu carrinho está vazio</p>
                    <p className="text-sm mt-2">Adicione produtos para começar!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {items.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow"
                      >
                        {/* Product Image */}
                        {item.imagemLink && (
                          <div className="flex-shrink-0">
                            <img
                              src={item.imagemLink}
                              alt={item.produto}
                              className="w-20 h-20 object-cover rounded-md"
                            />
                          </div>
                        )}

                        {/* Product Info */}
                        <div className="flex-1 min-w-0 flex flex-col">
                          <h3 className="font-semibold text-sm text-gray-800 dark:text-white line-clamp-2">
                            {item.produto}
                          </h3>
                          {item.vendorName && (
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              Por: {item.vendorName}
                            </p>
                          )}

                          <div className="flex items-center justify-between mt-auto pt-2">
                            <div>
                              <p className="text-green-600 dark:text-green-400 font-bold text-sm">
                                {formatCurrency(item.preco)}
                                {item.unidadeMedida && (
                                  <span className="text-xs text-gray-500 dark:text-gray-400 font-normal">
                                    /{item.unidadeMedida}
                                  </span>
                                )}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                                Subtotal: {formatCurrency(item.preco * item.quantidade)}
                              </p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantidade - 1)}
                                className="p-1.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                aria-label="Diminuir quantidade"
                              >
                                <Minus className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
                              </button>
                              <span className="w-8 text-center font-semibold text-gray-800 dark:text-white text-sm">
                                {item.quantidade}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantidade + 1)}
                                className="p-1.5 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                aria-label="Aumentar quantidade"
                              >
                                <Plus className="w-3.5 h-3.5 text-gray-700 dark:text-gray-300" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeItem(item.id)}
                          className="flex-shrink-0 self-start p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
                          aria-label="Remover item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t dark:border-gray-700 p-4 space-y-3 bg-white dark:bg-gray-800">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                      <span>Subtotal</span>
                      <span>{formatCurrency(totalPrice)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
                      <span>Frete</span>
                      <span className="text-green-600 dark:text-green-400 font-medium">Calculado no checkout</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t dark:border-gray-700">
                    <div className="flex justify-between items-center text-lg font-bold text-gray-800 dark:text-white">
                      <span>Total</span>
                      <span className="text-green-600 dark:text-green-400">{formatCurrency(totalPrice)}</span>
                    </div>
                  </div>

                  <button onClick={handleClick}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Finalizar Compra
                  </button>

                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 py-2 rounded-lg font-medium transition-colors text-sm"
                  >
                    Continuar Comprando
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-green-600"
      >
        <ShoppingCart className="w-6 h-6" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
            {totalItems}
          </span>
        )}
      </button>

      {/* Só renderiza o portal depois do componente estar montado */}
      {mounted && createPortal(cartSidebar, document.body)}
    </>
  );
}
