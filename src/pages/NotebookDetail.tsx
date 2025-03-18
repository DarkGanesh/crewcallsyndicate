
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import { Check, ArrowLeft, ArrowRight, Minus, Plus, ShoppingCart } from "lucide-react";

const NotebookDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  // Product information
  const product = {
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
  };

  // Configuration state
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("portrait");
  const [format, setFormat] = useState<"a5" | "a4" | "square" | "custom">("a5");
  const [customWidth, setCustomWidth] = useState<number>(0);
  const [customHeight, setCustomHeight] = useState<number>(0);
  const [bindingType] = useState<"spiral">("spiral");
  const [bindingColor, setBindingColor] = useState<"white" | "black">("black");
  const [bindingPosition, setBindingPosition] = useState<"top" | "left">("top");
  const [sheetsCount, setSheetsCount] = useState<50 | 100>(50);
  const [interiorPaper] = useState<"standard">("standard");
  const [hasCover, setHasCover] = useState<boolean>(true);
  const [coverType, setCoverType] = useState<"glossy" | "matte">("glossy");
  const [coverFinish, setCoverFinish] = useState<"glossy" | "matte" | "soft-touch">("glossy");
  const [quantity, setQuantity] = useState<number>(25);
  const [activeStep, setActiveStep] = useState<number>(1);

  // Handle quantity changes
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  // Calculate price based on configuration and quantity
  const calculatePrice = () => {
    const basePrice = product.priceOptions.find(option => option.quantity <= quantity)?.price || product.priceOptions[0].price;
    const sizeFactor = format === "a4" ? 1.3 : 1;
    const sheetsFactor = sheetsCount === 100 ? 1.5 : 1;
    const coverFactor = hasCover ? (coverFinish === "soft-touch" ? 1.2 : 1.1) : 1;
    
    return Math.round(basePrice * sizeFactor * sheetsFactor * coverFactor);
  };

  // Handle add to cart
  const handleAddToCart = () => {
    const configOptions = {
      orientation,
      format: format === "custom" ? `${customWidth}x${customHeight}cm` : format,
      bindingType,
      bindingColor,
      bindingPosition,
      sheetsCount,
      interiorPaper,
      hasCover,
      coverType: hasCover ? coverType : null,
      coverFinish: hasCover ? coverFinish : null
    };

    addToCart({
      id: product.id,
      name: product.name,
      imageUrl: product.imageUrl,
      price: calculatePrice(),
      quantity,
      customizable: true,
      selectedQuantity: quantity
    });
    
    toast({
      title: "Ajouté au panier",
      description: `${product.name} a été ajouté à votre panier`,
    });
  };

  // Navigate between steps
  const goToNextStep = () => {
    if (activeStep < 7) {
      setActiveStep(activeStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
  };

  // Format dimensions display
  const formatDimensions = (format: string) => {
    switch(format) {
      case "a5": return "A5 (14,8 x 21 cm)";
      case "a4": return "A4 (21 x 29,7 cm)";
      case "square": return "Carré (21 x 21 cm)";
      case "custom": return "Sur mesure";
      default: return "";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-cinema-black">
      <Navbar />
      <main className="flex-grow">
        {/* Back Button */}
        <div className="py-4 bg-cinema-darkgray border-b border-cinema-red/20">
          <div className="cinema-container">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-white hover:text-cinema-red transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour aux produits
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="py-8 bg-cinema-black">
          <div className="cinema-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Image */}
              <div className="bg-cinema-darkgray rounded-lg overflow-hidden border border-cinema-red/20">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-auto object-contain aspect-square"
                />
              </div>

              {/* Product Details and Customization */}
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{product.name}</h1>
                <p className="text-gray-400 mb-6">{product.description}</p>
                
                <div className="bg-cinema-darkgray rounded-lg p-6 border border-cinema-red/20">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-white">Personnalisation</h2>
                    <span className="text-cinema-red font-semibold">Étape {activeStep}/7</span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-cinema-black rounded-full h-2 mb-6">
                    <div
                      className="bg-cinema-red h-2 rounded-full"
                      style={{ width: `${(activeStep / 7) * 100}%` }}
                    />
                  </div>

                  {/* Step 1: Orientation */}
                  {activeStep === 1 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Choisissez l'orientation</h3>
                      <RadioGroup 
                        value={orientation} 
                        onValueChange={(value) => setOrientation(value as "portrait" | "landscape")}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2 p-3 rounded-md bg-cinema-black hover:bg-cinema-black/80">
                          <RadioGroupItem value="portrait" id="portrait" />
                          <Label htmlFor="portrait" className="text-white cursor-pointer">Portrait</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-md bg-cinema-black hover:bg-cinema-black/80">
                          <RadioGroupItem value="landscape" id="landscape" />
                          <Label htmlFor="landscape" className="text-white cursor-pointer">Paysage</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  )}

                  {/* Step 2: Format */}
                  {activeStep === 2 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Sélection du format fermé</h3>
                      <RadioGroup 
                        value={format} 
                        onValueChange={(value) => setFormat(value as "a5" | "a4" | "square" | "custom")}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2 p-3 rounded-md bg-cinema-black hover:bg-cinema-black/80">
                          <RadioGroupItem value="a5" id="a5" />
                          <Label htmlFor="a5" className="text-white cursor-pointer">A5 (14,8 x 21 cm)</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-md bg-cinema-black hover:bg-cinema-black/80">
                          <RadioGroupItem value="a4" id="a4" />
                          <Label htmlFor="a4" className="text-white cursor-pointer">A4 (21 x 29,7 cm)</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-md bg-cinema-black hover:bg-cinema-black/80">
                          <RadioGroupItem value="square" id="square" />
                          <Label htmlFor="square" className="text-white cursor-pointer">Carré (21 x 21 cm)</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-md bg-cinema-black hover:bg-cinema-black/80">
                          <RadioGroupItem value="custom" id="custom" />
                          <Label htmlFor="custom" className="text-white cursor-pointer">Sur mesure</Label>
                        </div>
                      </RadioGroup>

                      {format === "custom" && (
                        <div className="mt-4 space-y-3 p-4 bg-cinema-black rounded-md">
                          <div>
                            <Label htmlFor="width" className="text-white">Largeur (cm)</Label>
                            <Input 
                              id="width"
                              type="number"
                              value={customWidth || ''}
                              onChange={(e) => setCustomWidth(Number(e.target.value))}
                              className="mt-1 bg-cinema-darkgray text-white border-gray-700" 
                            />
                          </div>
                          <div>
                            <Label htmlFor="height" className="text-white">Hauteur (cm)</Label>
                            <Input 
                              id="height"
                              type="number"
                              value={customHeight || ''}
                              onChange={(e) => setCustomHeight(Number(e.target.value))}
                              className="mt-1 bg-cinema-darkgray text-white border-gray-700" 
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 3: Binding Type */}
                  {activeStep === 3 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Type de reliure</h3>
                      <div className="flex items-center space-x-2 p-3 rounded-md bg-cinema-black hover:bg-cinema-black/80">
                        <div className="w-5 h-5 rounded-full bg-cinema-red flex items-center justify-center text-white">
                          <Check className="h-3 w-3" />
                        </div>
                        <span className="text-white">Spirale (Wire'O)</span>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Binding Color and Position */}
                  {activeStep === 4 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Couleur de la spirale</h3>
                      <ToggleGroup 
                        type="single" 
                        value={bindingColor}
                        onValueChange={(value) => {
                          if (value) setBindingColor(value as "white" | "black");
                        }}
                        className="flex justify-start space-x-2"
                      >
                        <ToggleGroupItem 
                          value="white" 
                          className={`px-4 py-2 ${bindingColor === "white" ? "bg-cinema-red text-white" : "bg-white text-black"}`}
                        >
                          Blanc
                        </ToggleGroupItem>
                        <ToggleGroupItem 
                          value="black" 
                          className={`px-4 py-2 ${bindingColor === "black" ? "bg-cinema-red text-white" : "bg-black text-white"}`}
                        >
                          Noir
                        </ToggleGroupItem>
                      </ToggleGroup>

                      <h3 className="text-lg font-semibold text-white mt-6">Position de la spirale</h3>
                      <ToggleGroup 
                        type="single" 
                        value={bindingPosition}
                        onValueChange={(value) => {
                          if (value) setBindingPosition(value as "top" | "left");
                        }}
                        className="flex justify-start space-x-2"
                      >
                        <ToggleGroupItem 
                          value="top" 
                          className={`px-4 py-2 ${bindingPosition === "top" ? "bg-cinema-red text-white" : "bg-cinema-black text-white"}`}
                        >
                          Haut
                        </ToggleGroupItem>
                        <ToggleGroupItem 
                          value="left" 
                          className={`px-4 py-2 ${bindingPosition === "left" ? "bg-cinema-red text-white" : "bg-cinema-black text-white"}`}
                        >
                          Gauche
                        </ToggleGroupItem>
                      </ToggleGroup>
                    </div>
                  )}

                  {/* Step 5: Interior Pages */}
                  {activeStep === 5 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Nombre de feuillets</h3>
                      <ToggleGroup 
                        type="single" 
                        value={sheetsCount.toString()}
                        onValueChange={(value) => {
                          if (value) setSheetsCount(Number(value) as 50 | 100);
                        }}
                        className="flex justify-start space-x-2"
                      >
                        <ToggleGroupItem 
                          value="50" 
                          className={`px-4 py-2 ${sheetsCount === 50 ? "bg-cinema-red text-white" : "bg-cinema-black text-white"}`}
                        >
                          50 feuillets
                        </ToggleGroupItem>
                        <ToggleGroupItem 
                          value="100" 
                          className={`px-4 py-2 ${sheetsCount === 100 ? "bg-cinema-red text-white" : "bg-cinema-black text-white"}`}
                        >
                          100 feuillets
                        </ToggleGroupItem>
                      </ToggleGroup>

                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-white">Face imprimée</h3>
                        <div className="flex items-center space-x-2 p-3 rounded-md bg-cinema-black hover:bg-cinema-black/80 mt-2">
                          <div className="w-5 h-5 rounded-full bg-cinema-red flex items-center justify-center text-white">
                            <Check className="h-3 w-3" />
                          </div>
                          <span className="text-white">Recto uniquement</span>
                        </div>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-white">Support intérieur</h3>
                        <div className="flex items-center space-x-2 p-3 rounded-md bg-cinema-black hover:bg-cinema-black/80 mt-2">
                          <div className="w-5 h-5 rounded-full bg-cinema-red flex items-center justify-center text-white">
                            <Check className="h-3 w-3" />
                          </div>
                          <span className="text-white">Papier standard 80g/m²</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 6: Cover */}
                  {activeStep === 6 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Pages de couverture</h3>
                      <RadioGroup 
                        value={hasCover ? "yes" : "no"} 
                        onValueChange={(value) => setHasCover(value === "yes")}
                        className="flex flex-col space-y-2"
                      >
                        <div className="flex items-center space-x-2 p-3 rounded-md bg-cinema-black hover:bg-cinema-black/80">
                          <RadioGroupItem value="yes" id="cover-yes" />
                          <Label htmlFor="cover-yes" className="text-white cursor-pointer">Oui</Label>
                        </div>
                        <div className="flex items-center space-x-2 p-3 rounded-md bg-cinema-black hover:bg-cinema-black/80">
                          <RadioGroupItem value="no" id="cover-no" />
                          <Label htmlFor="cover-no" className="text-white cursor-pointer">Non</Label>
                        </div>
                      </RadioGroup>

                      {hasCover && (
                        <>
                          <h3 className="text-lg font-semibold text-white mt-6">Support couverture</h3>
                          <RadioGroup 
                            value={coverType} 
                            onValueChange={(value) => setCoverType(value as "glossy" | "matte")}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2 p-3 rounded-md bg-cinema-black hover:bg-cinema-black/80">
                              <RadioGroupItem value="glossy" id="cover-glossy" />
                              <Label htmlFor="cover-glossy" className="text-white cursor-pointer">250g/m² couché brillant</Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 rounded-md bg-cinema-black hover:bg-cinema-black/80">
                              <RadioGroupItem value="matte" id="cover-matte" />
                              <Label htmlFor="cover-matte" className="text-white cursor-pointer">300g/m² couché mat</Label>
                            </div>
                          </RadioGroup>

                          <div className="mt-6">
                            <h3 className="text-lg font-semibold text-white">Pages imprimées</h3>
                            <div className="flex items-center space-x-2 p-3 rounded-md bg-cinema-black hover:bg-cinema-black/80 mt-2">
                              <div className="w-5 h-5 rounded-full bg-cinema-red flex items-center justify-center text-white">
                                <Check className="h-3 w-3" />
                              </div>
                              <span className="text-white">Recto uniquement</span>
                            </div>
                          </div>

                          <h3 className="text-lg font-semibold text-white mt-6">Pelliculage</h3>
                          <RadioGroup 
                            value={coverFinish} 
                            onValueChange={(value) => setCoverFinish(value as "glossy" | "matte" | "soft-touch")}
                            className="flex flex-col space-y-2"
                          >
                            <div className="flex items-center space-x-2 p-3 rounded-md bg-cinema-black hover:bg-cinema-black/80">
                              <RadioGroupItem value="glossy" id="finish-glossy" />
                              <Label htmlFor="finish-glossy" className="text-white cursor-pointer">Brillant</Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 rounded-md bg-cinema-black hover:bg-cinema-black/80">
                              <RadioGroupItem value="matte" id="finish-matte" />
                              <Label htmlFor="finish-matte" className="text-white cursor-pointer">Mat</Label>
                            </div>
                            <div className="flex items-center space-x-2 p-3 rounded-md bg-cinema-black hover:bg-cinema-black/80">
                              <RadioGroupItem value="soft-touch" id="finish-soft-touch" />
                              <Label htmlFor="finish-soft-touch" className="text-white cursor-pointer">Soft Touch</Label>
                            </div>
                          </RadioGroup>
                        </>
                      )}
                    </div>
                  )}

                  {/* Step 7: Quantity */}
                  {activeStep === 7 && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-white">Quantité à commander</h3>
                      
                      <div className="flex items-center space-x-4">
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={decrementQuantity}
                          disabled={quantity <= 1}
                          className="border-gray-600 hover:bg-cinema-red hover:text-white"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <Input
                          type="number"
                          value={quantity}
                          onChange={(e) => setQuantity(Number(e.target.value))}
                          className="bg-cinema-darkgray text-white border-gray-700 text-center"
                          min={1}
                        />
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={incrementQuantity}
                          className="border-gray-600 hover:bg-cinema-red hover:text-white"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-white">Options rapides</h3>
                        <div className="grid grid-cols-3 gap-2 mt-2">
                          {product.priceOptions.map((option) => (
                            <Button
                              key={option.quantity}
                              variant="outline"
                              onClick={() => setQuantity(option.quantity)}
                              className={`border-gray-600 ${
                                quantity === option.quantity ? 'bg-cinema-red text-white' : 'hover:bg-cinema-red hover:text-white'
                              }`}
                            >
                              {option.quantity}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation buttons */}
                  <div className="flex justify-between mt-8">
                    <Button
                      variant="outline"
                      onClick={goToPreviousStep}
                      disabled={activeStep === 1}
                      className="border-gray-600 hover:bg-cinema-red hover:text-white"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Précédent
                    </Button>
                    
                    {activeStep < 7 ? (
                      <Button
                        onClick={goToNextStep}
                        className="bg-cinema-red hover:bg-cinema-red/90 text-white"
                      >
                        Suivant
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button
                        onClick={handleAddToCart}
                        className="bg-cinema-red hover:bg-cinema-red/90 text-white"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Ajouter au panier
                      </Button>
                    )}
                  </div>
                </div>

                {/* Configuration Summary */}
                <div className="mt-6 p-6 bg-cinema-darkgray rounded-lg border border-cinema-red/20">
                  <h2 className="text-xl font-bold text-white mb-4">Récapitulatif</h2>
                  
                  <div className="space-y-3 mb-4 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Orientation</span>
                      <span className="text-white">{orientation === "portrait" ? "Portrait" : "Paysage"}</span>
                    </div>
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Format</span>
                      <span className="text-white">{formatDimensions(format)}</span>
                    </div>
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Reliure</span>
                      <span className="text-white">Spirale {bindingColor === "white" ? "Blanche" : "Noire"} ({bindingPosition === "top" ? "Haut" : "Gauche"})</span>
                    </div>
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Feuillets</span>
                      <span className="text-white">{sheetsCount} pages</span>
                    </div>
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Couverture</span>
                      <span className="text-white">
                        {hasCover 
                          ? `${coverType === "glossy" ? "250g/m² brillant" : "300g/m² mat"}, Pelliculage ${
                              coverFinish === "glossy" ? "brillant" : coverFinish === "matte" ? "mat" : "soft touch"
                            }`
                          : "Sans couverture"}
                      </span>
                    </div>
                    <Separator className="bg-gray-800" />
                    
                    <div className="flex justify-between">
                      <span className="text-gray-400">Quantité</span>
                      <span className="text-white">{quantity} unités</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-800">
                    <span className="text-lg text-white">Prix total</span>
                    <span className="text-2xl font-bold text-cinema-red">{calculatePrice().toFixed(2)}€</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotebookDetail;
