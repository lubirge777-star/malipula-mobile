// ============================================
// Malipula Suits - Auth Store (Zustand)
// ============================================

import { create } from 'zustand';
import type { User } from '../types';
import type { Session } from '@supabase/supabase-js';

interface AuthState {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Actions
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  initialize: (user: User | null, session: Session | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isLoading: true,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setSession: (session) =>
    set({
      session,
      isAuthenticated: !!session?.user,
      user: session?.user
        ? {
            id: session.user.id,
            email: session.user.email ?? '',
            firstName: session.user.user_metadata?.first_name ?? '',
            lastName: session.user.user_metadata?.last_name ?? '',
            phone: session.user.user_metadata?.phone,
            avatarUrl: session.user.user_metadata?.avatar_url,
            addresses: [],
            measurementProfiles: [],
            loyaltyPoints: 0,
            createdAt: session.user.created_at,
            updatedAt: session.user.updated_at ?? session.user.created_at,
          }
        : null,
    }),

  setLoading: (isLoading) => set({ isLoading }),

  logout: () =>
    set({
      user: null,
      session: null,
      isAuthenticated: false,
      isLoading: false,
    }),

  initialize: (user, session) =>
    set({
      user,
      session,
      isLoading: false,
      isAuthenticated: !!user,
    }),
}));
