
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Film } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen bg-cinema-black">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="mb-6 mx-auto w-24 h-20 relative">
            <div className="absolute inset-0 bg-cinema-black border-2 border-cinema-red rounded-sm"></div>
            <div className="absolute inset-0 bg-cinema-black border-2 border-cinema-red rounded-sm transform rotate-[-30deg] origin-top"></div>
            <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 text-sm text-cinema-red font-mono">
              ERREUR
            </div>
          </div>
          
          <h1 className="text-6xl font-bold text-cinema-red mb-4">404</h1>
          <p className="text-xl text-white mb-8">La scène que vous recherchez n'est pas dans le script.</p>
          
          <Link 
            to="/" 
            className="button-cinema inline-flex items-center justify-center"
          >
            <Film className="mr-2 h-5 w-5" />
            Retour au plateau principal
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
