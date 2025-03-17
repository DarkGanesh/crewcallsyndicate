import { Link } from 'react-router-dom';
import { Mail, Phone, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-cinema-darkgray pt-12 pb-6 border-t border-cinema-red/20">
      <div className="cinema-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Company Info */}
          <div className="flex flex-col space-y-4">
            <Link to="/accueil" className="flex items-center">
              <img 
                src="/lovable-uploads/55946b8c-3247-4126-8773-bd0d13e7aa19.png" 
                alt="CrewCall Syndicate Logo" 
                className="h-14 w-auto" 
              />
            </Link>
            <p className="text-gray-400 text-sm">
              Votre partenaire pour des goodies professionnels et personnalisés dédiés aux métiers du cinéma.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-cinema-red transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cinema-red transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-cinema-red transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white text-lg font-bold">Liens Rapides</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Link to="/accueil" className="text-gray-400 hover:text-cinema-red transition-colors">Accueil</Link>
              <Link to="/personnalisation" className="text-gray-400 hover:text-cinema-red transition-colors">Personnalisation</Link>
              <Link to="/collections" className="text-gray-400 hover:text-cinema-red transition-colors">Collections Métiers</Link>
              <Link to="/a-propos" className="text-gray-400 hover:text-cinema-red transition-colors">À Propos</Link>
              <Link to="/contact" className="text-gray-400 hover:text-cinema-red transition-colors">Contact</Link>
              <Link to="/mentions-legales" className="text-gray-400 hover:text-cinema-red transition-colors">Mentions Légales</Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-white text-lg font-bold">Contact</h3>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-gray-400">
                <Phone className="h-4 w-4 text-cinema-red" />
                <span>06 38 66 21 09</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Mail className="h-4 w-4 text-cinema-red" />
                <span>Contact@crewcallsyndicate.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Partner Logos */}
        <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col items-center">
          <div className="flex flex-wrap justify-center gap-8 mb-6">
            <img 
              src="/lovable-uploads/872ddca7-d313-475a-b514-d190abaf5d95.png" 
              alt="Green R Logo" 
              className="h-10 w-auto" 
            />
            <img 
              src="/lovable-uploads/46ba39bc-9829-4fa5-b3e3-478490a784a8.png" 
              alt="Imprim'Vert Logo" 
              className="h-10 w-auto" 
            />
          </div>
          
          {/* Copyright */}
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} CrewCallSyndicate. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
