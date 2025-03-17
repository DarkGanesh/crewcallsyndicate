
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

function App() {
  return (
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
              path: "/cart",
              element: <Cart />
            },
            {
              path: "/contact",
              element: <Contact />
            },
            {
              path: "/marquage-textile",
              element: <MarquageTextile />
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
  );
}

export default App;
