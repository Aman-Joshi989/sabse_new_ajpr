'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { addonsList } from '@/lib/constants'

export type CartCurrency = 'USD' | 'INR' | 'EUR' | 'GBP'

export interface CartItem {
  id: string
  type: 'package' | 'addon'
  name: string
  price: number // Base price in USD
  addonId?: string
  currency?: CartCurrency
  details?: string
  quantity: number
}

export const CURRENCY_SYMBOLS: Record<CartCurrency, string> = {
  USD: '$',
  INR: '₹',
  EUR: '€',
  GBP: '£'
}

export const EXCHANGE_RATES: Record<CartCurrency, number> = {
  USD: 1.0,
  INR: 85.0,
  EUR: 0.92,
  GBP: 0.79
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: Omit<CartItem, 'id'>) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  currency: CartCurrency
  setCurrency: (currency: CartCurrency) => void
  currencySymbol: string
  formatPrice: (amount: number) => string
  getItemPrice: (item: CartItem) => number
  cartTotal: number
  packageTotal: number
  addonTotal: number
  payableTotal: number
  isCartOpen: boolean
  setIsCartOpen: (isOpen: boolean) => void
  paymentType: 'advance' | 'full'
  setPaymentType: (type: 'advance' | 'full') => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [paymentType, setPaymentType] = useState<'advance' | 'full'>('advance')
  const [currency, setCurrencyState] = useState<CartCurrency>('USD')
  
  // Load cart & currency from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('ajpr_cart')
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (e) {
        console.error('Failed to parse cart', e)
      }
    }
    const savedCurrency = localStorage.getItem('ajpr_currency') as CartCurrency
    if (savedCurrency && ['USD', 'INR', 'EUR', 'GBP'].includes(savedCurrency)) {
      setCurrencyState(savedCurrency)
    }
  }, [])

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('ajpr_cart', JSON.stringify(cart))
  }, [cart])

  const setCurrency = (c: CartCurrency) => {
    setCurrencyState(c)
    localStorage.setItem('ajpr_currency', c)
  }

  const currencySymbol = CURRENCY_SYMBOLS[currency] || '$'

  const getItemPrice = (item: CartItem): number => {
    if (item.type === 'addon') {
      const match = addonsList.find(a => a.id === item.addonId || item.name.includes(a.name))
      if (match) {
        if (currency === 'INR') return match.priceINR
        if (currency === 'EUR') return Math.round(match.priceUSD * EXCHANGE_RATES.EUR)
        if (currency === 'GBP') return Math.round(match.priceUSD * EXCHANGE_RATES.GBP)
        return match.priceUSD
      }
    }

    // For packages
    if (currency === 'USD') return item.price
    if (currency === 'INR') return Math.round(item.price * EXCHANGE_RATES.INR)
    if (currency === 'EUR') return Math.round(item.price * EXCHANGE_RATES.EUR)
    if (currency === 'GBP') return Math.round(item.price * EXCHANGE_RATES.GBP)
    return item.price
  }

  const formatPrice = (amount: number): string => {
    return `${currencySymbol}${amount.toLocaleString()}`
  }

  const addToCart = (item: Omit<CartItem, 'id'>) => {
    // Check if package already exists, only one package allowed
    if (item.type === 'package') {
      const existingPackageIndex = cart.findIndex(i => i.type === 'package')
      if (existingPackageIndex !== -1) {
        setCart((prev) => {
          const newCart = [...prev]
          newCart[existingPackageIndex] = { ...item, id: prev[existingPackageIndex].id }
          return newCart
        })
        setIsCartOpen(true)
        return
      }
    }

    const newItem = { ...item, id: uuidv4() }
    setCart((prev) => [...prev, newItem])
    setIsCartOpen(true)
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

  const packageTotal = cart
    .filter(item => item.type === 'package')
    .reduce((total, item) => total + (getItemPrice(item) * item.quantity), 0)

  const addonTotal = cart
    .filter(item => item.type === 'addon')
    .reduce((total, item) => total + (getItemPrice(item) * item.quantity), 0)

  const cartTotal = packageTotal + addonTotal

  const payableTotal = paymentType === 'full' 
    ? packageTotal + addonTotal 
    : Math.round((packageTotal * 0.5) + addonTotal)

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      currency,
      setCurrency,
      currencySymbol,
      formatPrice,
      getItemPrice,
      cartTotal,
      packageTotal,
      addonTotal,
      payableTotal,
      isCartOpen,
      setIsCartOpen,
      paymentType,
      setPaymentType
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

