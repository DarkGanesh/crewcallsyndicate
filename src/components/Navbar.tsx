
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ShoppingCart, Menu, X, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import LoginPopup from "@/components/auth/LoginPopup";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const { getCartCount } = useCart();
  const { isAuthenticated, currentClient, isGuest, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLogin = () => {
    setIsLoginOpen(!isLoginOpen);
  };

  return (
    <header className="bg-cinema-black text-white">
      <div className="cinema-container py-4 flex items-center justify-between">
        <Link to="/accueil" className="flex items-center">
          <img src="/lovable-uploads/86bc3798-6af1-484c-b5ee-b77101e1e469.png" alt="Logo CrewCallSyndicate" className="h-14 mr-2" />
        </Link>
        
        <button onClick={toggleMenu} className="lg:hidden">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        <nav className={`${isOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:w-auto w-full`}>
          <ul className="lg:flex lg:justify-between lg:items-center">
            <li className="mt-3 lg:mt-0 lg:mr-8">
              <NavLink to="/accueil" className={({ isActive }) => isActive ? 'text-cinema-red' : 'hover:text-cinema-red transition-colors'}>
                Accueil
              </NavLink>
            </li>
            <li className="mt-3 lg:mt-0 lg:mr-8">
              <NavLink to="/collections" className={({ isActive }) => isActive ? 'text-cinema-red' : 'hover:text-cinema-red transition-colors'}>
                Collections
              </NavLink>
            </li>
            <li className="mt-3 lg:mt-0 lg:mr-8">
              <NavLink to="/personnalisation" className={({ isActive }) => isActive ? 'text-cinema-red' : 'hover:text-cinema-red transition-colors'}>
                Personnalisation
              </NavLink>
            </li>
            <li className="mt-3 lg:mt-0 lg:mr-8">
              <NavLink to="/marquage-textile" className={({ isActive }) => isActive ? 'text-cinema-red' : 'hover:text-cinema-red transition-colors'}>
                Marquage Textile
              </NavLink>
            </li>
            <li className="mt-3 lg:mt-0 lg:mr-8">
              <NavLink to="/about" className={({ isActive }) => isActive ? 'text-cinema-red' : 'hover:text-cinema-red transition-colors'}>
                À Propos
              </NavLink>
            </li>
            <li className="mt-3 lg:mt-0">
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-cinema-red' : 'hover:text-cinema-red transition-colors'}>
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>
        
        <div className="flex items-center space-x-4">
          <button 
            className="relative text-white hover:text-cinema-red transition-colors"
            onClick={toggleLogin}
            aria-label={isAuthenticated ? "Profil" : "Connexion"}
          >
            <User className="h-6 w-6" />
            {isAuthenticated && !isGuest && (
              <span className="absolute -top-2 -right-2 bg-cinema-red text-white text-xs rounded-full w-3 h-3"></span>
            )}
          </button>
          
          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 hover:text-cinema-red transition-colors" />
            {getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-cinema-red text-white text-xs rounded-full px-2">
                {getCartCount()}
              </span>
            )}
          </Link>
        </div>
      </div>
      
      <LoginPopup isOpen={isLoginOpen} onClose={toggleLogin} />
    </header>
  );
};

export default Navbar;
