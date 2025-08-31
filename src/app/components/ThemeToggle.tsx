'use client';
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      setIsDark(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = isDark ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
    localStorage.setItem('theme', newTheme);
    setIsDark(!isDark);
    toast(`Switched to ${newTheme} mode`);
  };

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors duration-300"
      style={{
        background: 'var(--background)',
        color: 'var(--foreground)',
        borderColor: 'var(--border-color)',
      }}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
      <span className="font-medium text-sm">
        {isDark ? 'Light Mode' : 'Dark Mode'}
      </span>
    </button>
  );
}
