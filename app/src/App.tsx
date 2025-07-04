import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider, useTheme } from "@/contexts/ThemeContext";
import Navigation from "@/components/Navigation";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DevPage from "./pages/Dev";
import ArtPage from "./pages/Art";
import MusicPage from "./pages/Music";
import ContactPage from "./pages/Contact";
import Starfield from "@/components/Starfield";

const queryClient = new QueryClient();

const AppContent = () => {
  const { theme } = useTheme();
  return (
    <>
      {theme === 'cosmic' && <Starfield />}
      <Navigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/dev" element={<DevPage />} />
        <Route path="/art" element={<ArtPage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <ThemeProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </ThemeProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
