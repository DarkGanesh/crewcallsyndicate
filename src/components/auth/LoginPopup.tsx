
import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AuthenticatedUserView from "./AuthenticatedUserView";
import LoginForm from "./LoginForm";

interface LoginPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginPopup = ({ isOpen, onClose }: LoginPopupProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const { loginAsGuest, isAuthenticated } = useAuth();

  const handleGuestLogin = () => {
    loginAsGuest();
    onClose();
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  // Show different content based on authentication state
  if (isAuthenticated) {
    return <AuthenticatedUserView isOpen={isOpen} onClose={onClose} />;
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
        
        <LoginForm 
          onGuestLogin={handleGuestLogin} 
          toggleMode={toggleMode} 
          isSignUp={isSignUp} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default LoginPopup;
