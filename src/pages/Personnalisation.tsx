
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";

const formSchema = z.object({
  name: z.string().min(3, { message: "Le nom doit contenir au moins 3 caractères" }),
  email: z.string().email({ message: "Veuillez entrer une adresse email valide" }),
  phone: z.string().min(10, { message: "Veuillez entrer un numéro de téléphone valide" }),
  company: z.string().optional(),
  product: z.string({
    required_error: "Veuillez sélectionner un produit",
  }),
  customProduct: z.string().optional(),
  quantity: z.coerce.number({
    required_error: "Veuillez indiquer une quantité",
    invalid_type_error: "La quantité doit être un nombre",
  }).min(1, { message: "La quantité minimum est de 1" }),
  description: z.string().min(10, { message: "La description doit contenir au moins 10 caractères" }),
  message: z.string().optional(),
}).refine((data) => {
  if (data.product === "other" && (!data.customProduct || data.customProduct.trim().length < 3)) {
    return false;
  }
  return true;
}, {
  message: "Veuillez spécifier le produit souhaité (minimum 3 caractères)",
  path: ["customProduct"],
});

type FormValues = z.infer<typeof formSchema>;

const productOptions = [
  { value: "notepad", label: "Bloc-Note Logo Avant" },
  { value: "tshirt", label: "Tee-Shirt avec Logo" },
  { value: "bottle", label: "Gourde Logo Bas" },
  { value: "cup", label: "Gobelet EcoCup Logo Avant" },
  { value: "vest", label: "Gilet Jaune Avec Logo" },
  { value: "stickers", label: "Stickers Logo" },
  { value: "other", label: "Autre (précisez ci-dessous)" },
];

const Personnalisation = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      product: "",
      customProduct: "",
      quantity: 1,
      description: "",
      message: "",
    },
  });
  
  const selectedProduct = form.watch("product");
  
  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    
    try {
      console.log('Submitting form data:', data);
      
      const { data: response, error } = await supabase.functions.invoke('send-personalization-request', {
        body: data
      });

      console.log('Supabase response:', response, 'Error:', error);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      if (response?.success) {
        toast({
          title: "Demande envoyée",
          description: response.message || "Nous vous contacterons rapidement pour votre demande de personnalisation.",
        });
        
        // Reset the form
        form.reset();
      } else {
        throw new Error(response?.error || "Erreur inconnue");
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
      toast({
        title: "Erreur",
        description: error.message || "Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-cinema-black">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Banner */}
        <div className="bg-cinema-darkgray py-12 border-b border-cinema-red/20">
          <div className="cinema-container">
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              Demande de <span className="text-cinema-red">Personnalisation</span>
            </h1>
            <p className="text-gray-400 mt-4 max-w-2xl">
              Remplissez le formulaire ci-dessous pour nous faire part de vos besoins en personnalisation. Nous vous contacterons rapidement avec un devis personnalisé.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="py-12 bg-cinema-black">
          <div className="cinema-container">
            <div className="max-w-2xl mx-auto bg-cinema-darkgray p-8 rounded-lg border border-cinema-red/20">
              <h2 className="text-2xl font-bold text-white mb-8 text-center">
                Formulaire de Demande
              </h2>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-white font-medium text-lg border-b border-gray-700 pb-2">
                      Vos informations
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Nom complet *</FormLabel>
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
                            <FormLabel className="text-white">Email *</FormLabel>
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
                            <FormLabel className="text-white">Téléphone *</FormLabel>
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
                            <FormLabel className="text-white">Société / Production</FormLabel>
                            <FormControl>
                              <Input className="bg-cinema-black border-gray-700 text-white" {...field} />
                            </FormControl>
                            <FormMessage className="text-cinema-red" />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  {/* Product Information */}
                  <div className="space-y-4">
                    <h3 className="text-white font-medium text-lg border-b border-gray-700 pb-2">
                      Détails du produit
                    </h3>
                    
                    <FormField
                      control={form.control}
                      name="product"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Produit souhaité *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-cinema-black border-gray-700 text-white">
                                <SelectValue placeholder="Sélectionnez un produit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-cinema-black border-gray-700 text-white">
                              {productOptions.map((option) => (
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
                    
                    {selectedProduct === "other" && (
                      <FormField
                        control={form.control}
                        name="customProduct"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-white">Précisez le produit souhaité *</FormLabel>
                            <FormControl>
                              <Input 
                                className="bg-cinema-black border-gray-700 text-white"
                                placeholder="Décrivez le produit que vous souhaitez personnaliser"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-cinema-red" />
                          </FormItem>
                        )}
                      />
                    )}
                    
                    <FormField
                      control={form.control}
                      name="quantity"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Quantité souhaitée *</FormLabel>
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
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Description de la personnalisation *</FormLabel>
                          <FormControl>
                            <Textarea 
                              className="bg-cinema-black border-gray-700 text-white min-h-[120px]" 
                              placeholder="Décrivez précisément ce que vous souhaitez (logo, texte, couleurs, emplacement, etc.)"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-cinema-red" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Additional Message */}
                  <div className="space-y-4">
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Message complémentaire</FormLabel>
                          <FormControl>
                            <Textarea 
                              className="bg-cinema-black border-gray-700 text-white min-h-[100px]" 
                              placeholder="Toute information complémentaire concernant votre projet"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage className="text-cinema-red" />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="pt-4">
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="button-cinema w-full flex items-center justify-center"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      {isSubmitting ? "Envoi en cours..." : "Envoyer la demande"}
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

export default Personnalisation;
