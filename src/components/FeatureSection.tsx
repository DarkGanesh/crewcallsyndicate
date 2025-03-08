
import { TruckIcon, Palette, Award, Headphones } from 'lucide-react';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature = ({ icon, title, description }: FeatureProps) => {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg hover:bg-cinema-darkgray/50 transition-colors">
      <div className="p-3 bg-cinema-red/10 rounded-full mb-4">
        {icon}
      </div>
      <h3 className="text-white font-bold text-lg mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">{description}</p>
    </div>
  );
};

const FeatureSection = () => {
  const features = [
    {
      icon: <Palette className="h-8 w-8 text-cinema-red" />,
      title: "Design Personnalisé",
      description: "Ajoutez votre logo et personnalisez vos articles selon vos besoins spécifiques."
    },
    {
      icon: <Award className="h-8 w-8 text-cinema-red" />,
      title: "Qualité Premium",
      description: "Tous nos produits sont fabriqués avec des matériaux de haute qualité pour une durabilité maximale."
    },
    {
      icon: <TruckIcon className="h-8 w-8 text-cinema-red" />,
      title: "Livraison Rapide",
      description: "Livraison incluse et délais optimisés pour s'adapter aux calendriers de production."
    },
    {
      icon: <Headphones className="h-8 w-8 text-cinema-red" />,
      title: "Support Dédié",
      description: "Une équipe passionnée par le cinéma et disponible pour vous accompagner dans vos projets."
    }
  ];

  return (
    <section className="py-16 bg-cinema-black">
      <div className="cinema-container">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          Pourquoi <span className="text-cinema-red">Nous Choisir</span>
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          Spécialistes des goodies pour l'industrie cinématographique, nous comprenons les besoins spécifiques des équipes de tournage et des productions.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
