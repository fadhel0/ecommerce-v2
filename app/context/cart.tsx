'use client';

import { useRouter } from 'next/navigation';
import { type } from 'os';
import { createContext, useState, useContext, ReactNode } from 'react';

// Define the types for your context
type CartContextType = {
  isItemAdded: boolean;
  getCart: () => any[]; // can specify a more specific type if needed
  addToCart: (product: any) => void; // can specify a more specific type for product
  removeFromCart: (product: any) => void;
  isItemAddedToCart: (product: any) => void;
  cartCount: () => number;
  cartTotal: () => number;
  clearCart: () => void;
};

// Define the type for your Provider props
interface ProviderProps {
  children: ReactNode;
}

const Context = createContext<CartContextType | undefined>(undefined);

const Provider = ({ children }: ProviderProps) => {
  const router = useRouter();

  const [isItemAdded, setIsItemAdded] = useState<boolean>(false);

  const getCart = (): any[] => {
    let cart: any[] = [];
    if (typeof localStorage !== 'undefined') {
      const cartData = localStorage.getItem('cart') || ''; // Provide a default empty string
      try {
        cart = JSON.parse(cartData) || [];
      } catch (error) {
        console.error('Error parsing cart data:', error);
        cart = [];
      }
    }
    return cart;
  };

  const addToCart = (product: any): void => {
    if (typeof localStorage !== 'undefined') {
      let cart: any[] = [];
      const cartData = localStorage.getItem('cart');

      if (cartData !== null) {
        cart = JSON.parse(cartData) || [];
      }

      cart.push(product);
      localStorage.setItem('cart', JSON.stringify(cart));
      isItemAddedToCart(product);
      router.refresh();
    }
  };

  const removeFromCart = (product: any): void => {
    if (typeof localStorage !== 'undefined') {
      const cartData = localStorage.getItem('cart');
      if (cartData !== null) {
        let cart: any[] = JSON.parse(cartData);
        cart = cart.filter((item) => item.id !== product.id);
        localStorage.setItem('cart', JSON.stringify(cart));
        isItemAddedToCart(product);
        router.refresh(); // Use replace instead of refresh
      }
    }
  };

  const isItemAddedToCart = (product: any): void => {
    if (typeof localStorage === 'undefined') {
      setIsItemAdded(false);
      return;
    }

    const cartData = localStorage.getItem('cart');
    if (cartData === null) {
      setIsItemAdded(false);
      return;
    }

    const cart: any[] = JSON.parse(cartData);
    const filteredCart = cart.filter((item) => item.id === product.id);

    setIsItemAdded(filteredCart.length > 0);
  };

  const cartCount = (): number => {
    if (typeof localStorage === 'undefined') {
      return 0;
    }

    const cartData = localStorage.getItem('cart');
    if (cartData === null) {
      return 0;
    }

    const cart: any[] = JSON.parse(cartData);
    return cart.length;
  };

  const cartTotal = (): number => {
    let total = 0;
    if (typeof localStorage !== 'undefined') {
      const cartData = localStorage.getItem('cart');
      if (cartData !== null) {
        try {
          const cart: any[] = JSON.parse(cartData);
          for (let i = 0; i < cart.length; i++) {
            const element = cart[i];
            if (typeof element.price === 'number') {
              total += element.price;
            }
          }
        } catch (error) {
          console.error('Error parsing cart data:', error);
        }
      }
    }
    return total;
  };

  const clearCart = (): void => {
    localStorage.removeItem('cart');
    router.refresh(); // Use replace instead of refresh
  };

  const exposed: CartContextType = {
    isItemAdded,
    getCart,
    addToCart,
    removeFromCart,
    isItemAddedToCart,
    cartCount,
    cartTotal,
    clearCart,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
};

export const useCart = () => {
  const context = useContext(Context);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default Provider;
