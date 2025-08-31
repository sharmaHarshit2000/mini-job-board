"use client";
import ThemeToggle from "./ThemeToggle";
import Link from "next/link";
import { useAdmin } from "../context/AdminProvider";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const { isAdmin, setIsAdmin } = useAdmin();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    document.cookie = "admin=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    setIsAdmin(false);
    toast("Logged out successfully");
    router.push("/login");
  };

  return (
    <header className="p-4 flex items-center justify-between bg-background border-b border-border-color relative">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-blue-500 hover:underline font-semibold">
          Home
        </Link>
      </div>

      <nav className="hidden md:flex items-center gap-4">
        {isAdmin && (
          <Link
            href="/admin"
            className="text-green-500 hover:underline font-semibold"
          >
            Admin Dashboard
          </Link>
        )}
        {!isAdmin && (
          <Link
            href="/login"
            className="text-blue-500 hover:underline font-semibold"
          >
            Admin Login
          </Link>
        )}
        {isAdmin && (
          <button
            onClick={handleLogout}
            className="text-red-500 hover:underline font-semibold"
          >
            Logout
          </button>
        )}
      </nav>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <button
          className="md:hidden p-2 rounded-lg hover:bg-muted"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div
          className="absolute top-full right-2 w-56 
                     border border-border-color 
                     rounded-xl shadow-lg mt-2 
                     flex flex-col p-2 md:hidden z-50"
          style={{
            background: "var(--background)",
            color: "var(--foreground)",
          }}
        >
          {isAdmin && (
            <Link
              href="/admin"
              className="px-3 py-2 hover:bg-muted rounded-md text-green-500 font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}
          {!isAdmin && (
            <Link
              href="/login"
              className="px-3 py-2 hover:bg-muted rounded-md text-blue-500 font-semibold"
              onClick={() => setMenuOpen(false)}
            >
              Admin Login
            </Link>
          )}
          {isAdmin && (
            <button
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
              className="px-3 py-2 hover:bg-muted rounded-md text-red-500 font-semibold text-left"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </header>
  );
}
