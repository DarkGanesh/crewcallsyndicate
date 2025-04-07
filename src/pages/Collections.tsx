
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { 
  Film, Camera, Headphones, Mic, Speaker, Scissors, Truck, 
  BatteryCharging, Users, FileEdit, Palette, Briefcase, 
  Sparkles, Shirt, Clapperboard, FlaskConical, Dumbbell, 
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface JobCategoryProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  quote?: string;
  isNew?: boolean;
  items?: {
    name: string;
    type: "vêtement" | "accessoire" | "équipement";
  }[];
}

const JobCategory = ({ icon, title, description, quote, isNew }: JobCategoryProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="cinema-card hover:border-cinema-red/40 transition-all duration-300 h-full relative overflow-hidden" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isNew && (
        <div className="absolute top-0 right-0 bg-cinema-red text-white text-xs px-3 py-1 z-10 font-bold">
          NOUVEAUTÉ
        </div>
      )}
      
      <div className="p-6 flex flex-col h-full relative z-10">
        <div className="flex items-center mb-4">
          <div className="p-3 bg-cinema-red/10 rounded-full mr-4">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        
        <p className="text-gray-400 text-sm flex-grow mb-4">{description}</p>
        
        <Link 
          to={`/collections/${title.toLowerCase().replace(/\s+/g, '-')}`}
          className="self-start button-cinema-outline text-sm py-2 px-3 mt-2"
        >
          Découvrir la collection
        </Link>
      </div>
      
      {quote && isHovered && (
        <div className="absolute inset-0 bg-cinema-black/90 flex items-center justify-center p-6 animate-fade-in">
          <p className="text-white italic text-center">{quote}</p>
        </div>
      )}
    </div>
  );
};

