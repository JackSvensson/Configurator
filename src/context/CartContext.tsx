'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartItem {
  id: string;
  flavour: string;
  shape: string;
  color: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  addToCart: (item: Omit<CartItem, 'id' | 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (newItem: Omit<CartItem, 'id' | 'quantity'>) => {
    setItems(prevItems => {
      const configKey = `${newItem.flavour}-${newItem.shape}-${newItem.color}`;
      

      const existingItemIndex = prevItems.findIndex(
        item => 
          item.flavour === newItem.flavour &&
          item.shape === newItem.shape &&
          item.color === newItem.color
      );

      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1
        };
        return updatedItems;
      }

      return [...prevItems, {
        ...newItem,
        id: configKey + '-' + Date.now(),
        quantity: 1
      }];
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ items, itemCount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}