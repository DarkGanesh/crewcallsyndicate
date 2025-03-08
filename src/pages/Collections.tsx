
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Film, Camera, Headphones, Mic, Speaker, Scissors, Truck, BatteryCharging, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface JobCategoryProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const JobCategory = ({ icon, title, description }: JobCategoryProps) => {
  return (
    <div className="cinema-card hover:border-cinema-red/40 transition-colors duration-300 h-full">
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center mb-4">
          <div className="p-2 bg-cinema-red/10 rounded-full mr-4">
            {icon}
          </div>
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>
        <p className="text-gray-400 text-sm flex-grow mb-4">{description}</p>
        <Link 
          to="/collections" 
          className="self-start text-cinema-red hover:text-cinema-red/80 transition-colors text-sm font-medium"
        >
          Voir les produits
        </Link>
      </div>
    </div>
  );
};

const Collections = () => {
  const jobCategories = [
    {
      icon: <Camera className="h-6 w-6 text-cinema-red" />,
      title: "Équipe Caméra",
      description: "Produits adaptés aux cadreurs, assistants caméra et DOP."
    },
    {
      icon: <Headphones className="h-6 w-6 text-cinema-red" />,
      title: "Équipe Son",
      description: "Solutions pratiques pour les ingénieurs du son et perchistes."
    },
    {
      icon: <Speaker className="h-6 w-6 text-cinema-red" />,
      title: "Régie",
      description: "Équipements essentiels pour les régisseurs et assistants de production."
    },
    {
      icon: <Scissors className="h-6 w-6 text-cinema-red" />,
      title: "Post-Production",
      description: "Produits dédiés aux monteurs, étalonneurs et sound designers."
    },
    {
      icon: <Truck className="h-6 w-6 text-cinema-red" />,
      title: "Machinistes",
      description: "Goodies robustes et pratiques pour les équipes techniques."
    },
    {
      icon: <BatteryCharging className="h-6 w-6 text-cinema-red" />,
      title: "Électriciens",
      description: "Équipement personnalisé pour les électriciens et gaffers."
    },
    {
      icon: <Film className="h-6 w-6 text-cinema-red" />,
      title: "Production",
      description: "Solutions élégantes pour les producteurs et directeurs de production."
    },
    {
      icon: <Mic className="h-6 w-6 text-cinema-red" />,
      title: "Journalistes",
      description: "Produits adaptés aux interviews et reportages."
    },
    {
      icon: <Users className="h-6 w-6 text-cinema-red" />,
      title: "Figuration",
      description: "Goodies pour identifier et équiper vos figurants."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-cinema-black">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-cinema-darkgray py-12 border-b border-cinema-red/20">
          <div className="cinema-container">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Collections <span className="text-cinema-red">Métiers du Cinéma</span>
            </h1>
            <p className="text-gray-400 mt-4 max-w-2xl">
              Des gammes de produits spécialement conçues pour répondre aux besoins spécifiques de chaque métier du 7ème art.
            </p>
          </div>
        </div>

        {/* Job Categories Grid */}
        <div className="py-12 bg-cinema-black">
          <div className="cinema-container">
            <h2 className="text-2xl font-bold text-white mb-8">
              Explorez nos collections par métier
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobCategories.map((category, index) => (
                <JobCategory key={index} {...category} />
              ))}
            </div>
          </div>
        </div>

        {/* Coming Soon Banner */}
        <div className="py-16 bg-cinema-darkgray">
          <div className="cinema-container text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              Nouvelles Collections en Préparation
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Notre équipe travaille actuellement sur de nouvelles collections spécifiques pour d'autres professions du cinéma. Restez informés !
            </p>
            <Link 
              to="/contact" 
              className="button-cinema-outline inline-flex"
            >
              Suggérer un métier
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Collections;
