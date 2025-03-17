
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getCartCount } = useCart();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-cinema-black border-b border-cinema-red/20">
      <div className="cinema-container py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/accueil" className="flex items-center">
            <img 
              src="/lovable-uploads/55946b8c-3247-4126-8773-bd0d13e7aa19.png" 
              alt="CrewCall Syndicate Logo" 
              className="h-12 w-auto" 
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/accueil" className="text-white hover:text-cinema-red transition-colors">
              Accueil
            </Link>
            <Link to="/personnalisation" className="text-white hover:text-cinema-red transition-colors">
              Personnalisation
            </Link>
            <Link to="/collections" className="text-white hover:text-cinema-red transition-colors">
              Collections Métiers
            </Link>
            <Link to="/a-propos" className="text-white hover:text-cinema-red transition-colors">
              À Propos
            </Link>
            <Link to="/contact" className="text-white hover:text-cinema-red transition-colors">
              Contact
            </Link>
          </nav>

          {/* Shopping Cart */}
          <div className="flex items-center space-x-4">
            <Link to="/panier" className="relative p-2">
              <ShoppingCart className="h-6 w-6 text-white hover:text-cinema-red transition-colors" />
              <span className="absolute top-0 right-0 bg-cinema-red text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {getCartCount()}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="p-2 md:hidden text-white"
              onClick={toggleMenu}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="mt-4 pb-4 md:hidden flex flex-col space-y-4">
            <Link 
              to="/accueil" 
              className="text-white hover:text-cinema-red transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Accueil
            </Link>
            <Link 
              to="/personnalisation" 
              className="text-white hover:text-cinema-red transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Personnalisation
            </Link>
            <Link 
              to="/collections" 
              className="text-white hover:text-cinema-red transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Collections Métiers
            </Link>
            <Link 
              to="/a-propos" 
              className="text-white hover:text-cinema-red transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              À Propos
            </Link>
            <Link 
              to="/contact" 
              className="text-white hover:text-cinema-red transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
