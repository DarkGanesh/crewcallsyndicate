import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Film, Clapperboard, Camera, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Schéma de validation pour le formulaire
const formSchema = z.object({
  password: z.string().min(1, { message: "Le mot de passe est requis" }),
  captcha: z.string().min(1, { message: "Veuillez résoudre le CAPTCHA" }).refine((val) => {
    // Rendre la validation du CAPTCHA insensible à la casse
    const storedCaptcha = sessionStorage.getItem('captchaValue') || '';
    return val.toLowerCase() === storedCaptcha.toLowerCase();
  }, {
    message: "CAPTCHA incorrect"
  })
});

const Maintenance = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [iconIndex, setIconIndex] = useState(0);
  const [logoVisible, setLogoVisible] = useState(false);
  const [captchaValue, setCaptchaValue] = useState("");
  const captchaCanvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      captcha: ""
    },
  });
  
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
  
  // Animation for logo entrance
  useEffect(() => {
    // Small delay for the logo animation
    const timer = setTimeout(() => {
      setLogoVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Génère un CAPTCHA aléatoire
  const generateCaptcha = () => {
    const canvas = captchaCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Générer un code aléatoire de 6 caractères
    const characters = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    let captchaCode = '';
    for (let i = 0; i < 6; i++) {
      captchaCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    // Stocker le code pour vérification
    sessionStorage.setItem('captchaValue', captchaCode);
    setCaptchaValue(captchaCode);

    // Nettoyer le canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Dessiner le texte avec des effets
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#e11d48';
    ctx.textBaseline = 'middle';
    
    // Ajouter du bruit et déformer le texte
    for (let i = 0; i < captchaCode.length; i++) {
      const x = 20 + i * 20 + Math.random() * 10 - 5;
      const y = canvas.height / 2 + Math.random() * 10 - 5;
      const angle = Math.random() * 0.2 - 0.1;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle);
      ctx.fillText(captchaCode[i], 0, 0);
      ctx.restore();
    }
    
    // Ajouter des lignes aléatoires
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.strokeStyle = `rgba(225, 29, 72, ${Math.random() * 0.5 + 0.1})`; // rouge cinema avec opacité variable
      ctx.lineWidth = Math.random() * 2 + 1;
      ctx.stroke();
    }
    
    // Ajouter des points aléatoires
    for (let i = 0; i < 50; i++) {
      ctx.fillStyle = `rgba(225, 29, 72, ${Math.random() * 0.5 + 0.1})`;
      ctx.beginPath();
      ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // Générer le CAPTCHA au chargement
  useEffect(() => {
    generateCaptcha();
  }, []);
  
  const icons = [
    <Film key="film" className="h-10 w-10 text-cinema-red animate-pulse" />,
    <Clapperboard key="clap" className="h-10 w-10 text-cinema-red" />,
    <Camera key="camera" className="h-10 w-10 text-cinema-red animate-pulse" />
  ];

  // Gestion de la soumission du formulaire
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    // Simulation d'un délai de vérification
    setTimeout(() => {
      // Rendre la validation du mot de passe insensible à la casse aussi
      if (values.password.toLowerCase() === "julienleboss".toLowerCase()) {
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
        
        // Régénérer le CAPTCHA après chaque tentative
        generateCaptcha();
        form.resetField("captcha");
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 min-h-screen flex flex-col bg-cinema-black z-50">
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-cinema-darkgray p-8 rounded-lg border border-cinema-red/20 shadow-lg transition-all duration-300 hover:shadow-cinema-red/20">
          <div className="flex justify-center mb-6 overflow-hidden">
            <div className={`transition-all duration-1000 transform ${logoVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <img 
                src="/lovable-uploads/86bc3798-6af1-484c-b5ee-b77101e1e469.png" 
                alt="CrewCall Syndicate Logo" 
                className="h-32 w-auto animate-pulse" 
              />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-white text-center mb-2 transition-all">Site en Maintenance</h1>
          <div className="h-24 flex items-center justify-center mb-6">
            <p className="text-gray-300 text-center transition-opacity duration-500">
              {currentQuote}<br />
              <span className="text-sm italic text-cinema-red/80 mt-2 block">- Notre site fait sa propre mise en scène, revenez bientôt!</span>
            </p>
          </div>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-white">Mot de passe</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Entrez le mot de passe"
                        className="bg-cinema-black border-cinema-red/20 focus:border-cinema-red transition-all duration-300 hover:border-cinema-red/50"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-cinema-red" />
                  </FormItem>
                )}
              />
              
              <div className="space-y-2">
                <FormLabel className="text-white">CAPTCHA de sécurité</FormLabel>
                <div className="relative bg-cinema-black border border-cinema-red/20 rounded-md p-2 flex flex-col items-center">
                  <canvas 
                    ref={captchaCanvasRef} 
                    width="180" 
                    height="60" 
                    className="mb-2 rounded"
                  />
                  <button 
                    type="button" 
                    className="absolute top-3 right-3 text-cinema-red hover:text-white transition-colors p-1"
                    onClick={generateCaptcha}
                  >
                    <RefreshCw size={16} />
                  </button>
                </div>
              </div>

              <FormField
                control={form.control}
                name="captcha"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Entrez le code affiché"
                        className="bg-cinema-black border-cinema-red/20 focus:border-cinema-red transition-all duration-300 hover:border-cinema-red/50"
                        autoComplete="off"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-cinema-red" />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-cinema-red hover:bg-cinema-red/90 text-white font-bold transition-all duration-300 hover:shadow-md hover:shadow-cinema-red/20" 
                disabled={isLoading}
              >
                {isLoading ? "Vérification..." : "Accéder au site"}
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </div>
  );
};

export default Maintenance;
