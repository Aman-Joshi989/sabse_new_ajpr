'use client'

import React, { createContext, useContext } from 'react'

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar_url?: string
}

interface AuthContextType {
  user: User | null | undefined
}

const AuthContext = createContext<AuthContextType>({ user: undefined })

export const AuthProvider = ({ 
  user, 
  children 
}: { 
  user: User | null | undefined
  children: React.ReactNode 
}) => {
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
