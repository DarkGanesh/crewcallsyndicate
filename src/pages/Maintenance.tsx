
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Film, Clapperboard, Camera } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Maintenance = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [iconIndex, setIconIndex] = useState(0);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const cinemaQuotes = [
    "\"Le cinéma, c'est l'écriture moderne dont l'encre est la lumière.\" — Jean Cocteau",
    "\"Le cinéma, c'est un œil ouvert sur le monde.\" — Joseph Bédier",
    "\"Un film est une réalité qui défile à vingt-quatre images par seconde.\" — Jean-Luc Godard",
    "\"Le cinéma, c'est l'art de montrer.\" — Alfred Hitchcock"
  ];
  
  const [currentQuote, setCurrentQuote] = useState(cinemaQuotes[0]);
  
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
      setIconIndex((prev) => (prev + 1) % 3);
    }, 3000);
    
    return () => clearInterval(iconInterval);
  }, []);
  
  const icons = [
    <Film key="film" className="h-10 w-10 text-cinema-red animate-pulse" />,
    <Clapperboard key="clap" className="h-10 w-10 text-cinema-red" />,
    <Camera key="camera" className="h-10 w-10 text-cinema-red animate-pulse" />
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
        navigate("/accueil");
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
    <div className="fixed inset-0 min-h-screen flex flex-col bg-cinema-black z-50">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-cinema-darkgray p-8 rounded-lg border border-cinema-red/20 shadow-lg transition-all duration-300 hover:shadow-cinema-red/20">
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
              className="w-full bg-cinema-red hover:bg-cinema-red/90 text-white font-bold transition-all duration-300 hover:shadow-md hover:shadow-cinema-red/20" 
              disabled={isLoading}
            >
              {isLoading ? "Vérification..." : "Accéder au site"}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Maintenance;
