import React, { createContext, useContext, useState, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { useAuthSession } from "@/hooks/useAuthSession";
import { authService } from "@/services/authService";
import type { Client } from "@/types/database";

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
  const { isAuthenticated, isGuest, currentClient, setSessionState } = useAuthSession();
  const { toast } = useToast();

  const login = async (email: string, password: string) => {
    try {
      const clientData = await authService.login(email, password);
      
      if (!clientData) {
        throw new Error("Aucune donnée client reçue");
      }
      
      setSessionState({
        isAuthenticated: true,
        isGuest: false,
        currentClient: clientData
      });
      
      localStorage.setItem("authSession", JSON.stringify({
        clientId: clientData.id,
        isGuest: false
      }));

      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${clientData.name || email.split('@')[0]}!`,
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

  const register = async (email: string, password: string, name: string, company?: string) => {
    try {
      const newClient = await authService.register(email, password, name, company);
      
      if (!newClient) {
        throw new Error("Aucune donnée client reçue");
      }
      
      setSessionState({
        isAuthenticated: true,
        isGuest: false,
        currentClient: newClient
      });
      
      localStorage.setItem("authSession", JSON.stringify({
        clientId: newClient.id,
        isGuest: false
      }));

      toast({
        title: "Inscription réussie",
        description: `Bienvenue, ${newClient.name}!`,
      });
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

  const loginAsGuest = () => {
    setSessionState({
      isAuthenticated: true,
      isGuest: true,
      currentClient: null
    });
    
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
    await authService.logout();
    
    setSessionState({
      isAuthenticated: false,
      isGuest: false,
      currentClient: null
    });
    
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
