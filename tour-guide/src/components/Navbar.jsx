import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  
  const baseNavLinks = [
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: "Contact", path: "/contact" },
    { name: "About", path: "/about" },
  ];

  // Add admin-only links
  const navLinks = user?.is_admin 
    ? [...baseNavLinks.slice(0, 2), { name: "Create Destination", path: "/create-destination" }, ...baseNavLinks.slice(2)]
    : baseNavLinks;

  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 md:px-16 py-4 transition-all duration-500 ${
        isScrolled ? "bg-white/80 backdrop-blur shadow text-gray-800" : "text-white"
      }`}
    >
      {/* Logo */}
      <Link to="/" className="font-semibold text-lg">
        Keralam
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex gap-8">
        {navLinks.map((link, i) => (
          <Link key={i} to={link.path} className="hover:opacity-80">
            {link.name}
          </Link>
        ))}
      </div>

      <div className="hidden md:flex gap-4 relative">
        {isAuthenticated ? (
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="px-6 py-2 rounded-full bg-green-500 text-black hover:bg-green-600 transition flex items-center gap-2"
            >
              <span>👤</span>
              {user?.name || 'User'}
            </button>
            {showUserMenu && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[150px]">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/login" className="px-6 py-2 rounded-full bg-black text-white">
            Login
          </Link>
        )}
      </div>

      {/* Mobile */}
      <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
        ☰
      </button>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center gap-6">
          <button onClick={() => setIsMenuOpen(false)} className="absolute top-6 right-6">✕</button>
          {navLinks.map((link, i) => (
            <Link key={i} to={link.path} onClick={() => setIsMenuOpen(false)} className="text-gray-800">
              {link.name}
            </Link>
          ))}
          {isAuthenticated ? (
            <div className="flex flex-col items-center gap-4">
              <span className="font-semibold">{user?.name || 'User'}</span>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="px-6 py-2 rounded-full bg-red-500 text-white"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
