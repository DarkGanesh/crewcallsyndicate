
import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    setIsVisible(true);
  }, []);

  return (
    <div className="relative h-[80vh] bg-cinema-black overflow-hidden">
      {/* Background overlay with film strip pattern */}
      <div 
        className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB4PSIwIiB5PSI0MCIgd2lkdGg9IjEwMCIgaGVpZ2h0PSIyMCIgZmlsbD0iIzMzMzMzMyIgZmlsbC1vcGFjaXR5PSIwLjMiLz4KICA8cmVjdCB4PSI0MCIgeT0iMCIgd2lkdGg9IjIwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzMzMzMzMyIgZmlsbC1vcGFjaXR5PSIwLjMiLz4KPC9zdmc+')] opacity-20"
      />
      
      {/* Spotlight effect */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[200%] h-[200%] bg-gradient-radial from-cinema-red/10 to-transparent opacity-30 pointer-events-none" />
      
      {/* Vertical decorative line - film strip */}
      <div className="absolute right-8 top-0 h-full w-10 bg-cinema-black/50 backdrop-blur-sm border-x border-cinema-red/30 flex flex-col items-center justify-center gap-4">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="w-6 h-2 bg-cinema-red/20 rounded-full"></div>
        ))}
      </div>

      <div className="relative h-full cinema-container flex flex-col items-center justify-center text-center">
        {/* Logo animation replacing cinema clap */}
        <div className={`mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <img 
            src="/lovable-uploads/5a60f4de-630f-4907-bbd7-254ac3ef55af.png" 
            alt="CrewCall Syndicate Logo" 
            className="h-32 w-auto mx-auto" 
          />
        </div>
        
        {/* Main headline */}
        <h1 className={`text-4xl md:text-6xl font-bold text-white mb-4 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          GOODIES <span className="text-cinema-red">CINÉMA</span>
        </h1>
        
        {/* Subtitle */}
        <p className={`text-xl md:text-2xl text-white/80 mb-8 max-w-2xl transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          Personnalisez vos produits pour vos équipes et productions cinématographiques
        </p>
        
        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
          <Link 
            to="/personnalisation" 
            className="button-cinema px-8 py-3 text-lg flex items-center justify-center"
          >
            Personnaliser un produit
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
          <Link 
            to="/collections" 
            className="button-cinema-outline px-8 py-3 text-lg"
          >
            Collections métiers
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
