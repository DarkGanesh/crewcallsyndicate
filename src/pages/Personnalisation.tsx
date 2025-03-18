
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, ShoppingBag, Shirt, ArrowRight } from 'lucide-react';

const Personnalisation = () => {
  return (
    <div className="min-h-screen bg-cinema-black text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold">Personnalisation</h1>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Explorez nos options de personnalisation pour créer des produits uniques qui répondent parfaitement à vos besoins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {/* Textile Marking Option */}
          <div className="bg-cinema-darkgray rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
            <div className="h-48 overflow-hidden relative">
              <img 
                src="/lovable-uploads/5168c031-adeb-43d6-8bc5-fd1e69743a32.png" 
                alt="Marquage textile" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinema-black/80 to-transparent flex items-end p-4">
                <Shirt className="text-cinema-red h-8 w-8" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold">Marquage Textile</h3>
              <p className="mt-2 text-gray-400 mb-6">
                Personnalisez vos vêtements avec notre service de marquage textile professionnel.
              </p>
              <Link to="/marquage-textile" className="button-cinema flex items-center justify-center">
                Découvrir <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Spiral Notebooks Option */}
          <div className="bg-cinema-darkgray rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
            <div className="h-48 overflow-hidden relative">
              <img 
                src="/lovable-uploads/a9b41b22-bdd7-4cf9-b8a4-4cba9d19f24c.png" 
                alt="Blocs-notes spirale" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinema-black/80 to-transparent flex items-end p-4">
                <Book className="text-cinema-red h-8 w-8" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold">Blocs-notes Spirale</h3>
              <p className="mt-2 text-gray-400 mb-6">
                Créez des blocs-notes personnalisés avec reliure spirale pour vos besoins professionnels.
              </p>
              <Link to="/bloc-notes" className="button-cinema flex items-center justify-center">
                Configurer <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Custom Bags Option */}
          <div className="bg-cinema-darkgray rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
            <div className="h-48 overflow-hidden relative">
              <img 
                src="/lovable-uploads/9c91e62a-099a-4707-9a88-1b547833aefb.png" 
                alt="Sacs personnalisés" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-cinema-black/80 to-transparent flex items-end p-4">
                <ShoppingBag className="text-cinema-red h-8 w-8" />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold">Sacs Personnalisés</h3>
              <p className="mt-2 text-gray-400 mb-6">
                Concevez des sacs personnalisés pour vos événements, votre marque ou votre entreprise.
              </p>
              <div className="button-cinema-outline flex items-center justify-center opacity-70 cursor-not-allowed">
                Bientôt disponible
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Vous avez un projet spécifique ?</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Nous pouvons vous accompagner dans la réalisation de vos projets sur-mesure. Notre équipe est à votre disposition pour étudier toutes vos demandes.
          </p>
          <Link to="/contact" className="button-cinema-outline inline-flex items-center">
            Nous contacter <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Personnalisation;
