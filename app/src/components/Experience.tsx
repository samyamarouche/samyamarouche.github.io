import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

const Experience = () => {
  const { t, language } = useLanguage();
  const { theme } = useTheme();

  // Experience entries from the notepad and translation keys
  const experienceData = [
    {
      title: language === 'fr' ? 'Stage DUT' : 'DUT Internship',
      company: 'CNRS/LMD/Polytechnique',
      period: language === 'fr' ? '2022 | 9 semaines' : '2022 | 9 weeks',
      location: 'Palaiseau, France',
      description: language === 'fr'
        ? "Python, émulation de logiciel de nacelle de ballon météo."
        : "Python, software emulation for weather balloon gondola."
    },
    {
      title: language === 'fr' ? "Stage École d'ingénieur" : 'Engineering School Internship',
      company: 'CNRS/LMD/Polytechnique',
      period: language === 'fr' ? '2023 | 9 semaines' : '2023 | 9 weeks',
      location: 'Palaiseau, France',
      description: language === 'fr'
        ? "Développement d'un outil de prédiction de trajectoire de ballon météo."
        : "Development of a weather balloon trajectory prediction tool."
    },
    {
      title: language === 'fr' ? 'Stage BUT' : 'BUT Internship',
      company: 'Primti',
      period: language === 'fr' ? '2024 | 11 semaines' : '2024 | 11 weeks',
      location: 'France',
      description: language === 'fr'
        ? "Développement de module Odoo."
        : "Odoo module development."
    },
    {
      title: language === 'fr' ? 'CDD' : 'Contract',
      company: 'CNRS/LMD/Polytechnique',
      period: language === 'fr' ? '2024 | 9 semaines' : '2024 | 9 weeks',
      location: 'Palaiseau, France',
      description: language === 'fr'
        ? "Développement d'un outil de prédiction de trajectoire de ballon météo (suite)."
        : "Development of a weather balloon trajectory prediction tool (continued)."
    },
    {
      title: language === 'fr' ? 'Stage Master 1' : 'Master 1 Internship',
      company: 'CNRS/LMD/Polytechnique',
      period: language === 'fr' ? '2025 | 12 semaines' : '2025 | 12 weeks',
      location: 'Palaiseau, France',
      description: language === 'fr'
        ? "Développement d'un outil de prédiction de trajectoire de ballon météo (suite)."
        : "Development of a weather balloon trajectory prediction tool (continued).",
      current: true
    },
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
          {t('experience.title')}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {experienceData.map((exp, idx) => (
            <Card key={idx} className={`${theme === 'weather' ? 'weather-card' : 'cosmic-card'} border-0 hover:scale-[1.02] transition-transform duration-300`}>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <Briefcase className="w-8 h-8 text-primary mr-4" />
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-semibold text-foreground mb-1">{exp.title}</h3>
                    <div className="text-primary font-medium">{exp.company}</div>
                    {exp.current && (
                      <span className="ml-2 inline-block align-middle">
                        <span className="inline-block w-3 h-3 rounded-full bg-green-500 shadow animate-pulse" title={language === 'fr' ? 'En cours' : 'Ongoing'}></span>
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{exp.period}</span>
                </div>
                <div className="flex items-center text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{exp.location}</span>
                </div>
                <div className="text-muted-foreground mt-2">
                  {exp.description}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;