import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  fr: {
    // Navigation
    'nav.about': 'À propos',
    'nav.education': 'Formation',
    'nav.experience': 'Expérience',
    'nav.projects': 'Projets',
    'nav.contact': 'Contact',
    'nav.dev': 'Dév',
    'nav.art': 'Art',
    'nav.music': 'Musique',
    
    // Hero Section
    'hero.title': 'Samy Amarouche',
    'hero.subtitle': 'Étudiant en IA, en recherche d\'une thèse (PhD)',
    'hero.description': `Je m'appelle Samy Amarouche, passionné par l'intelligence artificielle, la météorologie et la simulation de vie artificielle. Actuellement en Master 2 IA, je poursuis une spécialisation en modélisation atmosphérique et en systèmes complexes. Mon parcours m'a permis de travailler sur des projets innovants (GFS, ballons-sondes, Odoo) et d'acquérir une solide expérience en recherche et développement. Je vise une thèse dans les domaines météorologiques ou la simulation de vie artificielle.`,
    'hero.cta': 'Découvrir mon parcours',
    
    // About Section
    'about.title': 'À propos de moi',
    'about.description': `Je suis un développeur informatique spécialisé en intelligence artificielle, actuellement en Master 2 (IA) après un Master 1 à l'URCA. Mon parcours académique comprend un DUT et un BUT à l'IUT Orsay (Paris Saclay) ainsi qu'une année à Polytech Paris Saclay. J'ai réalisé plusieurs stages et CDD, notamment au CNRS/LMD/Polytechnique sur la modélisation et la prédiction de trajectoires de ballons météos, ainsi que sur le développement de modules Odoo. Mes intérêts de recherche portent sur la météorologie computationnelle et la simulation de vie artificielle, domaines dans lesquels je souhaite poursuivre en thèse.`,
    
    // Education Section
    'education.title': 'Formation',
    'education.master': 'Master 1 Informatique (IA) - URCA (2024-2025)',
    'education.bachelor': 'BUT Informatique - IUT Orsay (2023-2024)',
    'education.dut': 'DUT Informatique - IUT Orsay (2020-2022)',
    'education.engineer': "École d'ingénieur - Polytech Paris Saclay (2022-2023)",
    'education.timeline': `
- DUT (IUT Orsay - Paris Saclay) : 2020-2022\n- École d'ingénieur (Polytech Paris Saclay) : 2022-2023\n- BUT (IUT Orsay - Paris Saclay) : 2023-2024\n- Master 1 (URCA - Reims) : 2024-2025
`,
    
    // Experience Section
    'experience.title': 'Expérience',
    'experience.internships': 'Stages & CDD',
    'experience.timeline': `
- DUT (2022 | 9 semaines) : Python, émulation de logiciel de nacelle de ballon météo (CNRS/LMD/Polytechnique)\n- École d'ingénieur (2023 | 9 semaines) : Développement d'un outil de prédiction de trajectoire de ballon météo (CNRS/LMD/Polytechnique)\n- BUT (2024 | 11 semaines) : Développement de module Odoo (Primti)\n- CDD (2024 | 9 semaines) : Développement d'un outil de prédiction de trajectoire de ballon météo (CNRS/LMD/Polytechnique) (suite)\n- Master 1 (2025 | 12 semaines) : Développement d'un outil de prédiction de trajectoire de ballon météo (CNRS/LMD/Polytechnique) (suite)
`,
    
    // Projects Section
    'projects.title': 'Projets',
    'projects.weather': '',
    'projects.simulation': '',
    
    // Contact Section
    'contact.title': 'Contact',
    'contact.subtitle': 'Intéressé par mon profil ?',
    'contact.description': 'N\'hésitez pas à me contacter pour discuter d\'opportunités de doctorat ou de collaboration.',
    
    // Theme Toggle
    'theme.weather': 'Thème Météo',
    'theme.cosmic': 'Thème Cosmique',
    
    // Common
    'common.readMore': 'En savoir plus',
    'common.viewProject': 'Voir le projet',
    'common.download': 'Télécharger',
    'common.email': 'Email',
    'common.phone': 'Téléphone',
    'common.linkedin': 'LinkedIn',
    'common.github': 'GitHub'
  },
  en: {
    // Navigation
    'nav.about': 'About',
    'nav.education': 'Education',
    'nav.experience': 'Experience',
    'nav.projects': 'Projects',
    'nav.contact': 'Contact',
    'nav.dev': 'Dev',
    'nav.art': 'Art',
    'nav.music': 'Music',
    
    // Hero Section
    'hero.title': 'Samy Amarouche',
    'hero.subtitle': 'AI Student, seeking a PhD opportunity',
    'hero.description': `My name is Samy Amarouche. I am passionate about artificial intelligence, meteorology, and artificial life simulation. Currently pursuing a Master 2 in AI, I specialize in atmospheric modeling and complex systems. My journey includes innovative projects (GFS, weather balloons, Odoo) and strong experience in research and development. I am aiming for a PhD in meteorological or artificial life simulation fields.`,
    'hero.cta': 'Discover my journey',
    
    // About Section
    'about.title': 'About me',
    'about.description': `I am a computer science developer specialized in artificial intelligence, currently in my second year of a Master's degree (AI) after a Master 1 at URCA. My academic background includes a DUT and a BUT at IUT Orsay (Paris Saclay) and a year at Polytech Paris Saclay. I have completed several internships and contracts, notably at CNRS/LMD/Polytechnique on modeling and predicting weather balloon trajectories, as well as Odoo module development. My research interests focus on computational meteorology and artificial life simulation, fields in which I plan to pursue a PhD.`,
    
    // Education Section
    'education.title': 'Education',
    'education.master': 'Master 1 Computer Science (AI) - URCA (2024-2025)',
    'education.bachelor': 'BUT Computer Science - IUT Orsay (2023-2024)',
    'education.dut': 'DUT Computer Science - IUT Orsay (2020-2022)',
    'education.engineer': "Engineering School - Polytech Paris Saclay (2022-2023)",
    'education.timeline': `
- DUT (IUT Orsay - Paris Saclay): 2020-2022\n- Engineering School (Polytech Paris Saclay): 2022-2023\n- BUT (IUT Orsay - Paris Saclay): 2023-2024\n- Master 1 (URCA - Reims): 2024-2025
`,
    
    // Experience Section
    'experience.title': 'Experience',
    'experience.internships': 'Internships & Contracts',
    'experience.timeline': `
- DUT (2022 | 9 weeks): Python, software emulation for weather balloon gondola (CNRS/LMD/Polytechnique)\n- Engineering School (2023 | 9 weeks): Development of a weather balloon trajectory prediction tool (CNRS/LMD/Polytechnique)\n- BUT (2024 | 11 weeks): Odoo module development (Primti)\n- Contract (2024 | 9 weeks): Development of a weather balloon trajectory prediction tool (CNRS/LMD/Polytechnique) (continued)\n- Master 1 (2025 | 12 weeks): Development of a weather balloon trajectory prediction tool (CNRS/LMD/Polytechnique) (continued)
`,
    
    // Projects Section
    'projects.title': 'Projects',
    'projects.weather': '',
    'projects.simulation': '',
    
    // Contact Section
    'contact.title': 'Contact',
    'contact.subtitle': 'Interested in my profile?',
    'contact.description': 'Feel free to contact me to discuss PhD opportunities or collaboration.',
    
    // Theme Toggle
    'theme.weather': 'Weather Theme',
    'theme.cosmic': 'Cosmic Theme',
    
    // Common
    'common.readMore': 'Read more',
    'common.viewProject': 'View project',
    'common.download': 'Download',
    'common.email': 'Email',
    'common.phone': 'Phone',
    'common.linkedin': 'LinkedIn',
    'common.github': 'GitHub'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check localStorage for language preference
  const getInitialLanguage = (): Language => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('lang');
      if (cached === 'fr' || cached === 'en') return cached;
    }
    return 'fr';
  };
  const [language, setLanguage] = useState<Language>(getInitialLanguage());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('lang', language);
    }
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[Language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};