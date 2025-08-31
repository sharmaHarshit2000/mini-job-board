'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function LogoutButton({ setIsAdmin }: { setIsAdmin: (v: boolean) => void }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);

    setTimeout(() => {
      document.cookie = 'admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      setIsAdmin(false);
      toast.success('Logged out successfully!');
      router.push('/login');
      setLoading(false);
    }, 500); 
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className={`font-semibold ${loading ? 'text-gray-400 cursor-not-allowed' : 'text-red-500 hover:underline'}`}
    >
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}
