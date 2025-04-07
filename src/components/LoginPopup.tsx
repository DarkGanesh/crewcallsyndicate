
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

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPopup = ({ isOpen, onClose }: LoginPopupProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login, loginAsGuest } = useAuth();

  const handleStandardLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      onClose();
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = () => {
    loginAsGuest();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md bg-cinema-darkgray border-cinema-red/20 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Connexion</DialogTitle>
          <DialogDescription className="text-gray-400">
            Connectez-vous pour accéder à votre compte ou continuez en tant qu'invité.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-6">
          <form onSubmit={handleStandardLogin} className="space-y-4">
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
              />
            </div>
            
            <Button
              type="submit"
              className="w-full bg-cinema-red hover:bg-red-800 text-white"
              disabled={isLoading}
            >
              {isLoading ? "Connexion..." : "Se connecter"}
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
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopup;
