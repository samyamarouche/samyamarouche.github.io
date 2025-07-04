import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Mail } from 'lucide-react';

const fontInter = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
const fontPlayfair = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';

const ContactPage = () => {
  const { language } = useLanguage();
  const { theme } = useTheme();
  return (
    <main className={`min-h-screen w-full transition-colors duration-500 pt-[72px] ${theme === 'cosmic' ? 'bg-black' : 'bg-white'}`}>
      <section className="w-full max-w-2xl mx-auto py-16 px-4 md:px-0">
        <h1 className={`text-4xl md:text-5xl font-bold text-center mb-8 ${theme === 'cosmic' ? 'text-cyan-200' : 'text-indigo-700'}`} style={{ fontFamily: 'Playfair Display, serif' }}>
          {language === 'fr' ? 'Contactez-moi' : 'Contact Me'}
        </h1>
        <div className={`mb-8 flex flex-col items-center rounded-xl shadow-md p-8 ${theme === 'cosmic' ? 'bg-gray-900' : 'bg-indigo-50'}`}>
          <Mail className={`w-12 h-12 mb-4 ${theme === 'cosmic' ? 'text-cyan-400' : 'text-indigo-400'}`} />
          <p className={`text-lg text-center mb-4 ${theme === 'cosmic' ? 'text-gray-300' : 'text-gray-700'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
            {language === 'fr'
              ? "Vous souhaitez échanger, collaborer ou en savoir plus ? N'hésitez pas à me contacter !"
              : "Want to chat, collaborate, or learn more? Feel free to contact me!"}
          </p>
          <div className="w-full flex flex-col items-center gap-4 mt-4">
            <a href="mailto:pro.samy.amarouche@gmail.com" className={`underline text-lg ${theme === 'cosmic' ? 'text-cyan-300 hover:text-cyan-100' : 'text-indigo-700 hover:text-indigo-900'}`}>pro.samy.amarouche@gmail.com</a>
            <span className={`text-sm ${theme === 'cosmic' ? 'text-gray-400' : 'text-gray-500'}`}>LinkedIn: <a href="https://linkedin.com/in/etudiant-master" className="underline">linkedin.com/in/etudiant-master</a></span>
            <span className={`text-sm ${theme === 'cosmic' ? 'text-gray-400' : 'text-gray-500'}`}>GitHub: <a href="https://github.com/etudiant-master" className="underline">github.com/etudiant-master</a></span>
          </div>
        </div>
      </section>
      <link rel="stylesheet" href={fontInter} />
      <link rel="stylesheet" href={fontPlayfair} />
    </main>
  );
};

export default ContactPage; 