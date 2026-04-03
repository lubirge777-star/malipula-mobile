// ============================================
// Malipula Suits - Cart Store (Zustand)
// ============================================

import { create } from 'zustand';
import type { CartItem, Product, ProductItem } from '../types';

interface CartState {
  items: CartItem[];

  // Actions
  addItem: (
    product: Product,
    productItem: ProductItem,
    quantity: number,
    selectedColor: string,
    selectedSize: string,
    fabricId?: string
  ) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;

  // Computed
  getTotal: () => number;
  getSubtotal: () => number;
  getItemCount: () => number;
  getItemById: (itemId: string) => CartItem | undefined;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product, productItem, quantity, selectedColor, selectedSize, fabricId) => {
    set((state) => {
      // Check if item already exists with same options
      const existingIndex = state.items.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.productItem.id === productItem.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize &&
          item.fabricId === fabricId
      );

      if (existingIndex > -1) {
        // Update quantity
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + quantity,
        };
        return { items: updatedItems };
      }

      // Add new item
      const newItem: CartItem = {
        id: `${product.id}-${productItem.id}-${selectedColor}-${selectedSize}-${Date.now()}`,
        product,
        productItem,
        quantity,
        selectedColor,
        selectedSize,
        fabricId,
      };

      return { items: [...state.items, newItem] };
    });
  },

  removeItem: (itemId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== itemId),
    }));
  },

  updateQuantity: (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(itemId);
      return;
    }
    set((state) => ({
      items: state.items.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => set({ items: [] }),

  getTotal: () => {
    const { items } = get();
    return items.reduce(
      (total, item) => total + (item.productItem.salePrice ?? item.productItem.price) * item.quantity,
      0
    );
  },

  getSubtotal: () => {
    const { items } = get();
    return items.reduce(
      (total, item) => total + item.productItem.price * item.quantity,
      0
    );
  },

  getItemCount: () => {
    const { items } = get();
    return items.reduce((count, item) => count + item.quantity, 0);
  },

  getItemById: (itemId) => {
    const { items } = get();
    return items.find((item) => item.id === itemId);
  },
}));
