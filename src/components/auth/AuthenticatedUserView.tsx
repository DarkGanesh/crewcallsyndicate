
import React from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface AuthenticatedUserViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthenticatedUserView = ({ isOpen, onClose }: AuthenticatedUserViewProps) => {
  const { logout, currentClient, isGuest } = useAuth();

  const handleLogout = () => {
    logout();
    onClose();
  };

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
};

export default AuthenticatedUserView;
