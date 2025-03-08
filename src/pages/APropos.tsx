
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Film, Award, Users } from "lucide-react";

const APropos = () => {
  return (
    <div className="min-h-screen flex flex-col bg-cinema-black">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative h-80 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-black via-cinema-darkgray to-cinema-black opacity-90"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-center bg-cover"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-cinema-black via-cinema-black/80 to-transparent"></div>
          
          <div className="relative h-full cinema-container flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">À Propos de <span className="text-cinema-red">Nous</span></h1>
            <p className="text-xl text-gray-300 max-w-2xl">
              Votre partenaire pour des goodies personnalisés dédiés au monde du cinéma
            </p>
          </div>
        </div>
        
        {/* Our Story Section */}
        <section className="py-16 bg-cinema-darkgray">
          <div className="cinema-container">
            <div className="flex flex-col md:flex-row gap-12">
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-3xl font-bold text-white">Notre <span className="text-cinema-red">Histoire</span></h2>
                <p className="text-gray-400">
                  CinemaMerch est né de la passion pour le 7ème art et d'une observation: l'industrie du cinéma manquait de goodies personnalisés de qualité, adaptés aux besoins spécifiques des équipes de tournage et des productions.
                </p>
                <p className="text-gray-400">
                  Fondée en 2019 par deux professionnels du cinéma, notre entreprise s'est rapidement imposée comme la référence en matière de merchandising personnalisé pour l'industrie cinématographique française.
                </p>
                <p className="text-gray-400">
                  Aujourd'hui, nous fournissons plus de 200 productions par an, des festivals de cinéma et des écoles de cinéma à travers toute la France.
                </p>
              </div>
              
              <div className="w-full md:w-1/2">
                <div className="relative h-80 rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                    alt="L'équipe de CinemaMerch" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className="py-16 bg-cinema-black">
          <div className="cinema-container">
            <h2 className="text-3xl font-bold text-white text-center mb-12">Nos <span className="text-cinema-red">Valeurs</span></h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-cinema-darkgray p-6 rounded-lg border border-cinema-red/20 flex flex-col items-center text-center">
                <div className="p-3 bg-cinema-red/10 rounded-full mb-4">
                  <Film className="h-8 w-8 text-cinema-red" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Passion du Cinéma</h3>
                <p className="text-gray-400 text-sm">
                  Nous comprenons l'industrie cinématographique et ses besoins spécifiques, car nous en sommes issus.
                </p>
              </div>
              
              <div className="bg-cinema-darkgray p-6 rounded-lg border border-cinema-red/20 flex flex-col items-center text-center">
                <div className="p-3 bg-cinema-red/10 rounded-full mb-4">
                  <Award className="h-8 w-8 text-cinema-red" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Qualité Irréprochable</h3>
                <p className="text-gray-400 text-sm">
                  Nous ne proposons que des produits de qualité supérieure, conçus pour durer et représenter fièrement votre identité.
                </p>
              </div>
              
              <div className="bg-cinema-darkgray p-6 rounded-lg border border-cinema-red/20 flex flex-col items-center text-center">
                <div className="p-3 bg-cinema-red/10 rounded-full mb-4">
                  <Users className="h-8 w-8 text-cinema-red" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">Service Personnalisé</h3>
                <p className="text-gray-400 text-sm">
                  Chaque projet est unique et reçoit une attention particulière de notre équipe dédiée, de la conception à la livraison.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-cinema-darkgray">
          <div className="cinema-container">
            <h2 className="text-3xl font-bold text-white text-center mb-4">Notre <span className="text-cinema-red">Équipe</span></h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
              Une équipe passionnée de professionnels, alliant expertise du merchandising et connaissance approfondie de l'industrie cinématographique.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-cinema-black p-4 rounded-lg border border-gray-800">
                  <div className="aspect-square rounded-lg overflow-hidden mb-4 bg-gray-900"></div>
                  <h3 className="text-white font-bold">Membre de l'équipe</h3>
                  <p className="text-cinema-red text-sm mb-2">Poste dans l'entreprise</p>
                  <p className="text-gray-500 text-sm line-clamp-3">
                    Description du membre de l'équipe à venir...
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default APropos;
