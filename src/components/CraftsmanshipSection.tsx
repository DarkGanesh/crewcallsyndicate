
import { Palette, Users, Heart, Lightbulb } from 'lucide-react';

const CraftsmanshipSection = () => {
  return (
    <section className="py-20 bg-cinema-darkgray relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-cinema-red/5 rounded-full -translate-x-16 -translate-y-16" />
      <div className="absolute bottom-0 right-0 w-48 h-48 bg-cinema-red/5 rounded-full translate-x-24 translate-y-24" />
      
      <div className="cinema-container relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            L'Art du <span className="text-cinema-red">Fait Main</span>
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Chaque création est unique, pensée et réalisée avec passion pour refléter l'identité de votre équipe et l'essence de vos projets cinématographiques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="text-center group">
            <div className="w-20 h-20 bg-cinema-red/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cinema-red/20 transition-colors">
              <Palette className="h-10 w-10 text-cinema-red" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Création Sur-Mesure</h3>
            <p className="text-gray-400 text-sm">Chaque design est créé spécialement pour votre projet</p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-cinema-red/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cinema-red/20 transition-colors">
              <Users className="h-10 w-10 text-cinema-red" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Équipe Dédiée</h3>
            <p className="text-gray-400 text-sm">Une équipe passionnée par le cinéma et l'artisanat</p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-cinema-red/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cinema-red/20 transition-colors">
              <Heart className="h-10 w-10 text-cinema-red" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Avec Passion</h3>
            <p className="text-gray-400 text-sm">Chaque pièce est réalisée avec amour et attention</p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-cinema-red/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-cinema-red/20 transition-colors">
              <Lightbulb className="h-10 w-10 text-cinema-red" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">Innovation</h3>
            <p className="text-gray-400 text-sm">Des idées créatives pour des résultats uniques</p>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-cinema-black/30 rounded-lg p-8 backdrop-blur-sm border border-cinema-red/20">
          <h3 className="text-2xl font-bold text-white text-center mb-8">Notre Processus Artisanal</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-cinema-red rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">1</div>
              <h4 className="text-white font-semibold mb-2">Écoute & Conception</h4>
              <p className="text-gray-400 text-sm">Nous comprenons vos besoins et créons des designs uniques adaptés à votre univers cinématographique</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-cinema-red rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">2</div>
              <h4 className="text-white font-semibold mb-2">Fabrication Artisanale</h4>
              <p className="text-gray-400 text-sm">Chaque pièce est soigneusement fabriquée à la main avec des matériaux de qualité premium</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-cinema-red rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">3</div>
              <h4 className="text-white font-semibold mb-2">Livraison Soignée</h4>
              <p className="text-gray-400 text-sm">Vos créations vous parviennent dans un emballage soigné, prêtes à accompagner vos tournages</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CraftsmanshipSection;
