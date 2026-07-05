'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { getSessionAction } from '@/app/actions'

interface User {
  id: string
  name: string
  email: string
  role: string
  avatar_url?: string
}

interface AuthContextType {
  user: User | null | undefined
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({ user: undefined, isLoading: true })

export const AuthProvider = ({ 
  user: initialUser, 
  children 
}: { 
  user?: User | null | undefined
  children: React.ReactNode 
}) => {
  const [user, setUser] = useState<User | null | undefined>(initialUser);
  const [isLoading, setIsLoading] = useState<boolean>(initialUser === undefined);

  useEffect(() => {
    if (initialUser !== undefined) {
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    async function loadUser() {
      try {
        const session = await getSessionAction();
        if (isMounted) {
          setUser(session?.user || null);
        }
      } catch (e) {
        if (isMounted) {
          setUser(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadUser();

    return () => { isMounted = false; };
  }, [initialUser]);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
