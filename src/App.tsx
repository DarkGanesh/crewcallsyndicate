
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Index from './pages/Index';
import APropos from './pages/APropos';
import Collections from './pages/Collections';
import MentionsLegales from './pages/MentionsLegales';
import Personnalisation from './pages/Personnalisation';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import Contact from './pages/Contact';
import { Toaster } from "@/components/ui/toaster"
import MarquageTextile from './pages/MarquageTextile';
import { CartProvider } from '@/context/CartContext';
import { AuthProvider } from '@/context/AuthContext';
import Maintenance from './pages/Maintenance';
import MaintenanceGuard from './components/MaintenanceGuard';
import NotebookDetail from './pages/NotebookDetail';
import Clients from './pages/Clients';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider 
          router={
            createBrowserRouter([
              {
                path: "/",
                element: <Index />,
                errorElement: <NotFound />
              },
              {
                path: "/accueil",
                element: <Index />,
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
                path: "/cart",
                element: <MaintenanceGuard><Cart /></MaintenanceGuard>
              },
              {
                path: "/contact",
                element: <MaintenanceGuard><Contact /></MaintenanceGuard>
              },
              {
                path: "/marquage-textile",
                element: <MaintenanceGuard><MarquageTextile /></MaintenanceGuard>
              },
              {
                path: "/produit/:id",
                element: <MaintenanceGuard><NotebookDetail /></MaintenanceGuard>
              },
              {
                path: "/clients",
                element: <Clients />
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
