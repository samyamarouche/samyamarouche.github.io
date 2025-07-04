import React from 'react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ChevronDown } from 'lucide-react';
import weatherHero from '@/assets/weather-hero.jpg';
import cosmicHero from '@/assets/cosmic-hero.jpg';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

const Hero = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${theme === 'weather' ? weatherHero : cosmicHero})`
        }}
      >
        <div className="absolute inset-0 bg-background/60" />
      </div>

      {/* Floating Elements */}
      {theme === 'weather' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="cloud-float absolute top-20 left-0 w-32 h-16 bg-cloud rounded-full opacity-30" />
          <div className="cloud-float absolute top-40 left-0 w-24 h-12 bg-cloud rounded-full opacity-20" style={{animationDelay: '5s'}} />
          <div className="cloud-float absolute top-60 left-0 w-40 h-20 bg-cloud rounded-full opacity-25" style={{animationDelay: '10s'}} />
        </div>
      )}

      {theme === 'cosmic' && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="star-twinkle absolute top-20 left-20 w-2 h-2 bg-star-glow rounded-full" />
          <div className="star-twinkle absolute top-40 right-32 w-1 h-1 bg-star-glow rounded-full" style={{animationDelay: '1s'}} />
          <div className="star-twinkle absolute top-60 left-1/3 w-1.5 h-1.5 bg-star-glow rounded-full" style={{animationDelay: '2s'}} />
          <div className="star-twinkle absolute bottom-40 right-20 w-2 h-2 bg-star-glow rounded-full" style={{animationDelay: '3s'}} />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="flex justify-center mb-6">
          <Avatar className="w-32 h-32 border-4 border-sky-400 dark:border-white/80 shadow-none bg-background">
            <AvatarImage src="/avatar.png" alt="Profile picture" />
          </Avatar>
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-foreground">
          {t('hero.title')}
        </h1>
        <h2 className="text-xl md:text-2xl font-medium mb-8 text-muted-foreground">
          {t('hero.subtitle')}
        </h2>
        <p className="text-lg md:text-xl mb-12 max-w-3xl mx-auto text-muted-foreground leading-relaxed">
          {t('hero.description')}
        </p>
        
        <Button 
          onClick={scrollToAbout}
          size="lg"
          className="text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {t('hero.cta')}
        </Button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="w-8 h-8 text-muted-foreground" />
      </div>
    </section>
  );
};

export default Hero;