export interface CartItem {
  id: number;
  produto: string;
  preco: number;
  quantidade: number;
  imagemLink?: string;
  empresaId?: number;
  vendorName?: string;
  unidadeMedida?: string;
}

export interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantidade'>, quantity?: number) => void;
  incrementItem: (item: Omit<CartItem, 'quantidade'>, quantity?: number) => void; // ← NOVO
  removeItem: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  isInCart: (id: number) => boolean;
  getItemQuantity: (id: number) => number;
  isLoaded: boolean;
}
