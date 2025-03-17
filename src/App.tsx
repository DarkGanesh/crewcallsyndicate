
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import Index from "./pages/Index";
import Personnalisation from "./pages/Personnalisation";
import Collections from "./pages/Collections";
import Contact from "./pages/Contact";
import APropos from "./pages/APropos";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import MentionsLegales from "./pages/MentionsLegales";
import Maintenance from "./pages/Maintenance";
import MaintenanceGuard from "./components/MaintenanceGuard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Redirect from root to maintenance page */}
            <Route path="/" element={<Navigate to="/maintenance" replace />} />
            <Route path="/maintenance" element={<Maintenance />} />
            <Route 
              path="/accueil" 
              element={
                <MaintenanceGuard>
                  <Index />
                </MaintenanceGuard>
              } 
            />
            <Route 
              path="/personnalisation" 
              element={
                <MaintenanceGuard>
                  <Personnalisation />
                </MaintenanceGuard>
              } 
            />
            <Route 
              path="/collections" 
              element={
                <MaintenanceGuard>
                  <Collections />
                </MaintenanceGuard>
              } 
            />
            <Route 
              path="/contact" 
              element={
                <MaintenanceGuard>
                  <Contact />
                </MaintenanceGuard>
              } 
            />
            <Route 
              path="/a-propos" 
              element={
                <MaintenanceGuard>
                  <APropos />
                </MaintenanceGuard>
              } 
            />
            <Route 
              path="/panier" 
              element={
                <MaintenanceGuard>
                  <Cart />
                </MaintenanceGuard>
              } 
            />
            <Route 
              path="/mentions-legales" 
              element={
                <MaintenanceGuard>
                  <MentionsLegales />
                </MaintenanceGuard>
              } 
            />
            <Route 
              path="*" 
              element={
                <MaintenanceGuard>
                  <NotFound />
                </MaintenanceGuard>
              } 
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
