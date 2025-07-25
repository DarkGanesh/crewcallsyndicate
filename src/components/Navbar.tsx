
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
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
            <li className="mt-3 lg:mt-0">
              <NavLink to="/about" className={({ isActive }) => isActive ? 'text-cinema-red' : 'hover:text-cinema-red transition-colors'}>
                À Propos
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
