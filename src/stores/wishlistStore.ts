// ============================================
// Malipula Suits - Wishlist Store (Zustand)
// ============================================

import { create } from 'zustand';
import type { Product } from '../types';

interface WishlistState {
  items: Product[];

  // Actions
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  setItems: (products: Product[]) => void;
  getItemCount: () => number;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],

  addItem: (product) => {
    set((state) => {
      if (state.items.some((item) => item.id === product.id)) {
        return state; // Already in wishlist
      }
      return { items: [...state.items, product] };
    });
  },

  removeItem: (productId) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    }));
  },

  isInWishlist: (productId) => {
    const { items } = get();
    return items.some((item) => item.id === productId);
  },

  clearWishlist: () => set({ items: [] }),

  setItems: (products) => set({ items: products }),

  getItemCount: () => {
    const { items } = get();
    return items.length;
  },
}));
