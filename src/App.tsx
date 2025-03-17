
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
import Maintenance from './pages/Maintenance';
import MaintenanceGuard from './components/MaintenanceGuard';

function App() {
  return (
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
              element: <MaintenanceGuard><Index /></MaintenanceGuard>
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
