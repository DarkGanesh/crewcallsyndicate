
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Film, Clapperboard, Camera, Sparkles, Tv } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Maintenance = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [iconIndex, setIconIndex] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Cinema quotes
  const cinemaQuotes = [
    "\"Le cinéma, c'est l'écriture moderne dont l'encre est la lumière.\" — Jean Cocteau",
    "\"Le cinéma, c'est un œil ouvert sur le monde.\" — Joseph Bédier",
    "\"Un film est une réalité qui défile à vingt-quatre images par seconde.\" — Jean-Luc Godard",
    "\"Le cinéma, c'est l'art de montrer.\" — Alfred Hitchcock"
  ];
  
  const [currentQuote, setCurrentQuote] = useState(cinemaQuotes[0]);
  const [animatingFilmStrip, setAnimatingFilmStrip] = useState(false);
  const [sparklePosition, setSparklePosition] = useState({ x: 0, y: 0 });
  const [showSparkle, setShowSparkle] = useState(false);
  
  // Animation pour changer la citation toutes les 10 secondes
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      const nextIndex = (cinemaQuotes.indexOf(currentQuote) + 1) % cinemaQuotes.length;
      setCurrentQuote(cinemaQuotes[nextIndex]);
    }, 10000);
    
    return () => clearInterval(quoteInterval);
  }, [currentQuote, cinemaQuotes]);
  
  // Animation pour alterner les icônes
  useEffect(() => {
    const iconInterval = setInterval(() => {
      setIconIndex((prev) => (prev + 1) % 5);
    }, 3000);
    
    return () => clearInterval(iconInterval);
  }, []);
  
  // Film strip animation effect
  useEffect(() => {
    const filmStripInterval = setInterval(() => {
      setAnimatingFilmStrip(true);
      setTimeout(() => setAnimatingFilmStrip(false), 1200);
    }, 8000);
    
    return () => clearInterval(filmStripInterval);
  }, []);
  
  // Random sparkle effect
  useEffect(() => {
    const sparkleInterval = setInterval(() => {
      const x = Math.random() * window.innerWidth;
      const y = Math.random() * window.innerHeight;
      setSparklePosition({ x, y });
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);
    }, 4000);
    
    return () => clearInterval(sparkleInterval);
  }, []);
  
  const icons = [
    <Film key="film" className="h-10 w-10 text-cinema-red animate-pulse" />,
    <Clapperboard key="clap" className="h-10 w-10 text-cinema-red animate-bounce" />,
    <Camera key="camera" className="h-10 w-10 text-cinema-red animate-spin" />,
    <Tv key="tv" className="h-10 w-10 text-cinema-red animate-pulse" />,
    <Sparkles key="sparkles" className="h-10 w-10 text-cinema-red animate-ping" />
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation d'un délai de vérification
    setTimeout(() => {
      if (password === "julienleboss") {
        // Mot de passe correct
        toast({
          title: "Accès autorisé",
          description: "Bienvenue sur notre site!",
          variant: "default",
        });
        
        // Stocker l'information que l'utilisateur est authentifié
        localStorage.setItem("maintenance_access", "granted");
        
        // Redirection vers la page d'accueil
        navigate("/");
      } else {
        // Mot de passe incorrect
        toast({
          title: "Accès refusé",
          description: "Le mot de passe est incorrect.",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 min-h-screen flex flex-col bg-cinema-black z-50 overflow-hidden">
      {/* Film strip animation */}
      <div className={`fixed top-0 left-0 w-full h-screen pointer-events-none z-30 flex flex-col justify-between ${animatingFilmStrip ? 'opacity-20' : 'opacity-0'} transition-opacity duration-1000`}>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="h-4 bg-cinema-red/20 border-y border-cinema-red/40 flex">
            {Array.from({ length: 24 }).map((_, j) => (
              <div key={j} className="w-8 h-full border-x border-cinema-red/40"></div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Random sparkle effect */}
      {showSparkle && (
        <div 
          className="fixed pointer-events-none z-40 animate-fade-in"
          style={{ 
            left: `${sparklePosition.x}px`, 
            top: `${sparklePosition.y}px`,
          }}
        >
          <Sparkles className="w-10 h-10 text-cinema-red animate-ping" />
        </div>
      )}
      
      <main className="flex-grow flex items-center justify-center p-4 relative">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-20 top-1/4 opacity-10">
            <Clapperboard className="w-64 h-64 text-cinema-red" />
          </div>
          <div className="absolute -right-20 top-2/3 opacity-10">
            <Camera className="w-48 h-48 text-cinema-red" />
          </div>
        </div>
        
        <div className="max-w-md w-full bg-cinema-darkgray p-8 rounded-lg border border-cinema-red/20 shadow-lg transition-all duration-300 hover:shadow-cinema-red/20 z-10">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-cinema-red/10 rounded-full">
              {icons[iconIndex]}
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white text-center mb-2 transition-all">Site en Maintenance</h1>
          <div className="h-24 flex items-center justify-center mb-6">
            <p className="text-gray-300 text-center transition-opacity duration-500">
              {currentQuote}<br />
              <span className="text-sm italic text-cinema-red/80 mt-2 block">- Notre site fait sa propre mise en scène, revenez bientôt!</span>
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Entrez le mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-cinema-black border-cinema-red/20 focus:border-cinema-red transition-all duration-300 hover:border-cinema-red/50"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-cinema-red hover:bg-cinema-red/90 text-white font-bold transition-all duration-300 hover:shadow-md hover:shadow-cinema-red/20 group" 
              disabled={isLoading}
            >
              <span>{isLoading ? "Vérification..." : "Accéder au site"}</span>
              <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Maintenance;
