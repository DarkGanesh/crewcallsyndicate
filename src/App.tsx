
import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
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
import Maintenance from './pages/Maintenance';
import MaintenanceGuard from './components/MaintenanceGuard';
import NotebookDetail from './pages/NotebookDetail';

function App() {
  return (
    <CartProvider>
      <RouterProvider 
        router={
          createBrowserRouter([
            {
              path: "/",
              element: <Navigate to="/maintenance" />,
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
  );
}

export default App;
