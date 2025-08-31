'use client';
import { useAdmin } from './AdminProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Loader from '../loading';

export function withAdminProtection<T extends object>(
  Component: React.ComponentType<T>
): React.FC<T> {
  return function Protected(props: T) {
    const { isAdmin } = useAdmin();
    const router = useRouter();

    useEffect(() => {
      if (isAdmin === false) {
        router.push('/login');
      }
    }, [isAdmin, router]);

    if (isAdmin === null) return <Loader />; 

    return <Component {...props} />;
  };
}