const Collections = () => {
  const { toast } = useToast();
  const [filter, setFilter] = useState<string | null>(null);
  
  const handleFilterChange = (type: string | null) => {
    setFilter(type);
    if (type) {
      toast({
        title: "Filtre appliqué",
        description: `Affichage des articles de type: ${type}`,
      });
    } else {
      toast({
        title: "Filtres réinitialisés",
        description: "Affichage de toutes les collections",
      });
    }
  };

  const jobCategories: JobCategoryProps[] = [
    {
      icon: <Speaker className="h-6 w-6 text-cinema-red" />,
      title: "Régie",
      description: "Tee-shirts, vestes et gilets personnalisés pour les chefs de plateau et régisseurs.",
      quote: "\"Silence sur le plateau ! Moteur... Action !\"",
      isNew: true,
    },
    {
      icon: <Camera className="h-6 w-6 text-cinema-red" />,
      title: "Image",
      description: "Casquettes, hoodies et accessoires pour cadreurs, chefs op et assistants caméra.",
      quote: "\"Cadre serré sur le personnage, travelling arrière...\"",
    },
    {
      icon: <Truck className="h-6 w-6 text-cinema-red" />,
      title: "Machinerie",
      description: "Tenues robustes et gants adaptés aux machinistes et grips.",
      quote: "\"On va mettre la dolly sur rails pour le plan séquence.\"",
    },
    {
      icon: <BatteryCharging className="h-6 w-6 text-cinema-red" />,
      title: "Électro",
      description: "Tee-shirts, sweats et bonnets pour les chefs électro et leurs équipes.",
      quote: "\"On rajoute un contre-jour et on diffuse la source principale.\"",
      isNew: true,
    },
    {
      icon: <Briefcase className="h-6 w-6 text-cinema-red" />,
      title: "Production",
      description: "Chemises et accessoires premium pour les directeurs de production.",
      quote: "\"On est dans les temps et dans le budget ? Parfait !\"",
    },
    {
      icon: <Scissors className="h-6 w-6 text-cinema-red" />,
      title: "Post-Production",
      description: "Hoodies et mugs pour monteurs, étalonneurs et VFX artists.",
      quote: "\"On va raccorder sur le mouvement pour que la coupe soit invisible.\"",
    },
    {
      icon: <Users className="h-6 w-6 text-cinema-red" />,
      title: "Casting",
      description: "Sacs et carnets pour les directeurs de casting et assistants.",
      quote: "\"Ce rôle demande quelqu'un avec plus de... présence.\"",
    },
    {
      icon: <Clapperboard className="h-6 w-6 text-cinema-red" />,
      title: "Mise en Scène",
      description: "Écharpes, carnets et accessoires pour réalisateurs et assistants réal.",
      quote: "\"Je la vois autrement cette scène, on va la reprendre.\"",
      isNew: true,
    },
    {
      icon: <Shirt className="h-6 w-6 text-cinema-red" />,
      title: "HMC",
      description: "Vêtements et trousses personnalisées pour l'habillage, maquillage et coiffure.",
      quote: "\"On va vieillir le personnage de 10 ans pour cette scène.\"",
    },
    {
      icon: <Mic className="h-6 w-6 text-cinema-red" />,
      title: "Son",
      description: "Casquettes et sweats pour ingénieurs du son, perchmans et mixeurs.",
      quote: "\"On entend les pas, il faut refaire la prise son !\"",
    },
    {
      icon: <Palette className="h-6 w-6 text-cinema-red" />,
      title: "Décoration",
      description: "Tabliers et accessoires pour chefs déco, accessoiristes et scénographes.",
      quote: "\"Ce décor raconte l'histoire du personnage sans un mot.\"",
    },
    {
      icon: <FlaskConical className="h-6 w-6 text-cinema-red" />,
      title: "SFX & Effets Spéciaux",
      description: "Vestes techniques et accessoires adaptés aux experts en FX.",
      quote: "\"On va déclencher l'explosion au signal du réalisateur.\"",
    },
    {
      icon: <Dumbbell className="h-6 w-6 text-cinema-red" />,
      title: "Cascade",
      description: "Tenues résistantes et confortables pour les cascadeurs et coordinateurs.",
      quote: "\"Pour cette chute, on va mettre des protections supplémentaires.\"",
      isNew: true,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cinema-black">
      <Navbar />
      <main className="flex-grow relative">
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-cinema-black/90 backdrop-blur-sm">
          <div className="max-w-2xl w-full p-8 flex flex-col items-center">
            <div className="w-full mb-6 relative">
              <div className="bg-cinema-red/90 h-16 w-full rounded-t-md p-4 flex justify-between items-center">
                <div className="text-white font-bold text-2xl">CREW CALL SYNDICATE</div>
                <div className="text-white font-bold">PREND 1</div>
              </div>
              <div className="bg-cinema-darkgray h-40 w-full rounded-b-md p-6 flex flex-col justify-center">
                <div className="text-4xl md:text-5xl font-black text-white mb-2 tracking-tighter flex flex-col">
                  <span className="text-cinema-red">PROCHAINEMENT</span>
                  <span className="text-2xl mt-1">Collections en préparation</span>
                </div>
                <div className="flex space-x-2 mt-6">
                  <div className="h-1.5 bg-white/80 w-24 rounded-full"></div>
                  <div className="h-1.5 bg-white/60 w-10 rounded-full"></div>
                  <div className="h-1.5 bg-white/40 w-16 rounded-full"></div>
                </div>
              </div>
            </div>
            
            <p className="text-gray-400 text-center mb-8">
              Notre équipe de production travaille jour et nuit pour créer des collections exceptionnelles dédiées aux professionnels du cinéma. Revenez bientôt pour découvrir nos produits exclusifs !
            </p>

            <div className="flex space-x-4">
              <Link to="/contact" className="button-cinema inline-flex items-center">
                <Clapperboard className="mr-2 h-5 w-5" />
                Être notifié au lancement
              </Link>
              
              <Link to="/accueil" className="button-cinema-outline inline-flex items-center">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Retour au site
              </Link>
            </div>
          </div>
        </div>

        <div className="filter grayscale opacity-20">
          <div className="relative bg-cinema-darkgray py-16 border-b border-cinema-red/20 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <img 
                src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
                alt="Tournage en coulisses" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-cinema-black via-transparent to-cinema-black"></div>
            </div>
            
            <div className="cinema-container relative z-10">
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                🎬 Collections <span className="text-cinema-red">Métiers du Cinéma</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-semibold text-white mb-6">
                AFFICHEZ VOTRE EXPERTISE AVEC STYLE !
              </h2>
              <p className="text-gray-400 mt-4 max-w-2xl">
                Découvrez nos gammes de produits spécialement conçues pour répondre aux besoins 
                spécifiques de chaque métier du 7ème art. Des vêtements robustes pour les équipes 
                techniques aux accessoires élégants pour les directeurs artistiques.
              </p>
            </div>
          </div>

          <div className="py-8 bg-cinema-black border-b border-cinema-darkgray">
            <div className="cinema-container">
              <div className="flex flex-wrap items-center gap-3">
                <span className="text-white font-medium">Filtrer par type :</span>
                <button 
                  className={`px-3 py-1 rounded-full text-sm ${filter === null ? 'bg-cinema-red text-white' : 'bg-cinema-darkgray text-gray-300 hover:bg-cinema-darkgray/80'}`}
                  onClick={() => handleFilterChange(null)}
                >
                  Tous
                </button>
                <button 
                  className={`px-3 py-1 rounded-full text-sm ${filter === 'vêtement' ? 'bg-cinema-red text-white' : 'bg-cinema-darkgray text-gray-300 hover:bg-cinema-darkgray/80'}`}
                  onClick={() => handleFilterChange('vêtement')}
                >
                  Vêtements
                </button>
                <button 
                  className={`px-3 py-1 rounded-full text-sm ${filter === 'accessoire' ? 'bg-cinema-red text-white' : 'bg-cinema-darkgray text-gray-300 hover:bg-cinema-darkgray/80'}`}
                  onClick={() => handleFilterChange('accessoire')}
                >
                  Accessoires
                </button>
                <button 
                  className={`px-3 py-1 rounded-full text-sm ${filter === 'équipement' ? 'bg-cinema-red text-white' : 'bg-cinema-darkgray text-gray-300 hover:bg-cinema-darkgray/80'}`}
                  onClick={() => handleFilterChange('équipement')}
                >
                  Équipements
                </button>
              </div>
            </div>
          </div>

          <div className="py-12 bg-cinema-black">
            <div className="cinema-container">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {jobCategories.map((category, index) => (
                  <JobCategory key={index} {...category} />
                ))}
              </div>
            </div>
          </div>

          <div className="py-16 bg-cinema-darkgray relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            </div>
            
            <div className="cinema-container relative z-10">
              <div className="border-2 border-yellow-500 p-8 rounded-lg" style={{ background: "repeating-linear-gradient(45deg, #1a1a1a, #1a1a1a 10px, #222 10px, #222 20px)" }}>
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="md:w-1/3">
                    <img 
                      src="https://images.unsplash.com/photo-1620331317312-88a1b06e2f7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                      alt="Clap de cinéma" 
                      className="rounded-md shadow-lg"
                    />
                  </div>
                  <div className="md:w-2/3">
                    <h2 className="text-2xl font-bold text-white mb-4">
                      Créez votre identité d'équipe
                    </h2>
                    <p className="text-gray-300 mb-6">
                      Grâce à nos collections dédiées à chaque métier du cinéma, démarquez-vous sur les plateaux et 
                      affirmez votre expertise. Chaque pièce est conçue en pensant aux besoins spécifiques de votre profession.
                    </p>
                    <div className="flex space-x-4">
                      <Link to="/personnalisation" className="button-cinema">
                        Personnaliser un produit
                      </Link>
                      <Link to="/contact" className="button-cinema-outline">
                        Demander un devis groupe
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="py-16 bg-cinema-black border-t border-cinema-red/20">
            <div className="cinema-container text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Nouvelles Collections en Préparation
              </h2>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Notre équipe travaille actuellement sur de nouvelles collections spécifiques pour d'autres professions du cinéma. 
                Vous ne trouvez pas votre métier ? Contactez-nous pour nous faire part de vos besoins !
              </p>
              <Link 
                to="/contact" 
                className="button-cinema-outline inline-flex"
              >
                Suggérer un métier
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
