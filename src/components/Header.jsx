import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Animation variants for mobile menu
  const menuVariants = {
    open: { opacity: 1, height: "auto" },
    closed: { opacity: 0, height: 0 },
  };

  return (
    <header className="bg-dark text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 sm:h-8 sm:w-8 text-primary"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </motion.div>
            <span className="font-bold text-lg sm:text-xl md:text-2xl">
              TournoMaster
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            <NavLink to="/" isActive={location.pathname === "/"}>
              Accueil
            </NavLink>
            <NavLink to="/create" isActive={location.pathname === "/create"}>
              Créer un tournoi
            </NavLink>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-200 hover:text-white focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.nav
          className="md:hidden overflow-hidden"
          animate={isOpen ? "open" : "closed"}
          variants={menuVariants}
          initial="closed"
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col pt-4 pb-2 space-y-3">
            <MobileNavLink
              to="/"
              isActive={location.pathname === "/"}
              onClick={() => setIsOpen(false)}
            >
              Accueil
            </MobileNavLink>
            <MobileNavLink
              to="/create"
              isActive={location.pathname === "/create"}
              onClick={() => setIsOpen(false)}
            >
              Créer un tournoi
            </MobileNavLink>
          </div>
        </motion.nav>
      </div>
    </header>
  );
};

// Navigation link component for desktop
const NavLink = ({ children, to, isActive }) => {
  return (
    <Link
      to={to}
      className={`font-medium text-lg relative ${
        isActive ? "text-primary" : "text-gray-200 hover:text-white"
      }`}
    >
      {children}
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-1 bg-primary rounded-full"
          layoutId="underline"
        />
      )}
    </Link>
  );
};

// Navigation link component for mobile
const MobileNavLink = ({ children, to, isActive, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className={`block px-4 py-2 text-lg font-medium rounded-lg ${
        isActive
          ? "bg-primary/20 text-primary"
          : "text-gray-200 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {children}
    </Link>
  );
};

export default Header;
