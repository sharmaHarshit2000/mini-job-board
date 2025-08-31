'use client';
import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import Loader from '../loading';
import toast from 'react-hot-toast';

type AdminContextType = {
  isAdmin: boolean;
  setIsAdmin: (value: boolean) => void;
};

const AdminContext = createContext<AdminContextType>({
  isAdmin: false,
  setIsAdmin: () => {},
});

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const adminCookie = document.cookie
        .split('; ')
        .find(row => row.startsWith('admin='))
        ?.split('=')[1];
      const loggedIn = adminCookie === '1';
      setIsAdmin(loggedIn);
      if (loggedIn) toast.success('Welcome back, Admin!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to read admin status');
      setIsAdmin(false);
    }
  }, []);

  if (isAdmin === null) return <Loader />;

  return (
    <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}
