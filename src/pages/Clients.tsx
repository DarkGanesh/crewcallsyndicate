
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ClientForm from "@/components/ClientForm";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell
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
import type { Database } from "@/integrations/supabase/types";

type Client = Database['public']['Tables']['clients']['Row'];

const Clients = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingClient, setEditingClient] = useState<Client | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('name');
      
      if (error) {
        throw error;
      }
      
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
      toast({
        title: "Erreur",
        description: "Impossible de récupérer la liste des clients.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddClient = () => {
    setEditingClient(null);
    setShowForm(true);
  };

  const handleEditClient = (client: Client) => {
    setEditingClient(client);
    setShowForm(true);
  };

  const handleDeleteClient = async (id: string) => {
    try {
      const { error } = await supabase
        .from('clients')
        .delete()
        .eq('id', id);
      
      if (error) {
        throw error;
      }
      
      setClients(clients.filter(client => client.id !== id));
      toast({
        title: "Client supprimé",
        description: "Le client a été supprimé avec succès.",
      });
    } catch (error) {
      console.error('Error deleting client:', error);
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le client.",
        variant: "destructive",
      });
    }
  };

  const handleSaveClient = (client: Partial<Client>) => {
    setShowForm(false);
    fetchClients();
  };

  return (
    <div className="min-h-screen flex flex-col bg-cinema-black">
      <Navbar />
      <main className="flex-grow py-12">
        <div className="cinema-container">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Gestion des <span className="text-cinema-red">Clients</span>
              </h1>
              <Button 
                onClick={handleAddClient}
                className="button-cinema"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter un client
              </Button>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 text-cinema-red animate-spin" />
              </div>
            ) : (
              <>
                {clients.length === 0 ? (
                  <div className="text-center py-12 bg-cinema-darkgray rounded-lg">
                    <p className="text-white mb-4">Aucun client enregistré pour le moment.</p>
                    <Button 
                      onClick={handleAddClient}
                      className="button-cinema"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Ajouter votre premier client
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto bg-cinema-darkgray rounded-lg">
                    <Table className="w-full">
                      <TableHeader>
                        <TableRow className="border-b border-gray-700">
                          <TableHead className="text-white">Nom</TableHead>
                          <TableHead className="text-white">Email</TableHead>
                          <TableHead className="text-white">Téléphone</TableHead>
                          <TableHead className="text-white">Société</TableHead>
                          <TableHead className="text-white text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {clients.map((client) => (
                          <TableRow 
                            key={client.id}
                            className="border-b border-gray-700"
                          >
                            <TableCell className="text-white font-medium">{client.name}</TableCell>
                            <TableCell className="text-gray-300">{client.email || '—'}</TableCell>
                            <TableCell className="text-gray-300">{client.phone || '—'}</TableCell>
                            <TableCell className="text-gray-300">{client.company || '—'}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end space-x-2">
                                <Button
                                  onClick={() => handleEditClient(client)}
                                  variant="ghost"
                                  size="sm"
                                  className="text-gray-300 hover:text-white hover:bg-gray-700"
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <AlertDialog>
                                  <AlertDialogTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-gray-300 hover:text-white hover:bg-gray-700"
                                    >
                                      <Trash2 className="h-4 w-4" />
                                    </Button>
                                  </AlertDialogTrigger>
                                  <AlertDialogContent className="bg-cinema-darkgray border border-gray-700">
                                    <AlertDialogHeader>
                                      <AlertDialogTitle className="text-white">Supprimer le client</AlertDialogTitle>
                                      <AlertDialogDescription className="text-gray-300">
                                        Êtes-vous sûr de vouloir supprimer {client.name} ? Cette action est irréversible.
                                      </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                      <AlertDialogCancel className="border-gray-700 text-white hover:bg-gray-700">Annuler</AlertDialogCancel>
                                      <AlertDialogAction 
                                        onClick={() => handleDeleteClient(client.id)}
                                        className="bg-cinema-red hover:bg-red-800 text-white"
                                      >
                                        Supprimer
                                      </AlertDialogAction>
                                    </AlertDialogFooter>
                                  </AlertDialogContent>
                                </AlertDialog>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </>
            )}
            
            {showForm && (
              <ClientForm 
                client={editingClient}
                onSave={handleSaveClient}
                onCancel={() => setShowForm(false)}
              />
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Clients;
