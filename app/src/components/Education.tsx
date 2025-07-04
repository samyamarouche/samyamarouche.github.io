import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

const Education = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  // Education entries from the notepad and translation keys
  const educationData = [
    {
      degree: t('education.dut'),
      school: 'IUT Orsay - Paris Saclay',
      period: '2020 - 2022',
      location: 'Orsay, France',
    },
    {
      degree: t('education.engineer'),
      school: 'Polytech Paris Saclay',
      period: '2022 - 2023',
      location: 'Paris, France',
    },
    {
      degree: t('education.bachelor'),
      school: 'IUT Orsay - Paris Saclay',
      period: '2023 - 2024',
      location: 'Orsay, France',
    },
    {
      degree: t('education.master'),
      school: 'URCA - Reims',
      period: '2024 - 2025',
      location: 'Reims, France',
    },
  ];

  return (
    <section id="education" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
          {t('education.title')}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {educationData.map((edu, idx) => (
            <Card key={idx} className={`${theme === 'weather' ? 'weather-card' : 'cosmic-card'} border-0 hover:scale-[1.02] transition-transform duration-300`}>
              <CardContent className="p-8">
                <div className="flex items-center mb-4">
                  <GraduationCap className="w-8 h-8 text-primary mr-4" />
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground mb-1">{edu.degree}</h3>
                    <div className="text-primary font-medium">{edu.school}</div>
                  </div>
                </div>
                <div className="flex items-center text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>{edu.period}</span>
                </div>
                <div className="flex items-center text-muted-foreground">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span>{edu.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;