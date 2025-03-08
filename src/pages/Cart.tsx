
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  CreditCard, 
  ChevronLeft 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

// Mock cart data - in a real app, this would come from context or state management
interface CartItem {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  customizable: boolean;
  selectedQuantity: number;
}

const Cart = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "tshirt-01",
      name: "Tee-Shirt avec Logo",
      imageUrl: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 10.96,
      quantity: 2,
      customizable: true,
      selectedQuantity: 25
    },
    {
      id: "notepad-01",
      name: "Bloc-Note Logo Avant",
      imageUrl: "https://images.unsplash.com/photo-1517842645767-c639042777db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      price: 6.40,
      quantity: 1,
      customizable: true,
      selectedQuantity: 25
    }
  ]);

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    
    toast({
      title: "Article supprimé",
      description: "L'article a été retiré de votre panier",
      variant: "destructive",
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    toast({
      title: "Traitement de votre commande",
      description: "Redirection vers la page de paiement...",
    });
    // In a real app, redirect to checkout
  };

  return (
    <div className="min-h-screen flex flex-col bg-cinema-black">
      <Navbar />
      <main className="flex-grow">
        <div className="cinema-container py-12">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-white flex items-center">
              <ShoppingCart className="mr-3 h-8 w-8 text-cinema-red" />
              Votre <span className="text-cinema-red ml-2">Panier</span>
            </h1>
            <Link to="/" className="text-white hover:text-cinema-red transition-colors flex items-center">
              <ChevronLeft className="h-4 w-4 mr-1" />
              Continuer mes achats
            </Link>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-cinema-darkgray rounded-lg p-12 text-center">
              <div className="inline-block p-6 mb-6 rounded-full bg-cinema-black/50">
                <ShoppingCart className="h-16 w-16 text-cinema-red" />
              </div>
              <h2 className="text-2xl text-white font-bold mb-4">Votre panier est vide</h2>
              <p className="text-gray-400 mb-8">Ajoutez des articles à votre panier pour pouvoir les commander.</p>
              <Link to="/" className="button-cinema inline-flex items-center justify-center">
                Découvrir nos produits
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items - 2 columns on larger screens */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-cinema-darkgray rounded-lg p-4 flex flex-col sm:flex-row">
                    {/* Product Image */}
                    <div className="w-full sm:w-32 h-32 flex-shrink-0 mb-4 sm:mb-0">
                      <img 
                        src={item.imageUrl} 
                        alt={item.name} 
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    
                    {/* Product Details */}
                    <div className="flex-grow sm:ml-6 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start">
                          <h3 className="text-white font-bold">{item.name}</h3>
                          <button 
                            onClick={() => removeItem(item.id)}
                            className="text-gray-400 hover:text-cinema-red transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        {item.customizable && (
                          <span className="inline-block bg-cinema-black text-xs text-white px-2 py-1 rounded-full mt-1">
                            Personnalisable
                          </span>
                        )}
                        
                        <p className="text-gray-400 text-sm mt-1">
                          Quantité commandée: {item.selectedQuantity} unités
                        </p>
                      </div>
                      
                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center space-x-3 bg-cinema-black rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 text-white hover:text-cinema-red transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-white w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 text-white hover:text-cinema-red transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="text-white">
                          <span className="font-bold text-cinema-red">
                            {(item.price * item.quantity).toFixed(2)}€
                          </span>
                          <span className="text-sm text-gray-400 ml-1">
                            ({item.price.toFixed(2)}€ / unité)
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-cinema-darkgray rounded-lg p-6 sticky top-4">
                  <h2 className="text-xl font-bold text-white border-b border-gray-700 pb-4 mb-4">
                    Résumé de commande
                  </h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-gray-300">
                      <span>Sous-total</span>
                      <span>{getTotalPrice().toFixed(2)}€</span>
                    </div>
                    <div className="flex justify-between text-gray-300">
                      <span>Frais de livraison</span>
                      <span>Calculés à l'étape suivante</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-700 pt-4 mb-6">
                    <div className="flex justify-between text-white">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-xl text-cinema-red">
                        {getTotalPrice().toFixed(2)}€
                      </span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={handleCheckout}
                    className="w-full button-cinema flex items-center justify-center space-x-2"
                  >
                    <CreditCard className="h-4 w-4" />
                    <span>Procéder au paiement</span>
                  </Button>
                  
                  <p className="text-xs text-gray-400 text-center mt-4">
                    En continuant, vous acceptez nos conditions générales de vente et notre politique de confidentialité.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
