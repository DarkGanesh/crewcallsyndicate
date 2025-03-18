
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Upload, CheckCircle2 } from "lucide-react";

const Personnalisation = () => {
  const [uploadedLogo, setUploadedLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setUploadedLogo(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

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
    },
    {
      id: "cup-01",
      name: "Gobelet EcoCup Logo Avant",
      description: "Gobelet réutilisable idéal pour les événements et les plateaux de tournage. Livraison incluse.",
      imageUrl: "/lovable-uploads/ea809243-e030-4294-9a03-2812d1f6a97b.png",
      priceOptions: [
        { quantity: 100, price: 656 }
      ],
      customizable: true
    },
    {
      id: "vest-01",
      name: "Gilet Jaune Avec Logo",
      description: "Gilet haute visibilité avec votre logo imprimé au cœur et à l'arrière. Idéal pour les équipes techniques et les tournages en extérieur.",
      imageUrl: "/lovable-uploads/31ccc696-4832-4f37-8328-6b715e55b3aa.png",
      priceOptions: [
        { quantity: 25, price: 290 },
        { quantity: 50, price: 550 },
        { quantity: 100, price: 810 }
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
              Personnalisez <span className="text-cinema-red">Vos Goodies</span>
            </h1>
            <p className="text-gray-400 mt-4 max-w-2xl">
              Choisissez parmi notre gamme de produits personnalisables spécialement conçus pour l'industrie cinématographique.
            </p>
          </div>
        </div>

        {/* Logo Upload Section */}
        <div className="py-8 bg-cinema-black">
          <div className="cinema-container">
            <div className="bg-cinema-darkgray border border-cinema-red/20 rounded-lg p-6 mb-10">
              <h2 className="text-xl font-bold text-white mb-4">Téléchargez votre logo</h2>
              <p className="text-gray-400 mb-6">
                Pour une prévisualisation optimale, téléchargez un logo au format PNG ou SVG avec un fond transparent.
              </p>
              
              <div className="flex flex-col md:flex-row gap-6 items-center">
                <div className="w-full md:w-1/2">
                  <label 
                    htmlFor="logo-upload" 
                    className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-cinema-red/60 transition-colors"
                  >
                    {logoPreview ? (
                      <div className="flex flex-col items-center justify-center p-4">
                        <CheckCircle2 className="w-8 h-8 text-green-500 mb-2" />
                        <p className="text-sm text-white truncate max-w-full">{uploadedLogo?.name}</p>
                        <p className="text-xs text-gray-400 mt-1">Cliquez pour changer</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center p-4">
                        <Upload className="w-8 h-8 text-gray-400 mb-2" />
                        <p className="text-sm text-gray-400">Cliquez pour télécharger votre logo</p>
                        <p className="text-xs text-gray-500 mt-1">PNG, SVG, JPG (Max 5MB)</p>
                      </div>
                    )}
                    <input 
                      id="logo-upload" 
                      type="file" 
                      className="hidden" 
                      accept=".png,.svg,.jpg,.jpeg" 
                      onChange={handleLogoUpload}
                    />
                  </label>
                </div>
                
                <div className="w-full md:w-1/2">
                  <div className="p-4 border border-gray-700 rounded-lg h-40 flex items-center justify-center bg-cinema-black">
                    {logoPreview ? (
                      <img src={logoPreview} alt="Logo aperçu" className="max-h-32 max-w-full object-contain" />
                    ) : (
                      <p className="text-gray-500 text-center">
                        L'aperçu de votre logo apparaîtra ici
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="py-8 bg-cinema-darkgray">
          <div className="cinema-container">
            <h2 className="text-2xl font-bold text-white mb-8">
              Choisissez vos produits à personnaliser
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Personnalisation;
