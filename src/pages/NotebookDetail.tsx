
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Plus, Minus, ArrowRight, Book, Layers, Ruler } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Checkbox } from "@/components/ui/checkbox";

interface NotebookConfig {
  orientation: "portrait" | "landscape";
  format: "a5" | "a4" | "square" | "custom";
  customWidth?: number;
  customHeight?: number;
  bindingColor: "white" | "black";
  bindingPosition: "top" | "left";
  sheets: "50" | "100";
  interiorPaper: "standard";
  coverEnabled: boolean;
  coverPaper: "glossy250" | "matte300";
  coverFinish: "none" | "glossy" | "matte" | "softTouch";
  quantity: number;
}

const NotebookDetail = () => {
  const { toast } = useToast();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isCustomFormat, setIsCustomFormat] = useState(false);
  const [basePrice, setBasePrice] = useState(12.99);

  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm<NotebookConfig>({
    defaultValues: {
      orientation: "portrait",
      format: "a5",
      bindingColor: "black",
      bindingPosition: "left",
      sheets: "50",
      interiorPaper: "standard",
      coverEnabled: true,
      coverPaper: "matte300",
      coverFinish: "none",
      quantity: 1
    }
  });

  const watchOrientation = watch("orientation");
  const watchFormat = watch("format");
  const watchSheets = watch("sheets");
  const watchCoverEnabled = watch("coverEnabled");

  // Calculate price based on configuration
  const calculatePrice = () => {
    let price = basePrice;
    
    // Format adjustments
    if (watchFormat === "a4") price += 5;
    else if (watchFormat === "square") price += 3;
    
    // Sheets adjustments
    if (watchSheets === "100") price += 7;
    
    // Cover adjustments
    if (watchCoverEnabled) {
      price += 2;
    }
    
    return price * quantity;
  };

  const totalPrice = calculatePrice();

  const handleQuantityChange = (value: number) => {
    if (value >= 1) {
      setQuantity(value);
      setValue("quantity", value);
    }
  };

  const onSubmit = (data: NotebookConfig) => {
    const productDescription = `Bloc-notes spirale ${data.orientation} ${data.format !== "custom" ? data.format.toUpperCase() : "sur mesure"}, ${data.sheets} feuillets, spirale ${data.bindingColor} ${data.bindingPosition === "top" ? "en haut" : "à gauche"}`;
    
    addToCart({
      id: `notebook-${Date.now()}`,
      name: "Bloc-notes spirale personnalisé",
      description: productDescription,
      imageUrl: "/lovable-uploads/a9b41b22-bdd7-4cf9-b8a4-4cba9d19f24c.png",
      price: totalPrice,
      quantity: data.quantity,
      customizable: true,
      selectedQuantity: data.quantity
    });
    
    toast({
      title: "Ajouté au panier",
      description: "Votre bloc-notes personnalisé a été ajouté au panier",
    });
  };

  const formatOptions = [
    { id: "a5", label: "A5 (14,8 x 21 cm)", value: "a5" },
    { id: "a4", label: "A4 (21 x 29,7 cm)", value: "a4" },
    { id: "square", label: "Carré (21 x 21 cm)", value: "square" },
    { id: "custom", label: "Sur mesure", value: "custom" }
  ];

  return (
    <div className="min-h-screen bg-cinema-black text-white pb-20">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <div className="bg-cinema-darkgray rounded-lg p-6 shadow-xl sticky top-24">
              <img 
                src="/lovable-uploads/a9b41b22-bdd7-4cf9-b8a4-4cba9d19f24c.png" 
                alt="Bloc-notes spirale personnalisé" 
                className="w-full h-auto object-contain"
              />
              <div className="mt-6 border-t border-gray-700 pt-4">
                <h3 className="text-lg font-bold mb-2">Configuration actuelle</h3>
                <div className="text-gray-300 space-y-1 text-sm">
                  <p className="flex items-center gap-2">
                    <Book className="h-4 w-4 text-cinema-red" />
                    <span>Format: {isCustomFormat ? "Sur mesure" : watchFormat.toUpperCase()}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Layers className="h-4 w-4 text-cinema-red" />
                    <span>Pages: {watchSheets} feuillets</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-cinema-red" />
                    <span>Orientation: {watchOrientation === "portrait" ? "Portrait" : "Paysage"}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Configuration */}
          <div className="lg:w-1/2">
            <div className="mb-6">
              <h1 className="text-3xl font-bold">Bloc-notes spirale personnalisé</h1>
              <p className="mt-2 text-gray-400">
                Configurez votre bloc-notes selon vos besoins et préférences
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Orientation */}
              <div className="bg-cinema-darkgray p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-cinema-red mr-2">1.</span> Choix de l'orientation
                </h2>
                <div className="mt-2">
                  <ToggleGroup type="single" defaultValue={watchOrientation} onValueChange={(value: "portrait" | "landscape") => setValue("orientation", value)}>
                    <ToggleGroupItem value="portrait" className="flex-1">Portrait</ToggleGroupItem>
                    <ToggleGroupItem value="landscape" className="flex-1">Paysage</ToggleGroupItem>
                  </ToggleGroup>
                </div>
              </div>

              {/* Format */}
              <div className="bg-cinema-darkgray p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-cinema-red mr-2">2.</span> Sélection du format fermé
                </h2>
                <RadioGroup defaultValue={watchFormat} className="space-y-3" onValueChange={(value) => {
                  setValue("format", value as "a5" | "a4" | "square" | "custom");
                  setIsCustomFormat(value === "custom");
                }}>
                  {formatOptions.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.value} id={option.id} />
                      <Label htmlFor={option.id} className="cursor-pointer">{option.label}</Label>
                    </div>
                  ))}
                </RadioGroup>
                
                {isCustomFormat && (
                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="custom-width">Largeur (cm)</Label>
                      <Input 
                        id="custom-width" 
                        type="number" 
                        min="5" 
                        max="30" 
                        step="0.1" 
                        {...register("customWidth", { required: isCustomFormat })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="custom-height">Hauteur (cm)</Label>
                      <Input 
                        id="custom-height" 
                        type="number" 
                        min="5" 
                        max="42" 
                        step="0.1" 
                        {...register("customHeight", { required: isCustomFormat })}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Binding Color and Position */}
              <div className="bg-cinema-darkgray p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-cinema-red mr-2">3.</span> Reliure spirale (Wire'O)
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Couleur de la spirale</Label>
                    <ToggleGroup type="single" defaultValue="black" onValueChange={(value: "white" | "black") => setValue("bindingColor", value)}>
                      <ToggleGroupItem value="white" className="flex-1">Blanc</ToggleGroupItem>
                      <ToggleGroupItem value="black" className="flex-1">Noir</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Position de la spirale</Label>
                    <ToggleGroup type="single" defaultValue="left" onValueChange={(value: "top" | "left") => setValue("bindingPosition", value)}>
                      <ToggleGroupItem value="top" className="flex-1">Haut</ToggleGroupItem>
                      <ToggleGroupItem value="left" className="flex-1">Gauche</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                </div>
              </div>

              {/* Interior */}
              <div className="bg-cinema-darkgray p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-cinema-red mr-2">4.</span> Intérieur du bloc-notes
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <Label className="mb-2 block">Nombre de feuillets</Label>
                    <ToggleGroup type="single" defaultValue="50" onValueChange={(value: "50" | "100") => setValue("sheets", value)}>
                      <ToggleGroupItem value="50" className="flex-1">50 feuillets</ToggleGroupItem>
                      <ToggleGroupItem value="100" className="flex-1">100 feuillets</ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Support intérieur</Label>
                    <Select defaultValue="standard" onValueChange={(value) => setValue("interiorPaper", value as "standard")}>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un support" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="standard">Papier standard 80g/m²</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Cover */}
              <div className="bg-cinema-darkgray p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-cinema-red mr-2">5.</span> Couverture du bloc-notes
                </h2>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="cover-enabled" 
                      checked={watchCoverEnabled}
                      onCheckedChange={(checked) => setValue("coverEnabled", checked as boolean)}
                    />
                    <Label htmlFor="cover-enabled">Ajouter des pages de couverture</Label>
                  </div>
                  
                  {watchCoverEnabled && (
                    <>
                      <div>
                        <Label className="mb-2 block">Support couverture</Label>
                        <Select defaultValue="matte300" onValueChange={(value) => setValue("coverPaper", value as "glossy250" | "matte300")}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un support" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="glossy250">250g/m² couché brillant</SelectItem>
                            <SelectItem value="matte300">300g/m² couché mat</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <Label className="mb-2 block">Pelliculage</Label>
                        <Select defaultValue="none" onValueChange={(value) => setValue("coverFinish", value as "none" | "glossy" | "matte" | "softTouch")}>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un pelliculage" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">Sans pelliculage</SelectItem>
                            <SelectItem value="glossy">Brillant</SelectItem>
                            <SelectItem value="matte">Mat</SelectItem>
                            <SelectItem value="softTouch">Soft Touch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Quantity */}
              <div className="bg-cinema-darkgray p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <span className="text-cinema-red mr-2">6.</span> Quantité à commander
                </h2>
                
                <div className="flex items-center">
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleQuantityChange(quantity - 1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="w-16 mx-2">
                    <Input 
                      type="number" 
                      min="1" 
                      value={quantity} 
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                      className="text-center"
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon"
                    onClick={() => handleQuantityChange(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Price and Add to Cart */}
              <div className="fixed bottom-0 left-0 right-0 bg-cinema-black border-t border-gray-800 p-4 lg:static lg:border-0 lg:p-0 lg:mt-8 z-10">
                <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xl font-bold">
                    Prix total: <span className="text-cinema-red">{totalPrice.toFixed(2)}€</span>
                  </div>
                  <Button type="submit" className="w-full sm:w-auto">
                    Ajouter au panier <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotebookDetail;
