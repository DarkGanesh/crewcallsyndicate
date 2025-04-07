
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
  register: (email: string, password: string, name: string) => Promise<void>;
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
  }, []);

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

  const register = async (email: string, password: string, name: string) => {
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

      // Check if client with this email already exists
      const { data: existingClient, error: checkError } = await supabase
        .from("clients")
        .select("*")
        .eq("email", email)
        .maybeSingle();

      if (checkError) {
        throw checkError;
      }

      if (existingClient) {
        toast({
          title: "Inscription échouée",
          description: "Un compte avec cet email existe déjà.",
          variant: "destructive",
        });
        return;
      }

      // Create new client
      const { data, error } = await supabase
        .from("clients")
        .insert([{ name, email }])
        .select()
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setCurrentClient(data);
        setIsAuthenticated(true);
        setIsGuest(false);
        
        localStorage.setItem("authSession", JSON.stringify({
          clientId: data.id,
          isGuest: false
        }));

        toast({
          title: "Inscription réussie",
          description: `Bienvenue, ${data.name}!`,
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

      // Find client by email
      const { data, error } = await supabase
        .from("clients")
        .select("*")
        .eq("email", email)
        .maybeSingle();

      if (error) {
        throw error;
      }

      if (!data) {
        toast({
          title: "Connexion échouée",
          description: "Email ou mot de passe incorrect.",
          variant: "destructive",
        });
        return;
      }

      // In a real app, you would verify the password here
      // This is a simplified example without proper password hashing
      
      // Store session
      setCurrentClient(data);
      setIsAuthenticated(true);
      setIsGuest(false);
      
      localStorage.setItem("authSession", JSON.stringify({
        clientId: data.id,
        isGuest: false
      }));

      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${data.name}!`,
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

  const logout = () => {
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
