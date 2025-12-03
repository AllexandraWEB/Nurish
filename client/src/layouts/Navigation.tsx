import { Button } from "@/ui/button";
import { guestNavLinks, userNavLinks } from "@/constants";
import { Leaf, Plus, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useLogout } from "@/features/authenication/hooks/useLogout";
import { Link } from "react-router-dom";

const Navigation = () => {
  const [user, setUser] = useState<any>(() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const { handleLogout } = useLogout();

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

  const links = user ? userNavLinks : guestNavLinks;

  return (
    <nav className="absolute top-0 left-0 w-full bg-transparent text-white z-50 font-display">
      <div className="max-w-[1288px] mx-auto flex items-center justify-between py-6 px-4 lg:px-0">
        {/* Logo */}
        <div className="flex gap-2 items-center text-3xl font-light tracking-widest">
          <Leaf />
          <Link to="/" className="uppercase">
            Nurish
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden lg:flex space-x-10 text-lg uppercase tracking-wide cursor-pointer">
          {links.map((link) => (
            <li key={link.name}>
              <Link
                to={link.href}
                className="hover:text-gray-300 transition-colors duration-200"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right side buttons (desktop) */}
        <div className="hidden lg:flex items-center space-x-6">
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
              <Link to="/login">Join Now</Link>
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
                <Link
                  to={link.href}
                  className="hover:text-gray-300 transition-colors duration-200"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
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
              <Link to="/my-recipes">Add Recipe</Link>
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
                <Link to="/login">Join Now</Link>
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
