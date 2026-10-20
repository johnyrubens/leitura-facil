import { create } from 'zustand';

import type { MockSession } from '@/services/auth/mockAuthService';

type SessionState = {
  session: MockSession | null;
  signIn: (session: MockSession) => void;
  signOut: () => void;
};

// Apenas memória: nunca persistir senha ou criar tokens fictícios.
export const useSessionStore = create<SessionState>((set) => ({
  session: null,
  signIn: (session) => set({ session }),
  signOut: () => set({ session: null }),
}));
