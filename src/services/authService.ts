
import { supabase } from "@/integrations/supabase/client";
import type { Client } from "@/types/database";

export const authService = {
  async login(email: string, password: string): Promise<Client> {
    // Simple email validation
    if (!email.includes("@")) {
      throw new Error("Format d'email invalide");
    }

    // Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      throw authError;
    }

    if (!authData.user) {
      throw new Error("La connexion a échoué");
    }

    // Fetch client data by auth ID
    const { data: clientData, error: clientError } = await supabase
      .from("clients")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (clientError) {
      // If no client exists for this user, create one
      if (clientError.code === 'PGRST116') {
        const { data: newClient, error: createError } = await supabase
          .from("clients")
          .insert([{ 
            id: authData.user.id,
            name: email.split('@')[0], // Temporary name from email
            email 
          }])
          .select()
          .single();

        if (createError) {
          throw createError;
        }
        
        return newClient as Client;
      } else {
        throw clientError;
      }
    }
    
    return clientData as Client;
  },

  async register(email: string, password: string, name: string, company?: string): Promise<Client> {
    // Simple email validation
    if (!email.includes("@")) {
      throw new Error("Format d'email invalide");
    }

    // First, create the auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      throw authError;
    }

    if (!authData.user) {
      throw new Error("La création de l'utilisateur a échoué");
    }

    // IMPORTANT: Use the create_new_client RPC function to bypass RLS
    const { data: clientData, error: clientError } = await supabase.rpc('create_new_client', {
      user_id: authData.user.id,
      user_name: name,
      user_email: email,
      user_company: company || null
    });

    if (clientError) {
      console.error("Error inserting client:", clientError);
      throw new Error(clientError.message || "Erreur lors de l'ajout du client");
    }

    // Fetch the created client
    const { data: newClient, error: fetchError } = await supabase
      .from("clients")
      .select("*")
      .eq("id", authData.user.id)
      .single();

    if (fetchError) {
      console.error("Error fetching new client:", fetchError);
      throw fetchError;
    }
    
    return newClient as Client;
  },

  async logout() {
    return await supabase.auth.signOut();
  }
};
