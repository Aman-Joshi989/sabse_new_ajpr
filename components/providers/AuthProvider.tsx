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

    const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
    const needsImmediateAuth =
      pathname.startsWith('/dashboard') || pathname.startsWith('/admin') || pathname === '/login';

    if (needsImmediateAuth) {
      loadUser();
      return () => { isMounted = false; };
    }

    // On public pages, defer session lookup until idle so it doesn't contend with LCP/hydration.
    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = (window as any).requestIdleCallback(() => loadUser(), { timeout: 3500 });
    } else {
      timerId = setTimeout(loadUser, 2500);
    }

    return () => {
      isMounted = false;
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        (window as any).cancelIdleCallback(idleId);
      }
      if (timerId !== undefined) clearTimeout(timerId);
    };
  }, [initialUser]);

  return (
    <AuthContext.Provider value={{ user, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
