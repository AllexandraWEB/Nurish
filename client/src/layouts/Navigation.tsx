import { Button } from "@/components/ui/button";
import { guestNavLinks, userNavLinks } from "@/constants";
import { Leaf, Plus, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";

const Navigation = () => {
  const [user, setUser] = useState<any>(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onStorage = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("user") || "null"));
      } catch {
        setUser(null);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  async function handleLogout() {
    try {
      await apiFetch("/api/auth/logout", { method: "POST" });
    } catch {}
    localStorage.removeItem("user");
    window.location.href = "/";
  }

  const links = user ? userNavLinks : guestNavLinks;

  return (
    <nav className="absolute top-0 left-0 w-full bg-transparent text-white z-50 font-display">
      <div className="max-w-[1288px] mx-auto flex items-center justify-between py-6 px-4 lg:px-0">
        {/* Logo */}
        <div className="flex gap-2 items-center text-3xl font-light tracking-widest">
          <Leaf />
          <a href="/" className="uppercase">
            Nurish
          </a>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex space-x-10 text-lg uppercase tracking-wide cursor-pointer">
          {links.map((link) => (
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

        {/* Right side buttons (desktop) */}
        <div className="hidden lg:flex items-center space-x-6">
          {/* <Button
            variant="outline"
            size="lg"
            className="rounded-full text-base flex items-center gap-2"
          >
            <Plus />
            <a href="/add-recipe">Add Recipe</a>
          </Button> */}
          {user ? (
            <Button
              variant="ghost"
              size="sm"
              className="uppercase text-lg font-display font-normal"
              onClick={handleLogout}
            >
              Logout
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="uppercase text-lg font-display font-normal"
            >
              <a href="/login">Join Now</a>
            </Button>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Fullscreen Mobile Menu */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-lg flex flex-col items-center justify-center space-y-10 text-center z-50 animate-fadeIn">
          <button
            className="absolute top-6 right-4 p-2"
            onClick={() => setMenuOpen(false)}
            aria-label="Close Menu"
          >
            <X className="w-7 h-7" />
          </button>

          <ul className="flex flex-col space-y-6 text-3xl uppercase tracking-widest font-light">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-gray-300 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-col items-center space-y-6 mt-10">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full text-lg flex items-center gap-2"
              onClick={() => setMenuOpen(false)}
            >
              <Plus />
              <a href="/add-recipe">Add Recipe</a>
            </Button>

            {user ? (
              <Button
                variant="ghost"
                size="sm"
                className="uppercase text-lg font-display font-normal"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="uppercase text-lg font-display font-normal"
                onClick={() => setMenuOpen(false)}
              >
                <a href="/login">Join Now</a>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
