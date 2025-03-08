
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CategoryProps {
  title: string;
  description: string;
  imageUrl: string;
  linkTo: string;
}

const Category = ({ title, description, imageUrl, linkTo }: CategoryProps) => {
  return (
    <div className="cinema-card overflow-hidden group h-full flex flex-col">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cinema-black to-transparent"></div>
        <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">
          {title}
        </h3>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-gray-400 text-sm mb-4 flex-grow">{description}</p>
        <Link 
          to={linkTo} 
          className="self-start flex items-center text-cinema-red hover:text-cinema-red/80 transition-colors group"
        >
          <span>Découvrir</span>
          <ChevronRight className="h-5 w-5 ml-1 transform group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
};

const CategorySection = () => {
  const categories = [
    {
      title: "Goodies Personnalisables",
      description: "Ajoutez votre logo sur nos produits de qualité. Idéal pour les équipes de tournage, les productions et les événements cinématographiques.",
      imageUrl: "https://images.unsplash.com/photo-1517697471339-4aa32003c11a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      linkTo: "/personnalisation"
    },
    {
      title: "Collections Métiers",
      description: "Des produits spécialement conçus pour chaque métier du cinéma : machinistes, régisseurs, assistants de production, directeurs artistiques...",
      imageUrl: "https://images.unsplash.com/photo-1617559746312-2aae20ddedbf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      linkTo: "/collections"
    }
  ];

  return (
    <section className="py-16 bg-cinema-black">
      <div className="cinema-container">
        <h2 className="text-3xl font-bold text-white mb-10 text-center">
          Nos <span className="text-cinema-red">Collections</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {categories.map((category, index) => (
            <Category key={index} {...category} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
