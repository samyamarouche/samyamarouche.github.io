import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Navigation = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const isCosmic = theme === 'cosmic';
  const [langAnim, setLangAnim] = useState(false);
  const [themeAnim, setThemeAnim] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation sur l'icône de langue
  const handleLangClick = () => {
    setLangAnim(true);
    setTimeout(() => setLangAnim(false), 350);
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  // Animation sur le bouton de thème
  const handleThemeClick = () => {
    setThemeAnim(true);
    setTimeout(() => setThemeAnim(false), 350);
    setTheme(theme === 'weather' ? 'cosmic' : 'weather');
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-colors duration-500
      ${theme === 'cosmic'
        ? 'bg-gradient-to-r from-gray-950/90 via-gray-900/80 to-gray-950/90 border-b border-cyan-900'
        : 'bg-background/80 backdrop-blur-md border-b border-indigo-100'}
    `}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className={`text-xl font-semibold select-none transition-colors
            ${theme === 'cosmic' ? 'text-cyan-200' : 'text-indigo-700'}`}
            style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.01em' }}>
            Portfolio
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <a href="/" className={`transition-colors font-medium ${theme === 'cosmic' ? 'text-cyan-100 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}>{language === 'fr' ? 'Moi' : 'Me'}</a>
            <a href="/dev" className={`transition-colors font-medium ${theme === 'cosmic' ? 'text-cyan-100 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}>{t('nav.dev')}</a>
            <a href="/art" className={`transition-colors font-medium ${theme === 'cosmic' ? 'text-cyan-100 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}>{t('nav.art')}</a>
            <a href="/music" className={`transition-colors font-medium ${theme === 'cosmic' ? 'text-cyan-100 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}>{t('nav.music')}</a>
          </div>

          <div className="flex items-center space-x-2">
            {/* Language Button stylisé avec icône animée */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLangClick}
              className={`transition-colors font-semibold px-2 flex items-center bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent border-0 shadow-none ${theme === 'cosmic' ? 'text-cyan-200 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
              style={{ fontFamily: 'Inter, sans-serif' }}
            >
              <span className={`mr-1 transition-transform duration-300 ${langAnim ? 'rotate-180 scale-110' : ''}`}>
                {language === 'fr' ? <span className="text-lg">🇫🇷</span> : <span className="text-lg">🇬🇧</span>}
              </span>
              {language.toUpperCase()}
            </Button>
            {/* Theme Button stylisé avec soleil/lune animés */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleThemeClick}
              className={`transition-colors font-semibold px-2 flex items-center bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent border-0 shadow-none ${theme === 'cosmic' ? 'text-cyan-200 hover:text-white' : 'text-muted-foreground hover:text-foreground'}`}
              style={{ fontFamily: 'Inter, sans-serif' }}
              aria-label="Changer le thème"
            >
              <span className="relative flex items-center justify-center w-6 h-6">
                <Sun className={`absolute w-5 h-5 transition-all duration-300 ${isCosmic ? 'opacity-0 scale-75 rotate-90' : 'opacity-100 scale-100 rotate-0'} ${themeAnim ? 'animate-spin' : ''}`} />
                <Moon className={`absolute w-5 h-5 transition-all duration-300 ${isCosmic ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-75 -rotate-90'} ${themeAnim ? 'animate-spin' : ''}`} />
              </span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;