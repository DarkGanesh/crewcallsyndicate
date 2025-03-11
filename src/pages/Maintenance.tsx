
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Film } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Maintenance = () => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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
    <div className="fixed inset-0 min-h-screen flex flex-col bg-cinema-black z-50">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-cinema-darkgray p-8 rounded-lg border border-cinema-red/20 shadow-lg">
          <div className="flex justify-center mb-6">
            <div className="p-3 bg-cinema-red/10 rounded-full">
              <Film className="h-10 w-10 text-cinema-red" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white text-center mb-2">Site en Maintenance</h1>
          <p className="text-gray-300 text-center mb-8">
            "Le cinéma, c'est l'écriture moderne dont l'encre est la lumière."<br />
            <span className="text-sm italic">- Notre site fait sa propre mise en scène, revenez bientôt!</span>
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Entrez le mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-cinema-black border-cinema-red/20 focus:border-cinema-red"
              />
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-cinema-red hover:bg-cinema-red/90 text-white font-bold" 
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
