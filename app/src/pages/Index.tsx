import React, { useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Import Google Fonts (Inter pour le texte, Playfair Display pour le titre)
const fontInter = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
const fontPlayfair = 'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap';

// Animation utilitaire
const fadeInClass = 'opacity-0 translate-y-8 animate-fade-in';

// Timeline expérience
const experiences = [
  {
    id: 5,
    year: { fr: "2025", en: "2025" },
    title: {
      fr: "Stage Master 1 - CNRS/LMD/Polytechnique",
      en: "Master 1 Internship - CNRS/LMD/Polytechnique"
    },
    place: { fr: "Paris", en: "Paris" },
    short: {
      fr: "Développement d'un outil de prédiction de trajectoire de ballon météo (suite)",
      en: "Development of a weather balloon trajectory prediction tool (continued)"
    },
    details: {
      fr: "Stage de 12 semaines. Poursuite du développement de l'outil, validation scientifique et documentation avancée.",
      en: "12-week internship. Continued development, scientific validation, and advanced documentation."
    }
  },
  {
    id: 4,
    year: { fr: "2024", en: "2024" },
    title: {
      fr: "CDD - CNRS/LMD/Polytechnique",
      en: "Fixed-term contract - CNRS/LMD/Polytechnique"
    },
    place: { fr: "Paris", en: "Paris" },
    short: {
      fr: "Développement d'un outil de prédiction de trajectoire de ballon météo (suite)",
      en: "Development of a weather balloon trajectory prediction tool (continued)"
    },
    details: {
      fr: "CDD de 9 semaines. Amélioration et extension de l'outil de prédiction, ajout de nouvelles fonctionnalités et optimisation des performances.",
      en: "9-week contract. Improved and extended the prediction tool, added new features, and optimized performance."
    }
  },
  {
    id: 3,
    year: { fr: "2024", en: "2024" },
    title: {
      fr: "Stage BUT - Primti",
      en: "Internship BUT - Primti"
    },
    place: { fr: "Paris", en: "Paris" },
    short: {
      fr: "Développement de module Odoo",
      en: "Odoo module development"
    },
    details: {
      fr: "Stage de 11 semaines. Développement de modules personnalisés pour Odoo, automatisation de processus métier et intégration avec d'autres outils.",
      en: "11-week internship. Developed custom modules for Odoo, automated business processes, and integrated with other tools."
    }
  },
  {
    id: 2,
    year: { fr: "2023", en: "2023" },
    title: {
      fr: "Stage Ingénieur - CNRS/LMD/Polytechnique",
      en: "Engineering Internship - CNRS/LMD/Polytechnique"
    },
    place: { fr: "Paris", en: "Paris" },
    short: {
      fr: "Développement d'un outil de prédiction de trajectoire de ballon météo",
      en: "Development of a weather balloon trajectory prediction tool"
    },
    details: {
      fr: "Stage de 9 semaines. Création d'un outil Python pour prédire la trajectoire de ballons météos, intégration de modèles atmosphériques et visualisation des résultats.",
      en: "9-week internship. Created a Python tool to predict weather balloon trajectories, integrating atmospheric models and result visualization."
    }
  },
  {
    id: 1,
    year: { fr: "2022", en: "2022" },
    title: {
      fr: "Stage DUT - CNRS/LMD/Polytechnique",
      en: "Internship DUT - CNRS/LMD/Polytechnique"
    },
    place: { fr: "Paris", en: "Paris" },
    short: {
      fr: "Python, émulation de logiciel de nacelle de ballon météo",
      en: "Python, software emulation for weather balloon gondola"
    },
    details: {
      fr: "Stage de 9 semaines. Développement d'un logiciel d'émulation pour la nacelle d'un ballon météo, permettant de simuler les données et scénarios pour la recherche.",
      en: "9-week internship. Developed an emulation software for a weather balloon gondola, simulating data and scenarios for research."
    }
  },
];

// Passions
const passions = [
  { icon: '🐍', label: { fr: 'Python', en: 'Python' } },
  { icon: '🧬', label: { fr: 'Vie Artificielle', en: 'Artificial Life' } },
  { icon: '🤖', label: { fr: 'Intelligence Artificielle', en: 'Artificial Intelligence' } },
  { icon: '🌱', label: { fr: 'Simulation & Évolution', en: 'Simulation & Evolution' } },
  { icon: '🌤️', label: { fr: 'Météo', en: 'Weather' } },
];

const studies = [
  {
    year: { fr: '2024-2025', en: '2024-2025' },
    title: {
      fr: 'Master 1 Informatique (IA) - URCA (Reims)',
      en: 'Master 1 Computer Science (AI) - URCA (Reims)'
    }
  },
  {
    year: { fr: '2023-2024', en: '2023-2024' },
    title: {
      fr: 'BUT Informatique - IUT Orsay (Paris Saclay)',
      en: 'BUT Computer Science - IUT Orsay (Paris Saclay)'
    }
  },
  {
    year: { fr: '2022-2023', en: '2022-2023' },
    title: {
      fr: "École d'ingénieur - Polytech Paris Saclay",
      en: 'Engineering School - Polytech Paris Saclay'
    }
  },
  {
    year: { fr: '2020-2022', en: '2020-2022' },
    title: {
      fr: 'DUT Informatique - IUT Orsay (Paris Saclay)',
      en: 'DUT Computer Science - IUT Orsay (Paris Saclay)'
    }
  },
];

const TimelineDot = ({ theme, type }: { theme: string, type: 'exp' | 'edu' }) => (
  <span className={`block w-3 h-3 rounded-full border-2
    ${type === 'exp'
      ? (theme === 'cosmic' ? 'bg-cyan-400 border-cyan-300' : 'bg-indigo-400 border-indigo-200')
      : (theme === 'cosmic' ? 'bg-pink-400 border-pink-300' : 'bg-green-400 border-green-200')}
  `}></span>
);

const ExperienceStudies = ({ theme, language }: { theme: string, language: string }) => (
  <section className="w-full max-w-4xl mx-auto py-12 px-2 md:px-0">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Expérience */}
      <div>
        <h3 className={`text-xl md:text-2xl font-bold mb-4
          ${theme === 'cosmic' ? 'text-cyan-200' : 'text-indigo-700'}`}
          style={{ fontFamily: 'Playfair Display, serif' }}>
          {language === 'fr' ? 'Expérience' : 'Experience'}
        </h3>
        <ol className={`relative border-l border-dashed
          ${theme === 'cosmic' ? 'border-cyan-700' : 'border-indigo-200'} ml-2`}>
          {experiences.map((exp, i) => (
            <li key={i} className="mb-4 ml-4 flex items-start gap-2">
              <TimelineDot theme={theme} type="exp" />
              <div>
                <div className={`text-sm font-semibold
                  ${theme === 'cosmic' ? 'text-cyan-200' : 'text-indigo-700'}`}
                  style={{ fontFamily: 'Inter, sans-serif' }}>{exp.title[language]}</div>
                <div className="text-xs text-gray-500 mb-0.5">{exp.year[language]}</div>
                <div className={`text-xs
                  ${theme === 'cosmic' ? 'text-cyan-100' : 'text-gray-600'}`}>{exp.short[language]}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      {/* Études */}
      <div>
        <h3 className={`text-xl md:text-2xl font-bold mb-4
          ${theme === 'cosmic' ? 'text-pink-200' : 'text-green-700'}`}
          style={{ fontFamily: 'Playfair Display, serif' }}>
          {language === 'fr' ? 'Études' : 'Studies'}
        </h3>
        <ol className={`relative border-l border-dashed
          ${theme === 'cosmic' ? 'border-pink-700' : 'border-green-200'} ml-2`}>
          {studies.map((study, i) => (
            <li key={i} className="mb-4 ml-4 flex items-start gap-2">
              <TimelineDot theme={theme} type="edu" />
              <div>
                <div className={`text-sm font-semibold
                  ${theme === 'cosmic' ? 'text-pink-200' : 'text-green-700'}`}
                  style={{ fontFamily: 'Inter, sans-serif' }}>{study.title[language]}</div>
                <div className="text-xs text-gray-500">{study.year[language]}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  </section>
);

const Halo = ({ theme }: { theme: string }) => (
  <svg
    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0"
    width="420"
    height="420"
    viewBox="0 0 420 420"
    fill="none"
    style={{ filter: 'blur(60px)' }}
    aria-hidden="true"
  >
    <defs>
      <radialGradient id="haloGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
        <stop offset="0%" stopColor={theme === 'cosmic' ? '#6366f1' : '#a5b4fc'} stopOpacity="0.7" />
        <stop offset="60%" stopColor={theme === 'cosmic' ? '#06b6d4' : '#6ee7b7'} stopOpacity="0.5" />
        <stop offset="100%" stopColor={theme === 'cosmic' ? '#818cf8' : '#818cf8'} stopOpacity="0.2" />
      </radialGradient>
    </defs>
    <circle cx="210" cy="210" r="180" fill="url(#haloGradient)" />
  </svg>
);

const Hero = ({ theme, t, language }: { theme: string, t: (k: string) => string, language: string }) => (
  <section className={`relative flex flex-col items-center justify-center min-h-[80vh] px-4 py-16 transition-colors duration-500 ${theme === 'cosmic' ? 'bg-gradient-to-br from-gray-900 via-gray-950 to-black' : 'bg-gradient-to-br from-white via-indigo-50 to-blue-50'}` }>
    {/* Halo lumineux animé */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
      <Halo theme={theme} />
    </div>
    {/* Avatar avec halo */}
    <div className="relative z-10 flex flex-col items-center mb-8">
      <img
        src="/public/avatar.png"
        alt="Avatar Samy"
        className={`w-28 h-28 md:w-40 md:h-40 rounded-full border-4 ${theme === 'cosmic' ? 'border-gray-800' : 'border-white'} shadow-2xl object-cover mb-6`}
        style={{ boxShadow: theme === 'cosmic' ? '0 0 0 12px #6366f133, 0 8px 32px 0 #818cf855' : '0 0 0 12px #a5b4fc33, 0 8px 32px 0 #818cf855' }}
      />
      <h1
        className={`text-4xl md:text-6xl font-bold text-center mb-2 drop-shadow-lg ${theme === 'cosmic' ? 'text-white' : 'text-gray-900'}`}
        style={{ fontFamily: 'Playfair Display, serif', letterSpacing: '0.01em' }}
      >
        Samy Amarouche
      </h1>
      <h2 className={`text-lg md:text-2xl text-center font-semibold mb-4 ${theme === 'cosmic' ? 'text-cyan-300' : 'text-indigo-600'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
        {language === 'fr' ? 'Développeur Python & Explorateur du vivant numérique' : 'Python Developer & Digital Life Explorer'}
      </h2>
      <p className={`text-base md:text-lg text-center max-w-xl ${theme === 'cosmic' ? 'text-gray-200' : 'text-gray-700'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
        {language === 'fr'
          ? `J'imagine et je code des mondes où la vie artificielle évolue, apprend, et surprend. Passionné par l'IA, la simulation et la création d'outils intelligents.`
          : `I imagine and code worlds where artificial life evolves, learns, and surprises. Passionate about AI, simulation, and building intelligent tools.`}
      </p>
    </div>
    {/* Import des polices */}
    <link rel="stylesheet" href={fontInter} />
    <link rel="stylesheet" href={fontPlayfair} />
  </section>
);

const About = ({ theme, language }: { theme: string, language: string }) => (
  <section className="w-full max-w-3xl mx-auto py-16 px-4 md:px-0">
    <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${theme === 'cosmic' ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Playfair Display, serif' }}>{language === 'fr' ? 'À propos' : 'About'}</h3>
    <p className={`text-lg leading-relaxed ${theme === 'cosmic' ? 'text-gray-200' : 'text-gray-700'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
      {language === 'fr'
        ? `Développeur passionné, je me spécialise dans la création de systèmes intelligents et de simulations inspirées du vivant. J'aime explorer les frontières entre le code, la biologie et l'imaginaire, pour inventer des expériences numériques uniques.`
        : `Passionate developer specializing in intelligent systems and life-inspired simulations. I love exploring the boundaries between code, biology, and imagination to invent unique digital experiences.`}
    </p>
  </section>
);

const Passions = ({ theme, language }: { theme: string, language: string }) => (
  <section className="w-full max-w-3xl mx-auto py-16 px-4 md:px-0">
    <h3 className={`text-2xl md:text-3xl font-bold mb-8 ${theme === 'cosmic' ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Playfair Display, serif' }}>{language === 'fr' ? 'Passions & Spécialités' : 'Passions & Specialties'}</h3>
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {passions.map((p, i) => (
        <div key={i} className={`flex flex-col items-center justify-center p-4 ${theme === 'cosmic' ? 'bg-gray-900' : 'bg-indigo-50'} rounded-xl shadow-sm hover:shadow-md transition-all`}>
          <span className="text-4xl mb-2">{p.icon}</span>
          <span className={`text-base font-medium ${theme === 'cosmic' ? 'text-cyan-300' : 'text-indigo-700'}`} style={{ fontFamily: 'Inter, sans-serif' }}>{p.label[language]}</span>
        </div>
      ))}
    </div>
  </section>
);

const Contact = ({ theme, language }: { theme: string, language: string }) => (
  <section className="w-full max-w-3xl mx-auto py-16 px-4 md:px-0 text-center">
    <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${theme === 'cosmic' ? 'text-white' : 'text-gray-900'}`} style={{ fontFamily: 'Playfair Display, serif' }}>{language === 'fr' ? 'Contact' : 'Contact'}</h3>
    <p className={`text-lg mb-6 ${theme === 'cosmic' ? 'text-gray-200' : 'text-gray-700'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
      {language === 'fr'
        ? <>Envie de collaborer, d'échanger ou de découvrir mes projets ? <br /><a href="mailto:pro.samy.amarouche@gmail.com" className="text-cyan-400 underline hover:text-cyan-200 transition">Contactez-moi</a></>
        : <>Want to collaborate, chat or discover my projects? <br /><a href="mailto:pro.samy.amarouche@gmail.com" className="text-cyan-400 underline hover:text-cyan-200 transition">Contact me</a></>}
    </p>
  </section>
);

const Index = () => {
  const { theme } = useTheme();
  const { language, t } = useLanguage();
  return (
    <main className={`min-h-screen w-full transition-colors duration-500 pt-[72px] ${theme === 'cosmic' ? 'bg-black' : 'bg-white'}`}>
      <Hero theme={theme} t={t} language={language} />
      <About theme={theme} language={language} />
      <ExperienceStudies theme={theme} language={language} />
      <Passions theme={theme} language={language} />
      <Contact theme={theme} language={language} />
      <footer className={`w-full py-8 text-center text-xs z-20 relative ${theme === 'cosmic' ? 'text-gray-600' : 'text-gray-400'}`}>
        © {new Date().getFullYear()} Samy. Portfolio designé avec passion.
      </footer>
    </main>
  );
};

export default Index;
