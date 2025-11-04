import { Button } from "@/components/ui/button";
import { navLinks } from "@/constants";
import { Leaf, Plus } from 'lucide-react';
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

const Navigation = () => {
  const [user, setUser] = useState<any>(() => {
    try { return JSON.parse(localStorage.getItem('user') || 'null'); } catch { return null; }
  });

  useEffect(() => {
    const onStorage = () => {
      try { setUser(JSON.parse(localStorage.getItem('user') || 'null')); } catch { setUser(null); }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  async function handleLogout() {
    try {
      await apiFetch('/api/auth/logout', { method: 'POST' });
    } catch {}
    localStorage.removeItem('user');
    window.location.href = '/';
  }

  return (
    <nav className="absolute top-0 left-0 w-full bg-transparent text-white z-50 font-display">
      <div className="max-w-[1288px] mx-auto flex items-center justify-between py-6">
        {/* Logo */}
        <div className="flex gap-2 items-center text-3xl font-light tracking-widest">
          <Leaf />
          <a href="/" className="uppercase">Nurish</a>
        </div>

        {/* Navigation Links */}
        <ul className="flex space-x-10 text-lg uppercase tracking-wide">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="hover:text-gray-300 transition-colors duration-200"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side buttons */}
        <div className="flex items-center space-x-6">
          <Button variant="outline" size="lg" className="rounded-full text-base">
            <Plus /><a href="/add-recipe">Add Recipe</a>
          </Button>
          {user ? (
            <Button variant="ghost" size="sm" className="uppercase text-lg font-display font-normal" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button variant="ghost" size="sm" className="uppercase text-lg font-display font-normal">
              <a href="/login">Join Now</a>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
