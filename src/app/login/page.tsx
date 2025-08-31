'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Key, Eye, EyeOff } from 'lucide-react';
import { useAdmin } from '../context/AdminProvider';
import toast from 'react-hot-toast'; 

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // 
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/admin';
  const { setIsAdmin } = useAdmin();

  const handleLogin = () => {
    if (password === 'letmein') {
      document.cookie = 'admin=1; path=/';
      setIsAdmin(true);
      router.push(next);
       toast.success('Login successful!'); 
    } else {
      toast.error('Wrong password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background transition-colors duration-300">
      <div
        className="p-8 max-w-md w-full bg-background border rounded-lg shadow-lg"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <h1 className="text-3xl font-bold text-foreground mb-6 flex items-center">
          <Key className="mr-2" size={28} /> Admin Login
        </h1>

        <div className="relative w-full mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full p-3 rounded bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors pr-10"
            style={{ borderColor: 'var(--border-color)' }}
          />
          <button
            type="button"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          onClick={handleLogin}
          className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  );
}
