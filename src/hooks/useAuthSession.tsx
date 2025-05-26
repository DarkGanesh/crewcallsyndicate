
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Client } from "@/types/database";

export interface AuthSessionState {
  isAuthenticated: boolean;
  isGuest: boolean;
  currentClient: Client | null;
}

export function useAuthSession() {
  const [sessionState, setSessionState] = useState<AuthSessionState>({
    isAuthenticated: false,
    isGuest: false,
    currentClient: null
  });

  // Check for existing session in localStorage
  useEffect(() => {
    const storedSession = localStorage.getItem("authSession");
    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);
        if (session.isGuest) {
          setSessionState(prevState => ({
            ...prevState,
            isGuest: true,
            isAuthenticated: true
          }));
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
          setSessionState({
            currentClient: data as Client,
            isAuthenticated: true,
            isGuest: false
          });
          
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
        setSessionState(prevState => ({
          ...prevState,
          currentClient: data as Client,
          isAuthenticated: true
        }));
      }
    } catch (error) {
      console.error("Error fetching client:", error);
      localStorage.removeItem("authSession");
    }
  };

  return {
    ...sessionState,
    setSessionState
  };
}
