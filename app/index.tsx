import { Redirect } from 'expo-router';
import { useSessionStore } from '@/stores/session';

export default function IndexScreen() {
  const authenticated = useSessionStore((state) => state.session !== null);
  return <Redirect href={authenticated ? '/home' : '/login'} />;
}
