
import { useState } from 'react';
import ProductCard from './ProductCard';

const FeaturedProducts = () => {
  const [activeTab, setActiveTab] = useState<'populaires' | 'nouveautes'>('populaires');

  const products = [
    {
      id: "notepad-01",
      name: "Bloc-Note Logo Avant",
      description: "Bloc-note professionnel avec votre logo imprimé en première page. Idéal pour les prises de notes sur le plateau.",
      imageUrl: "/lovable-uploads/9c91e62a-099a-4707-9a88-1b547833aefb.png",
      priceOptions: [
        { quantity: 25, price: 160 },
        { quantity: 50, price: 226 },
        { quantity: 100, price: 353 }
      ],
      customizable: true
    },
    {
      id: "tshirt-01",
      name: "Tee-Shirt avec Logo",
      description: "Tee-shirt de qualité supérieure avec votre logo à l'arrière et sur le cœur. Livraison incluse.",
      imageUrl: "/lovable-uploads/42a5b439-a8b0-4979-ab59-5cff1585cfae.png",
      priceOptions: [
        { quantity: 25, price: 274 },
        { quantity: 50, price: 500 },
        { quantity: 100, price: 958 }
      ],
      customizable: true
    },
    {
      id: "stickers-01",
      name: "Stickers Logo",
      description: "Stickers personnalisés avec votre logo, idéaux pour marquer votre matériel ou créer des produits dérivés.",
      imageUrl: "/lovable-uploads/ed280022-59c7-4fdf-976d-e24a80fae5c1.png",
      priceOptions: [
        { quantity: 25, price: 230 },
        { quantity: 50, price: 290 },
        { quantity: 100, price: 410 }
      ],
      customizable: true
    },
    {
      id: "bottle-01",
      name: "Gourde Logo Bas",
      description: "Gourde écologique et durable avec votre logo imprimé en bas de la gourde. Maintient vos boissons fraîches ou chaudes.",
      imageUrl: "/lovable-uploads/23596798-b387-4233-b44e-28ef22dfcb91.png",
      priceOptions: [
        { quantity: 25, price: 451 },
        { quantity: 50, price: 840 },
        { quantity: 100, price: 1645 }
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
