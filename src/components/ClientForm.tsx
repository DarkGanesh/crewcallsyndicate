import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Client } from "@/types/database";

interface ClientFormProps {
  client: Client | null;
  onSave: (client: Partial<Client>) => void;
  onCancel: () => void;
}

const ClientForm = ({ client, onSave, onCancel }: ClientFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: ""
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const isEditing = !!client;

  useEffect(() => {
    if (client) {
      setFormData({
        name: client.name || "",
        email: client.email || "",
        phone: client.phone || "",
        company: client.company || "",
        address: client.address || ""
      });
    }
  }, [client]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Le nom est requis";
    }
    
    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "L'adresse email n'est pas valide";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const clientData = {
        name: formData.name.trim(),
        email: formData.email.trim() || null,
        phone: formData.phone.trim() || null,
        company: formData.company.trim() || null,
        address: formData.address.trim() || null
      };
      
      if (isEditing && client) {
        // Update existing client
        const { data, error } = await supabase
          .from('clients')
          .update(clientData)
          .eq('id', client.id)
          .select();
        
        if (error) throw error;
        
        toast({
          title: "Client mis à jour",
          description: "Les informations du client ont été mises à jour avec succès.",
        });
        
        onSave(data?.[0] || clientData);
      } else {
        // Create new client
        const { data, error } = await supabase
          .from('clients')
          .insert(clientData)
          .select();
        
        if (error) throw error;
        
        toast({
          title: "Client ajouté",
          description: "Le client a été ajouté avec succès.",
        });
        
        onSave(data?.[0] || clientData);
      }
    } catch (error: any) {
      console.error('Error saving client:', error);
      
      if (error.code === '23505') {
        setErrors({ email: "Cette adresse email est déjà utilisée par un autre client." });
      } else {
        toast({
          title: "Erreur",
          description: "Une erreur est survenue lors de l'enregistrement du client.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="bg-cinema-darkgray border border-cinema-red/20 rounded-lg max-w-xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-gray-700 p-4">
          <h2 className="text-xl font-semibold text-white">
            {isEditing ? "Modifier le client" : "Ajouter un client"}
          </h2>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onCancel}
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-white">
              Nom <span className="text-cinema-red">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Nom du client"
              className="bg-cinema-black border-gray-700 text-white"
              required
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email du client"
              className="bg-cinema-black border-gray-700 text-white"
            />
            {errors.email && (
              <p className="text-sm text-red-500 mt-1">{errors.email}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">
              Téléphone
            </Label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Numéro de téléphone"
              className="bg-cinema-black border-gray-700 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="company" className="text-white">
              Société / Production
            </Label>
            <Input
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Nom de la société ou production"
              className="bg-cinema-black border-gray-700 text-white"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="address" className="text-white">
              Adresse
            </Label>
            <Textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Adresse complète"
              className="bg-cinema-black border-gray-700 text-white resize-none"
              rows={3}
            />
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-700">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="border-gray-700 text-white hover:bg-gray-700"
              disabled={loading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-cinema-red hover:bg-red-800 text-white"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="animate-pulse">...</span>
                  {isEditing ? "Mise à jour" : "Enregistrer"}
                </>
              ) : (
                isEditing ? "Mettre à jour" : "Enregistrer"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ClientForm;
