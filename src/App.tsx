
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
                element: <Index />,
                errorElement: <NotFound />
              },
              {
                path: "/accueil",
                element: <Index />,
              },
              {
                path: "/about",
                element: <APropos />
              },
              {
                path: "/collections",
                element: <Collections />
              },
              {
                path: "/mentions-legales",
                element: <MentionsLegales />
              },
              {
                path: "/personnalisation",
                element: <Personnalisation />
              },
              {
                path: "/404",
                element: <NotFound />
              },
              {
                path: "/produit/:id",
                element: <NotebookDetail />
              },
              {
                path: "*",
                element: <NotFound />
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
