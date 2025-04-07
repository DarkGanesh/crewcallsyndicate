
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";
import ClientForm from "@/components/ClientForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Database } from "@/integrations/supabase/types";

type Client = Database['public']['Tables']['clients']['Row'];

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, isGuest, currentClient } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/accueil");
      toast({
        title: "Accès refusé",
        description: "Vous devez être connecté pour accéder à cette page.",
        variant: "destructive",
      });
    } else if (isGuest) {
      // Pour les invités, montrer un message et limiter les fonctionnalités
      fetchClients();
    } else {
      // Pour les utilisateurs authentifiés, charger uniquement leurs propres clients
      // (RLS s'en chargera automatiquement)
      fetchClients();
    }
  }, [isAuthenticated, isGuest, navigate]);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .order("name");
      
      if (error) throw error;
      
      setClients(data || []);
    } catch (error: any) {
      console.error("Error fetching clients:", error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer la liste des clients.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  // Grâce à la RLS, l'utilisateur ne pourra voir et modifier
  // que ses propres clients, donc ces fonctions restent les mêmes
  const handleAddClient = () => {
    setSelectedClient(null);
    setShowForm(true);
  };
  
  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    setShowForm(true);
  };
  
  const handleDeleteClient = async () => {
    if (!clientToDelete) return;
    
    try {
      const { error } = await supabase
        .from("clients")
        .delete()
        .eq("id", clientToDelete.id);
      
      if (error) throw error;
      
      setClients(clients.filter(c => c.id !== clientToDelete.id));
      setClientToDelete(null);
      
      toast({
        title: "Client supprimé",
        description: "Le client a été supprimé avec succès.",
      });
    } catch (error: any) {
      console.error("Error deleting client:", error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le client.",
        variant: "destructive",
      });
    }
  };
  
  const handleSaveClient = (client: Partial<Client>) => {
    if (selectedClient) {
      setClients(clients.map(c => c.id === selectedClient.id ? { ...c, ...client } as Client : c));
    } else if ('id' in client) {
      setClients([...clients, client as Client]);
    }
    
    setShowForm(false);
  };

  const renderGuestMessage = () => {
    if (isGuest) {
      return (
        <div className="bg-yellow-900 border border-yellow-600 text-yellow-200 p-4 mb-6 rounded-md">
          <p className="font-medium">Vous êtes connecté en tant qu'invité</p>
          <p className="text-sm">Les modifications ne seront pas enregistrées de façon permanente.</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-cinema-black text-white">
      <Navbar />
      <main className="flex-grow cinema-container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Gestion des Clients</h1>
          <Button 
            onClick={handleAddClient}
            className="bg-cinema-red hover:bg-red-800"
          >
            Ajouter un client
          </Button>
        </div>
        
        {renderGuestMessage()}
        
        {loading ? (
          <div className="flex justify-center my-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cinema-red"></div>
          </div>
        ) : (
          <div className="bg-cinema-darkgray border border-gray-800 rounded-lg overflow-hidden">
            {clients.length === 0 ? (
              <div className="p-8 text-center">
                <p className="text-gray-400">Aucun client trouvé.</p>
                <Button 
                  onClick={handleAddClient}
                  variant="outline" 
                  className="mt-4 border-gray-700 text-white hover:bg-gray-700"
                >
                  Ajouter votre premier client
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-800 hover:bg-cinema-darkgray/80">
                      <TableHead className="text-white">Nom</TableHead>
                      <TableHead className="text-white">Email</TableHead>
                      <TableHead className="text-white">Téléphone</TableHead>
                      <TableHead className="text-white">Société</TableHead>
                      <TableHead className="text-white">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id} className="border-gray-800 hover:bg-cinema-darkgray/80">
                        <TableCell className="font-medium">{client.name}</TableCell>
                        <TableCell>{client.email || "-"}</TableCell>
                        <TableCell>{client.phone || "-"}</TableCell>
                        <TableCell>{client.company || "-"}</TableCell>
                        <TableCell className="flex gap-2">
                          <Button 
                            onClick={() => handleEditClient(client)}
                            variant="outline" 
                            size="sm"
                            className="border-gray-700 text-white hover:bg-gray-700"
                          >
                            Modifier
                          </Button>
                          
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-red-900 text-red-500 hover:bg-red-900/20"
                                onClick={() => setClientToDelete(client)}
                              >
                                Supprimer
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-cinema-darkgray border-cinema-red/20 text-white">
                              <AlertDialogHeader>
                                <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
                                <AlertDialogDescription className="text-gray-400">
                                  Êtes-vous sûr de vouloir supprimer {client.name} ? Cette action est irréversible.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-gray-700 text-white hover:bg-gray-700">
                                  Annuler
                                </AlertDialogCancel>
                                <AlertDialogAction 
                                  className="bg-cinema-red hover:bg-red-800 text-white"
                                  onClick={handleDeleteClient}
                                >
                                  Supprimer
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
        )}
        
        {showForm && (
          <ClientForm 
            client={selectedClient} 
            onSave={handleSaveClient} 
            onCancel={() => setShowForm(false)} 
          />
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Clients;
