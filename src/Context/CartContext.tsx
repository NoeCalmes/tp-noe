import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  description?: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addProduct: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  removeProduct: (productId: number) => void;
  clearCart: () => void;
  getTotalHT: () => number;
  getTotalTTC: (tva?: number) => number;
};

const STORAGE_KEY = "myapp_cart";
const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  function addProduct(product: Product, quantity = 1) {
    setCart((currentCart) => {
      const index = currentCart.findIndex((item) => item.product.id === product.id);
      if (index !== -1) {
        const updated = [...currentCart];
        updated[index].quantity += quantity;
        return updated;
      }
      return [...currentCart, { product, quantity }];
    });
  }

  function updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      removeProduct(productId);
      return;
    }
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  }

  function removeProduct(productId: number) {
    setCart((currentCart) => currentCart.filter((item) => item.product.id !== productId));
  }

  function clearCart() {
    setCart([]);
  }

  function getTotalHT() {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  }

  function getTotalTTC(tva = 0.2) {
    return getTotalHT() * (1 + tva);
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addProduct,
        updateQuantity,
        removeProduct,
        clearCart,
        getTotalHT,
        getTotalTTC,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
