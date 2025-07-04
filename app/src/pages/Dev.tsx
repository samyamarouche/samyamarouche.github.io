import React from "react";
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';

const fontInter = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
const fontPlayfair = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';

const Dev: React.FC = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  return (
    <main className={`min-h-screen w-full transition-colors duration-500 pt-[72px] ${theme === 'cosmic' ? 'bg-black' : 'bg-white'}`}>
      <section className="w-full max-w-3xl mx-auto py-16 px-4 md:px-0">
        <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${theme === 'cosmic' ? 'text-cyan-200' : 'text-indigo-700'}`} style={{ fontFamily: 'Playfair Display, serif' }}>
          {language === 'fr' ? 'Développement & Projets' : 'Development & Projects'}
        </h1>
        <p className={`mb-6 text-lg ${theme === 'cosmic' ? 'text-gray-200' : 'text-gray-700'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
          {language === 'fr'
            ? "Bienvenue sur ma page dédiée à mes activités de développement, projets personnels et professionnels, ainsi que mes réflexions autour du code et de la technologie !"
            : "Welcome to my page dedicated to my development activities, personal and professional projects, and my thoughts on code and technology!"}
        </p>
        {/* Ajoutez ici vos projets, expériences, articles, etc. */}
      </section>
      <link rel="stylesheet" href={fontInter} />
      <link rel="stylesheet" href={fontPlayfair} />
    </main>
  );
};

export default Dev; 