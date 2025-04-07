
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

interface LoginFormProps {
  onGuestLogin: () => void;
  toggleMode: () => void;
  isSignUp: boolean;
}

const LoginForm = ({ onGuestLogin, toggleMode, isSignUp }: LoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (isSignUp) {
        await register(email, password, name, company);
      } else {
        await login(email, password);
      }
    } catch (error: any) {
      console.error(isSignUp ? "Register error:" : "Login error:", error);
      setError(
        error.message || 
        (isSignUp 
          ? "Erreur lors de l'inscription. Veuillez réessayer." 
          : "Email ou mot de passe incorrect.")
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {isSignUp && (
          <>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">Nom</Label>
              <Input
                id="name"
                type="text"
                placeholder="Votre nom"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-cinema-black border-gray-700 text-white"
                required={isSignUp}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company" className="text-white">Société</Label>
              <Input
                id="company"
                type="text"
                placeholder="Votre société"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="bg-cinema-black border-gray-700 text-white"
              />
            </div>
          </>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-white">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-cinema-black border-gray-700 text-white"
            required
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="password" className="text-white">Mot de passe</Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-cinema-black border-gray-700 text-white"
            required
          />
        </div>
        
        {error && (
          <div className="text-red-500 text-sm p-2 bg-red-900/20 rounded border border-red-500/20">
            {error}
          </div>
        )}
        
        <Button
          type="submit"
          className="w-full bg-cinema-red hover:bg-red-800 text-white"
          disabled={isLoading}
        >
          {isLoading 
            ? (isSignUp ? "Inscription..." : "Connexion...") 
            : (isSignUp ? "S'inscrire" : "Se connecter")}
        </Button>
      </form>
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-cinema-darkgray px-2 text-gray-400">Ou</span>
        </div>
      </div>
      
      <Button
        type="button"
        variant="outline"
        className="w-full border-gray-700 text-white hover:bg-gray-700"
        onClick={onGuestLogin}
      >
        Continuer en tant qu'invité
      </Button>
      
      <div className="text-center text-sm text-gray-400">
        {isSignUp 
          ? "Déjà un compte ?" 
          : "Pas encore de compte ?"} 
        <button 
          onClick={toggleMode} 
          className="text-cinema-red hover:underline ml-1"
          type="button"
        >
          {isSignUp ? "Se connecter" : "S'inscrire"}
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
