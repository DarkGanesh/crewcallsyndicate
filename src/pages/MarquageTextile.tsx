import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Phone, Send, ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const formSchema = z.object({
  textileType: z.string({
    required_error: "Veuillez sélectionner un type de textile",
  }),
  quantity: z.coerce.number({
    required_error: "Veuillez indiquer une quantité",
    invalid_type_error: "La quantité doit être un nombre",
  }).min(1, { message: "La quantité minimum est de 1" }),
  name: z.string().min(3, { message: "Le nom doit contenir au moins 3 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  phone: z.string().min(10, { message: "Veuillez entrer un numéro de téléphone valide" }),
  company: z.string().optional(),
  message: z.string().optional(),
  placement: z.enum(["front", "back", "both"], {
    required_error: "Veuillez sélectionner un emplacement",
  }),
  hasLogo: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const textileOptions = [
  { value: "tshirt", label: "Tee-shirt", image: "/lovable-uploads/5168c031-adeb-43d6-8bc5-fd1e69743a32.png", price: "À partir de 8€" },
  { value: "polo", label: "Polo", image: "/lovable-uploads/8b927d21-4f1d-46a8-942c-485f8ef9a461.png", price: "À partir de 12€" },
  { value: "sweatshirt", label: "Sweatshirt", image: "/lovable-uploads/15991b1f-26d2-42d6-aa1b-898d276059c1.png", price: "À partir de 18€" },
  { value: "jacket", label: "Veste", image: "/lovable-uploads/6606ff3f-df06-45cf-946e-7cae33971c53.png", price: "À partir de 25€" },
  { value: "apron", label: "Tablier", image: "/lovable-uploads/b2c63210-d2c6-474f-9a04-c885b6a50269.png", price: "À partir de 15€" },
  { value: "safetyVest", label: "Gilet de sécurité", image: "/lovable-uploads/0b6b2e29-aa96-4592-b08f-eabace70131c.png", price: "À partir de 10€" },
  { value: "cap", label: "Casquette", image: "/lovable-uploads/a9b41b22-bdd7-4cf9-b8a4-4cba9d19f24c.png", price: "À partir de 7€" },
];

const MarquageTextile = () => {
  const { addToCart } = useCart();
  const [selectedTextile, setSelectedTextile] = useState(textileOptions[0]);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      textileType: "tshirt",
      quantity: 1,
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
      placement: "front",
      hasLogo: false,
    },
  });
  
  const onSubmit = (data: FormValues) => {
    console.log("Form submitted:", data);
    
    // Send to cart
    const textile = textileOptions.find(t => t.value === data.textileType);
    
    if (textile) {
      addToCart({
        id: `textile-${Date.now()}`,
        name: `Marquage ${textile.label} (x${data.quantity})`,
        imageUrl: textile.image,
        price: 0, // Price is "sur devis"
        quantity: 1,
        customizable: true,
        selectedQuantity: data.quantity
      });
      
      // For demo purposes, simulate sending an email
      console.log("Envoi d'un e-mail à contact@crewcallsyndicate.com avec les détails suivants:");
      console.log({
        textile: textile.label,
        quantity: data.quantity,
        placement: data.placement,
        hasLogo: data.hasLogo,
        contactName: data.name,
        contactEmail: data.email,
        contactPhone: data.phone,
        company: data.company,
        message: data.message
      });
      
      toast({
        title: "Demande de devis envoyée",
        description: "Nous vous contacterons rapidement pour établir un devis personnalisé.",
      });
    }
    
    // Reset the form
    form.reset();
  };
  
  const watchTextileType = form.watch("textileType");
  
  // Update selected textile when form value changes
  useEffect(() => {
    const textile = textileOptions.find(t => t.value === watchTextileType);
    if (textile) {
      setSelectedTextile(textile);
    }
  }, [watchTextileType]);
  
  return (
    <div className="min-h-screen flex flex-col bg-cinema-black">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="cinema-container">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center">
            Service de <span className="text-cinema-red">Marquage Textile</span>
          </h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Textile Preview */}
            <div className="bg-cinema-darkgray p-6 rounded-lg border border-cinema-red/20">
              <h2 className="text-xl font-bold text-white mb-6">Aperçu du Textile</h2>
              
              <div className="flex flex-col items-center">
                <div className="w-full max-w-md h-80 bg-cinema-black rounded-md overflow-hidden flex items-center justify-center mb-6">
                  <img 
                    src={selectedTextile.image} 
                    alt={selectedTextile.label} 
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
                
                <div className="w-full max-w-md bg-cinema-black/50 rounded-md p-4 text-center">
                  <h3 className="text-white font-bold text-lg">{selectedTextile.label}</h3>
                  <p className="text-cinema-red text-xs">*Le prix final sera établi sur devis</p>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-white font-medium mb-3">Comment ça marche?</h3>
                <ol className="text-gray-400 text-sm space-y-2 list-decimal pl-5">
                  <li><span className="text-cinema-red font-medium">1️⃣ Configuration en ligne</span> - Sélectionnez le textile de votre choix et définissez les marquages souhaités directement sur notre plateforme.</li>
                  <li><span className="text-cinema-red font-medium">2️⃣ Validation téléphonique</span> - Un conseiller vous contactera après votre commande pour valider les aspects techniques et s'assurer de la faisabilité de votre projet.</li>
                  <li><span className="text-cinema-red font-medium">3️⃣ Envoi de vos textiles</span> - Expédiez vos textiles vierges à Realisaprint.com, où nous réceptionnons votre marchandise avant de procéder à la personnalisation demandée.</li>
                  <li><span className="text-cinema-red font-medium">4️⃣ Impression & Livraison</span> - Une fois le marquage réalisé, nous expédions vos textiles personnalisés, soit directement chez vous, soit à votre client en marque blanche.</li>
                </ol>
              </div>
            </div>
            
            {/* Order Form */}
            <div className="bg-cinema-darkgray p-6 rounded-lg border border-cinema-red/20">
              <h2 className="text-xl font-bold text-white mb-6">Personnaliser votre commande</h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="textileType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Type de textile</FormLabel>
                          <Select 
                            onValueChange={(value) => {
                              field.onChange(value);
                              const textile = textileOptions.find(t => t.value === value);
                              if (textile) setSelectedTextile(textile);
                            }}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="bg-cinema-black border-gray-700 text-white">
                                <SelectValue placeholder="Sélectionnez un textile" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-cinema-black border-gray-700 text-white">
                              {textileOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-cinema-red" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Quantité</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              min="1"
                              className="bg-cinema-black border-gray-700 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-cinema-red" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="placement"
                      render={({ field }) => (
                        <FormItem className="space-y-3">
                          <FormLabel className="text-white">Emplacement du marquage</FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              className="flex flex-col space-y-1"
                            >
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="front" id="front" className="text-cinema-red" />
                                <Label htmlFor="front" className="text-white">Devant</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="back" id="back" className="text-cinema-red" />
                                <Label htmlFor="back" className="text-white">Dos</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <RadioGroupItem value="both" id="both" className="text-cinema-red" />
                                <Label htmlFor="both" className="text-white">Les deux</Label>
                              </div>
                            </RadioGroup>
                          </FormControl>
                          <FormMessage className="text-cinema-red" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="hasLogo"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-700 p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="text-cinema-red"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel className="text-white">
                              J'ai déjà un logo/design
                            </FormLabel>
                            <p className="text-gray-400 text-xs">
                              Si vous avez déjà un logo ou design, cochez cette case. Notre équipe vous contactera pour récupérer vos fichiers.
                            </p>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="pt-4 border-t border-gray-700">
                    <h3 className="text-white font-medium mb-4">Vos informations</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Nom complet</FormLabel>
                            <FormControl>
                              <Input className="bg-cinema-black border-gray-700 text-white" {...field} />
                            </FormControl>
                            <FormMessage className="text-cinema-red" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Email</FormLabel>
                            <FormControl>
                              <Input className="bg-cinema-black border-gray-700 text-white" {...field} />
                            </FormControl>
                            <FormMessage className="text-cinema-red" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Téléphone</FormLabel>
                            <FormControl>
                              <Input className="bg-cinema-black border-gray-700 text-white" {...field} />
                            </FormControl>
                            <FormMessage className="text-cinema-red" />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Société (optionnel)</FormLabel>
                            <FormControl>
                              <Input className="bg-cinema-black border-gray-700 text-white" {...field} />
                            </FormControl>
                            <FormMessage className="text-cinema-red" />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem className="mt-4">
                          <FormLabel className="text-white">Message (optionnel)</FormLabel>
                          <FormControl>
                            <Textarea 
                              className="bg-cinema-black border-gray-700 text-white min-h-[100px]" 
                              placeholder="Précisez ici toute information complémentaire concernant votre commande"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-cinema-red" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex space-x-4">
                    <Button 
                      type="submit"
                      className="button-cinema flex-1 flex items-center justify-center"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Demander un devis
                    </Button>
                    
                    <Button 
                      type="button"
                      className="button-cinema-outline flex items-center justify-center"
                      onClick={() => {
                        const data = form.getValues();
                        const textile = textileOptions.find(t => t.value === data.textileType);
                        
                        if (textile) {
                          addToCart({
                            id: `textile-${Date.now()}`,
                            name: `Marquage ${textile.label} (x${data.quantity})`,
                            imageUrl: textile.image,
                            price: 0, // Price is "sur devis"
                            quantity: 1,
                            customizable: true,
                            selectedQuantity: data.quantity
                          });
                          
                          toast({
                            title: "Ajouté au panier",
                            description: `${textile.label} ajouté à votre panier. N'oubliez pas de finaliser votre demande.`,
                          });
                        }
                      }}
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MarquageTextile;
