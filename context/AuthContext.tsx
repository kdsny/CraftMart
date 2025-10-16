import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

export type AuthUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_type: 'buyer' | 'seller' | 'admin' | 'rider';
  profile_image?: string | null;
};

type AuthContextValue = {
  user: AuthUser | null;
  isOpen: boolean;
  openAuth: () => void;
  closeAuth: () => void;
  setUser: (u: AuthUser | null) => void;
  requireAuth: (action?: () => void) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem('buyerUser');
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch {}
    }
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem('buyerUser', JSON.stringify(user));
    else localStorage.removeItem('buyerUser');
  }, [user]);

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isOpen,
    openAuth: () => setIsOpen(true),
    closeAuth: () => setIsOpen(false),
    setUser,
    requireAuth: (action) => {
      if (user) { action && action(); }
      else setIsOpen(true);
    },
    logout: () => setUser(null)
  }), [user, isOpen]);

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}


