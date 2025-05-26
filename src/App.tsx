
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './pages/Index';
import APropos from './pages/APropos';
import Collections from './pages/Collections';
import MentionsLegales from './pages/MentionsLegales';
import Personnalisation from './pages/Personnalisation';
import NotFound from './pages/NotFound';
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Maintenance from './pages/Maintenance';
import MaintenanceGuard from './components/MaintenanceGuard';
import NotebookDetail from './pages/NotebookDetail';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider 
          router={
            createBrowserRouter([
              {
                path: "/",
                element: <MaintenanceGuard><Index /></MaintenanceGuard>,
                errorElement: <NotFound />
              },
              {
                path: "/accueil",
                element: <MaintenanceGuard><Index /></MaintenanceGuard>,
              },
              {
                path: "/about",
                element: <MaintenanceGuard><APropos /></MaintenanceGuard>
              },
              {
                path: "/collections",
                element: <MaintenanceGuard><Collections /></MaintenanceGuard>
              },
              {
                path: "/mentions-legales",
                element: <MaintenanceGuard><MentionsLegales /></MaintenanceGuard>
              },
              {
                path: "/personnalisation",
                element: <MaintenanceGuard><Personnalisation /></MaintenanceGuard>
              },
              {
                path: "/404",
                element: <MaintenanceGuard><NotFound /></MaintenanceGuard>
              },
              {
                path: "/produit/:id",
                element: <MaintenanceGuard><NotebookDetail /></MaintenanceGuard>
              },
              {
                path: "/maintenance",
                element: <Maintenance />
              },
              {
                path: "*",
                element: <MaintenanceGuard><NotFound /></MaintenanceGuard>
              }
            ])
          }
        />
        <Toaster />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
