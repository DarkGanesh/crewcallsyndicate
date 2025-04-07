
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Client = Database['public']['Tables']['clients']['Row'];

interface AuthContextType {
  isAuthenticated: boolean;
  isGuest: boolean;
  currentClient: Client | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string, company?: string) => Promise<void>;
  loginAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isGuest, setIsGuest] = useState(false);
  const [currentClient, setCurrentClient] = useState<Client | null>(null);
  const { toast } = useToast();

  // Check for existing session in localStorage
  useEffect(() => {
    const storedSession = localStorage.getItem("authSession");
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);
        if (session.isGuest) {
          setIsGuest(true);
          setIsAuthenticated(true);
        } else if (session.clientId) {
          // Fetch client data
          fetchClientData(session.clientId);
        }
      } catch (error) {
        console.error("Error parsing stored session:", error);
        localStorage.removeItem("authSession");
      }
    }
    
    // Also check for active Supabase session
    checkSupabaseSession();
  }, []);

  const checkSupabaseSession = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      
      if (session && session.user) {
        // Try to find client with the matching Supabase auth ID
        const { data, error: clientError } = await supabase
          .from("clients")
          .select("*")
          .eq("id", session.user.id)
          .single();
          
        if (clientError) {
          console.error("Error fetching client after auth session check:", clientError);
          return;
        }
        
        if (data) {
          setCurrentClient(data);
          setIsAuthenticated(true);
          setIsGuest(false);
          
          localStorage.setItem("authSession", JSON.stringify({
            clientId: data.id,
            isGuest: false
          }));
        }
      }
    } catch (error) {
      console.error("Error checking Supabase session:", error);
    }
  };

  const fetchClientData = async (clientId: string) => {
    try {
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("id", clientId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setCurrentClient(data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error("Error fetching client:", error);
      localStorage.removeItem("authSession");
    }
  };

  const register = async (email: string, password: string, name: string, company?: string) => {
    try {
      // Simple email validation
      if (!email.includes("@")) {
        toast({
          title: "Format d'email invalide",
          description: "Veuillez entrer un email valide.",
          variant: "destructive",
        });
        return;
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

      // Récupérer le jeton d'accès de la session
      const session = authData.session;
      
      // Important: Définir l'en-tête d'autorisation avec le jeton JWT
      // pour contourner RLS lors de l'insertion initiale
      const { data: clientData, error: clientError } = await supabase
        .from("clients")
        .insert([{ 
          id: authData.user.id,
          name, 
          email,
          company 
        }])
        .select()
        .single();

      if (clientError) {
        console.error("Error inserting client:", clientError);
        throw new Error(clientError.message || "Erreur lors de l'ajout du client");
      }

      if (clientData) {
        setCurrentClient(clientData);
        setIsAuthenticated(true);
        setIsGuest(false);
        
        localStorage.setItem("authSession", JSON.stringify({
          clientId: clientData.id,
          isGuest: false
        }));

        toast({
          title: "Inscription réussie",
          description: `Bienvenue, ${clientData.name}!`,
        });
      }
    } catch (error: any) {
      console.error("Register error:", error);
      toast({
        title: "Erreur d'inscription",
        description: error.message || "Une erreur est survenue lors de l'inscription.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      // Simple email validation
      if (!email.includes("@")) {
        toast({
          title: "Format d'email invalide",
          description: "Veuillez entrer un email valide.",
          variant: "destructive",
        });
        return;
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
          
          setCurrentClient(newClient);
        } else {
          throw clientError;
        }
      } else {
        setCurrentClient(clientData);
      }
      
      setIsAuthenticated(true);
      setIsGuest(false);
      
      localStorage.setItem("authSession", JSON.stringify({
        clientId: authData.user.id,
        isGuest: false
      }));

      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${clientData?.name || email.split('@')[0]}!`,
      });
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Erreur de connexion",
        description: error.message || "Une erreur est survenue lors de la connexion.",
        variant: "destructive",
      });
      throw error;
    }
  };

  const loginAsGuest = () => {
    setIsGuest(true);
    setIsAuthenticated(true);
    setCurrentClient(null);
    localStorage.setItem("authSession", JSON.stringify({
      isGuest: true
    }));
    toast({
      title: "Connexion invité",
      description: "Vous êtes connecté en tant qu'invité.",
    });
  };

  const logout = async () => {
    // Sign out from Supabase Auth
    await supabase.auth.signOut();
    
    setIsAuthenticated(false);
    setIsGuest(false);
    setCurrentClient(null);
    localStorage.removeItem("authSession");
    
    toast({
      title: "Déconnexion",
      description: "Vous êtes déconnecté.",
    });
  };

  const value = {
    isAuthenticated,
    isGuest,
    currentClient,
    login,
    register,
    loginAsGuest,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
