
import React, { useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPopup = ({ isOpen, onClose }: LoginPopupProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const { login, register, loginAsGuest, logout, isAuthenticated, currentClient, isGuest } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isSignUp) {
        await register(email, password, name, company);
      } else {
        await login(email, password);
      }
      onClose();
    } catch (error) {
      console.error(isSignUp ? "Register error:" : "Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    onClose();
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    // Reset form fields when switching modes
    setEmail("");
    setPassword("");
    setName("");
  };

  const handleLogout = () => {
    logout();
    onClose();
  };

  // Show different content based on authentication state
  if (isAuthenticated) {
    return (
      <AlertDialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <AlertDialogContent className="bg-cinema-darkgray border-cinema-red/20 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-white">
              {isGuest ? "Compte Invité" : "Votre Compte"}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              {isGuest 
                ? "Vous êtes actuellement connecté en tant qu'invité."
                : `Bonjour, ${currentClient?.name || 'Utilisateur'}`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          
          {!isGuest && currentClient && (
            <div className="my-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Email:</span>
                <span className="text-white">{currentClient.email}</span>
              </div>
              {currentClient.company && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Société:</span>
                  <span className="text-white">{currentClient.company}</span>
                </div>
              )}
            </div>
          )}
          
          <AlertDialogFooter className="mt-6">
            <Button
              onClick={handleLogout}
              className="w-full bg-cinema-red hover:bg-red-800 text-white"
            >
              Déconnexion
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-cinema-darkgray border-cinema-red/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">
            {isSignUp ? "Inscription" : "Connexion"}
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            {isSignUp 
              ? "Créez un compte pour accéder à toutes les fonctionnalités ou continuez en tant qu'invité."
              : "Connectez-vous pour accéder à votre compte ou continuez en tant qu'invité."}
          </DialogDescription>
        </DialogHeader>
        
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
            onClick={handleGuestLogin}
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
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopup;
