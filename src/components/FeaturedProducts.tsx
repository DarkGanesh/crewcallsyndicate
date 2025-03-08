
import { useState } from 'react';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState<'populaires' | 'nouveautes'>('populaires');

  const products = [
    {
      id: "tshirt-01",
      name: "Tee-Shirt avec Logo",
      description: "Tee-shirt de qualité supérieure avec votre logo à l'arrière et sur le cœur. Livraison incluse.",
      imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      priceOptions: [
        { quantity: 25, price: 274 },
        { quantity: 50, price: 500 },
        { quantity: 100, price: 958 }
      ],
      customizable: true
    },
    {
      id: "notepad-01",
      name: "Bloc-Note Logo Avant",
      description: "Bloc-note professionnel avec votre logo imprimé en première page. Idéal pour les prises de notes sur le plateau.",
      imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      priceOptions: [
        { quantity: 25, price: 160 },
        { quantity: 50, price: 226 },
        { quantity: 100, price: 353 }
      ],
      customizable: true
    },
    {
      id: "bottle-01",
      name: "Gourde Logo Bas",
      description: "Gourde écologique et durable avec votre logo imprimé en bas de la gourde. Maintient vos boissons fraîches ou chaudes.",
      imageUrl: "https://images.unsplash.com/photo-1616118132534-381148898bb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      priceOptions: [
        { quantity: 25, price: 451 },
        { quantity: 50, price: 840 },
        { quantity: 100, price: 1645 }
      ],
      customizable: true
    },
    {
      id: "vest-01",
      name: "Gilet Jaune Avec Logo",
      description: "Gilet haute visibilité avec votre logo imprimé au cœur et à l'arrière. Idéal pour les équipes techniques et les tournages en extérieur.",
      imageUrl: "https://images.unsplash.com/photo-1590439471364-192aa70c0b53?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      priceOptions: [
        { quantity: 25, price: 290 },
        { quantity: 50, price: 550 },
        { quantity: 100, price: 810 }
      ],
      customizable: true
    }
  ];

  return (
    <section className="py-16 bg-cinema-darkgray">
      <div className="cinema-container">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h2 className="text-3xl font-bold text-white">
            Nos <span className="text-cinema-red">Produits</span>
          </h2>
          
          <div className="flex space-x-2 mt-4 sm:mt-0">
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'populaires' 
                  ? 'bg-cinema-red text-white' 
                  : 'bg-cinema-black text-gray-300 hover:bg-cinema-black/90'
              }`}
              onClick={() => setActiveTab('populaires')}
            >
              Populaires
            </button>
            <button
              className={`px-4 py-2 rounded-md transition-colors ${
                activeTab === 'nouveautes' 
                  ? 'bg-cinema-red text-white' 
                  : 'bg-cinema-black text-gray-300 hover:bg-cinema-black/90'
              }`}
              onClick={() => setActiveTab('nouveautes')}
            >
              Nouveautés
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
