// components/AuthRedirect.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export function AuthRedirect() {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))
      ?.split('=')[1];

    if (!token) {
      router.push('/login'); // Redirigir al login si no hay token
    }
  }, [router]);

  return null; // Este componente no renderiza nada visible
}
