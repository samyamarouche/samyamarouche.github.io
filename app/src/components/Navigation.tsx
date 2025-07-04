import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Languages, Cloud, Stars } from 'lucide-react';

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-foreground">
            Portfolio
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-muted-foreground hover:text-foreground transition-colors">{language === 'fr' ? 'Moi' : 'Me'}</a>
            <a href="/dev" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.dev')}</a>
            <a href="/art" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.art')}</a>
            <a href="/music" className="text-muted-foreground hover:text-foreground transition-colors">{t('nav.music')}</a>
          </div>

          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'fr' ? 'en' : 'fr')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Languages className="w-4 h-4 mr-1" />
              {language.toUpperCase()}
            </Button>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === 'weather' ? 'cosmic' : 'weather')}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === 'weather' ? (
                <>
                  <Stars className="w-4 h-4 mr-1" />
                  {t('theme.cosmic')}
                </>
              ) : (
                <>
                  <Cloud className="w-4 h-4 mr-1" />
                  {t('theme.weather')}
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;