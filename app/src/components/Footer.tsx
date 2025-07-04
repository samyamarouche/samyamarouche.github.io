import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';

const Footer = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();

  return (
    <footer className="py-8 px-4 border-t border-border bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center">
          <p className="text-muted-foreground">
            © 2024 Portfolio - Étudiant Master 2 IA
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            {theme === 'weather' ? '☁️ Weather Theme' : '🌌 Cosmic Theme'} | 
            {language === 'fr' ? ' Français' : ' English'}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;