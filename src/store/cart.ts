import { create } from 'zustand';
import { CartItem, MenuItem } from '../lib/api';

interface CartStore {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: number) => void;
  updateQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;
  total: number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  total: 0,
  
  addItem: (item: MenuItem) => {
    set((state) => {
      const existingItem = state.items.find((i) => i.id === item.id);
      
      if (existingItem) {
        return {
          items: state.items.map((i) =>
            i.id === item.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          ),
          total: state.total + item.price,
        };
      }
      
      return {
        items: [...state.items, { ...item, quantity: 1 }],
        total: state.total + item.price,
      };
    });
  },
  
  removeItem: (itemId: number) => {
    set((state) => {
      const item = state.items.find((i) => i.id === itemId);
      if (!item) return state;
      
      return {
        items: state.items.filter((i) => i.id !== itemId),
        total: state.total - (item.price * item.quantity),
      };
    });
  },
  
  updateQuantity: (itemId: number, quantity: number) => {
    set((state) => {
      const item = state.items.find((i) => i.id === itemId);
      if (!item) return state;
      
      const quantityDiff = quantity - item.quantity;
      
      return {
        items: state.items.map((i) =>
          i.id === itemId ? { ...i, quantity } : i
        ),
        total: state.total + (item.price * quantityDiff),
      };
    });
  },
  
  clearCart: () => {
    set({ items: [], total: 0 });
  },
}));