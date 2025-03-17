import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { getCartCount } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-cinema-black text-white">
      <div className="clap-bar text-xs">
        LIVRAISON OFFERTE DÈS 50€ D’ACHAT
      </div>
      
      <div className="cinema-container py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src="/logo.svg" alt="Logo CrewCallSyndicate" className="h-8 mr-2" />
          <span className="font-bold">CrewCallSyndicate</span>
        </Link>
        
        <button onClick={toggleMenu} className="lg:hidden">
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        
        <nav className={`${isOpen ? 'block' : 'hidden'} lg:flex lg:items-center lg:w-auto w-full`}>
          <ul className="lg:flex lg:justify-between lg:items-center">
            <li className="mt-3 lg:mt-0 lg:mr-8">
              <NavLink to="/" className={({ isActive }) => isActive ? 'text-cinema-red' : 'hover:text-cinema-red transition-colors'}>
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
        
        <Link to="/cart" className="relative">
          <ShoppingCart className="h-6 w-6 hover:text-cinema-red transition-colors" />
          {getCartCount() > 0 && (
            <span className="absolute -top-2 -right-2 bg-cinema-red text-white text-xs rounded-full px-2">
              {getCartCount()}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
