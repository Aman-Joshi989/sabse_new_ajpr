'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'

export interface CartItem {
  id: string
  type: 'package' | 'addon'
  name: string
  price: number
  details?: string
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'id'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  packageTotal: number
  addonTotal: number
  payableTotal: number
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  
  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ajpr_cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart', e)
      }
    }
  }, [])

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('ajpr_cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    // Check if package already exists, only one package allowed
    if (item.type === 'package' && cart.some(i => i.type === 'package')) {
      return
    }

    const newItem = { ...item, id: uuidv4() }
    setCart((prev) => [...prev, newItem])
    setIsCartOpen(true) // Open cart when item added
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return
    setCart((prev) => prev.map((item) => 
      item.id === id ? { ...item, quantity } : item
    ))
  }

  const clearCart = () => {
    setCart([])
  }

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  
  const packageTotal = cart
    .filter(item => item.type === 'package')
    .reduce((total, item) => total + (item.price * item.quantity), 0)

  const addonTotal = cart
    .filter(item => item.type === 'addon')
    .reduce((total, item) => total + (item.price * item.quantity), 0)

  // 50% of package + 100% of addons
  const payableTotal = (packageTotal * 0.5) + addonTotal

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotal,
      packageTotal,
      addonTotal,
      payableTotal,
      isCartOpen,
      setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
