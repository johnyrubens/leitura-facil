import type { ReactNode } from 'react';
import { Redirect } from 'expo-router';
import { useSessionStore } from '@/stores/session';

export function AuthenticatedScreen({ children }: { children: ReactNode }) {
  const authenticated = useSessionStore((state) => state.session !== null);
  return authenticated ? children : <Redirect href="/login" />;
}
