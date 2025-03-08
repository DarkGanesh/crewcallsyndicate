
import { Link } from 'react-router-dom';

const CtaSection = () => {
  return (
    <section className="py-20 bg-cinema-red/10 relative overflow-hidden">
      {/* Film strip decoration */}
      <div className="absolute -left-20 top-0 bottom-0 w-40 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="h-8 border-y border-white"></div>
        ))}
      </div>
      
      <div className="absolute -right-20 top-0 bottom-0 w-40 opacity-5">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="h-8 border-y border-white"></div>
        ))}
      </div>
      
      <div className="cinema-container relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Prêt à Personnaliser Vos Goodies ?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Que vous soyez une production, un festival ou une école de cinéma, nous avons les solutions pour créer des goodies qui représentent votre identité.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Link 
              to="/personnalisation" 
              className="button-cinema px-8 py-3 text-lg"
            >
              Commencer la Personnalisation
            </Link>
            <Link 
              to="/contact" 
              className="button-cinema-outline px-8 py-3 text-lg"
            >
              Demander un Devis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;
