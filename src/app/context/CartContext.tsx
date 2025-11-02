// context/CartContext.tsx

'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CartContextType, CartItem } from '../types/CartItem';

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'agro-cart';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar carrinho do localStorage na montagem
  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setItems(parsed);
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Salvar no localStorage sempre que items mudar
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      } catch (error) {
        console.error('Erro ao salvar carrinho:', error);
      }
    }
  }, [items, isLoaded]);

  // Calcular totais
  const totalItems = items.reduce((sum, item) => sum + item.quantidade, 0);
  const totalPrice = items.reduce((sum, item) => sum + (item.preco * item.quantidade), 0);

  // Adicionar item - CORRIGIDO
  const addItem = useCallback((item: Omit<CartItem, 'quantidade'>, quantity: number = 1) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === item.id);
      
      if (existingIndex > -1) {
        // Item já existe, SUBSTITUIR quantidade ao invés de somar
        const newItems = [...prev];
        newItems[existingIndex] = {
          ...newItems[existingIndex],
          quantidade: quantity // ← MUDANÇA AQUI: não soma, define
        };
        return newItems;
      } else {
        // Novo item
        return [...prev, { ...item, quantidade: quantity }];
      }
    });
  }, []);

  const incrementItem = useCallback((item: Omit<CartItem, 'quantidade'>, quantityToAdd: number = 1) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(i => i.id === item.id);
      if (existingIndex > -1) {
        // Item já existe, SOMAR quantidade
        const newItems = [...prev];
        newItems[existingIndex].quantidade += quantityToAdd;
        console.log('Incrementando item:', newItems[existingIndex].quantidade, 'Quantidade a adicionar:', quantityToAdd);
        return newItems;
      } else {
        // Novo item
        return [...prev, { ...item, quantidade: quantityToAdd }];
      }
    });
  }, []);

  // Remover item
  const removeItem = useCallback((id: number) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  // Atualizar quantidade
  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }

    setItems(prev => {
      const newItems = [...prev];
      const index = newItems.findIndex(i => i.id === id);
      if (index > -1) {
        newItems[index].quantidade = quantity;
      }
      return newItems;
    });
  }, [removeItem]);

  // Limpar carrinho
  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  // Verificar se item está no carrinho
  const isInCart = useCallback((id: number) => {
    return items.some(item => item.id === id);
  }, [items]);

  // Obter quantidade de um item
  const getItemQuantity = useCallback((id: number) => {
    const item = items.find(i => i.id === id);
    return item?.quantidade || 0;
  }, [items]);

  const value: CartContextType = {
    items,
    totalItems,
    totalPrice,
    addItem,
    incrementItem,
    removeItem,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    isLoaded,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
