"use client";

import { createContext, useContext, useMemo, useReducer } from "react";
import type { Product } from "@/lib/types";

interface CartItem {
  product: Product;
  quantity: number;
}

type Action =
  | { type: "ADD"; product: Product; quantity?: number }
  | { type: "UPDATE"; productId: string; quantity: number }
  | { type: "REMOVE"; productId: string }
  | { type: "CLEAR" };

const CartContext = createContext<{
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
  savings: number;
} | null>(null);

function reducer(items: CartItem[], action: Action): CartItem[] {
  if (action.type === "ADD") {
    const existing = items.find((item) => item.product.id === action.product.id);
    const quantity = Math.min(action.product.stock, (action.quantity ?? 1) + (existing?.quantity ?? 0));
    if (existing) return items.map((item) => (item.product.id === action.product.id ? { ...item, quantity } : item));
    return [...items, { product: action.product, quantity }];
  }
  if (action.type === "UPDATE") {
    return items.map((item) => (item.product.id === action.productId ? { ...item, quantity: Math.max(1, Math.min(item.product.stock, action.quantity)) } : item));
  }
  if (action.type === "REMOVE") return items.filter((item) => item.product.id !== action.productId);
  if (action.type === "CLEAR") return [];
  return items;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, dispatch] = useReducer(reducer, []);
  const value = useMemo(() => {
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    const savings = items.reduce((sum, item) => sum + ((item.product.compareAtPrice ?? item.product.price) - item.product.price) * item.quantity, 0);
    return {
      items,
      addItem: (product: Product, quantity?: number) => dispatch({ type: "ADD", product, quantity }),
      updateQuantity: (productId: string, quantity: number) => dispatch({ type: "UPDATE", productId, quantity }),
      removeItem: (productId: string) => dispatch({ type: "REMOVE", productId }),
      clearCart: () => dispatch({ type: "CLEAR" }),
      count: items.reduce((sum, item) => sum + item.quantity, 0),
      subtotal,
      savings,
    };
  }, [items]);
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
