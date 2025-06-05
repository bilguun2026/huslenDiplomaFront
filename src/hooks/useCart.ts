// hooks/useCart.ts
import { useEffect, useState } from "react";
import { Product } from "@/types/types";
import { toast } from "react-toastify";
export interface CartItem {
  product: Product;
  quantity: number;
}

const CART_KEY = "cart_items";

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(CART_KEY);
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {
        setCart([]);
      }
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCart(items);
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  };

  const addToCart = (product: Product, quantity = 1) => {
    const existing = cart.find((item) => item.product.id === product.id);

    if (existing) {
      const updated = cart.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      saveCart(updated);
    } else {
      saveCart([...cart, { product, quantity }]);
      toast.success(`${quantity} ширхэг "${product.name}" сагсанд нэмэгдлээ!`);
    }
  };

  const removeFromCart = (productId: number) => {
    saveCart(cart.filter((item) => item.product.id !== productId));
  };

  const clearCart = () => {
    saveCart([]);
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    clearCart,
  };
}
