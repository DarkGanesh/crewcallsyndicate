
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ShoppingCart, Pencil } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PriceOption {
  quantity: number;
  price: number;
}

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  priceOptions: PriceOption[];
  customizable: boolean;
}

const ProductCard = ({
  id,
  name,
  description,
  imageUrl,
  priceOptions,
  customizable
}: ProductCardProps) => {
  const { toast } = useToast();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState<number | null>(null);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const handleQuantitySelect = (quantity: number) => {
    setSelectedQuantity(quantity);
  };

  const getSelectedPrice = () => {
    if (!selectedQuantity) return null;
    const option = priceOptions.find(option => option.quantity === selectedQuantity);
    return option ? option.price : null;
  };

  const handleAddToCart = () => {
    if (!selectedQuantity) return;
    
    // In a real app, this would dispatch to a cart context or state manager
    toast({
      title: "Ajouté au panier",
      description: `${name} (${selectedQuantity} unités) a été ajouté à votre panier`,
    });
  };

  return (
    <div className="cinema-card group">
      {/* Product Image */}
      <div className="relative h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {customizable && (
          <div className="absolute top-2 right-2 bg-cinema-red text-white text-xs px-2 py-1 rounded-full flex items-center">
            <Pencil className="h-3 w-3 mr-1" />
            Personnalisable
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-white font-bold text-lg">{name}</h3>
        <p className="text-gray-400 text-sm mt-1 line-clamp-2">{description}</p>
        
        <div className="mt-4">
          <button 
            className="flex items-center justify-between w-full text-white" 
            onClick={toggleExpand}
          >
            <span className="font-semibold">Prix selon quantité</span>
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
          
          {isExpanded && (
            <div className="mt-2 space-y-2 bg-cinema-black p-3 rounded-md">
              {priceOptions.map(option => (
                <button
                  key={option.quantity}
                  className={`flex items-center justify-between w-full py-2 px-3 rounded-md transition-colors ${
                    selectedQuantity === option.quantity 
                      ? 'bg-cinema-red text-white' 
                      : 'bg-cinema-darkgray text-gray-300 hover:bg-cinema-darkgray/80'
                  }`}
                  onClick={() => handleQuantitySelect(option.quantity)}
                >
                  <span>{option.quantity} unités</span>
                  <span>{option.price.toFixed(2)}€</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="mt-4 flex space-x-2">
          <Link
            to={`/produits/${id}`}
            className="button-cinema-outline flex-1 text-center py-2"
          >
            Détails
          </Link>
          
          <button
            className={`button-cinema flex-1 flex items-center justify-center space-x-1 ${
              !selectedQuantity ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={!selectedQuantity}
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Commander</span>
          </button>
        </div>
        
        {selectedQuantity && (
          <div className="mt-2 text-center text-sm text-white">
            Total: <span className="font-bold text-cinema-red">{getSelectedPrice()?.toFixed(2)}€</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
