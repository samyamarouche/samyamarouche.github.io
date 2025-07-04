import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Sparkles, CloudSun, Brain, Heart, Smile } from 'lucide-react';

const About = () => {
  const { language, t } = useLanguage();
  const { theme } = useTheme();

  const about = language === 'fr'
    ? {
        intro: "Je m'appelle Samy Amarouche, actuellement étudiant en master. Passionné par la météorologie, l'intelligence artificielle et la simulation de vie artificielle, je cherche à explorer et à repousser les frontières de ces domaines. Je suis aussi à la recherche d'une thèse (PhD) pour approfondir mes passions.",
        passions: [
          { icon: <CloudSun className="w-6 h-6 text-primary" />, label: 'Météorologie' },
          { icon: <Brain className="w-6 h-6 text-primary" />, label: 'Intelligence Artificielle' },
          { icon: <Sparkles className="w-6 h-6 text-primary" />, label: 'Simulation de vie artificielle' },
        ],
        softSkills: ['Curieux', 'Créatif', 'Autonome', 'Esprit d\'équipe', 'Persévérant'],
        funFacts: [
          "J'adore observer les nuages et prévoir la météo pour mes amis.",
          "Je code parfois des petits bots pour simuler des écosystèmes virtuels.",
          "Je suis toujours partant pour un débat sur l'IA et l'éthique."
        ]
      }
    : {
        intro: "My name is Samy Amarouche, currently a master's student. Passionate about meteorology, artificial intelligence, and artificial life simulation, I love exploring and pushing the boundaries of these fields. I am also looking for a PhD to deepen my passions.",
        passions: [
          { icon: <CloudSun className="w-6 h-6 text-primary" />, label: 'Meteorology' },
          { icon: <Brain className="w-6 h-6 text-primary" />, label: 'Artificial Intelligence' },
          { icon: <Sparkles className="w-6 h-6 text-primary" />, label: 'Artificial Life Simulation' },
        ],
        softSkills: ['Curious', 'Creative', 'Autonomous', 'Team player', 'Perseverant'],
        funFacts: [
          "I love cloud watching and forecasting the weather for my friends.",
          "I sometimes code little bots to simulate virtual ecosystems.",
          "Always up for a debate about AI and ethics."
        ]
      };

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-foreground">
          {t('about.title')}
        </h2>
        <Card className={`${theme === 'weather' ? 'weather-card' : 'cosmic-card'} border-0 mb-8`}>
          <CardContent className="p-8 md:p-12">
            <p className="text-lg leading-relaxed text-muted-foreground text-center">
              {about.intro}
            </p>
          </CardContent>
        </Card>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className={`${theme === 'weather' ? 'weather-card' : 'cosmic-card'} border-0`}>
            <CardContent className="p-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center"><Heart className="w-5 h-5 mr-2 text-primary" />{language === 'fr' ? 'Passions' : 'Passions'}</h3>
              <ul className="space-y-2">
                {about.passions.map((p, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-muted-foreground">{p.icon}{p.label}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className={`${theme === 'weather' ? 'weather-card' : 'cosmic-card'} border-0`}>
            <CardContent className="p-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center"><Smile className="w-5 h-5 mr-2 text-primary" />{language === 'fr' ? 'Fun Facts' : 'Fun Facts'}</h3>
              <ul className="space-y-2">
                {about.funFacts.map((fact, idx) => (
                  <li key={idx} className="text-muted-foreground">{fact}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card className={`${theme === 'weather' ? 'weather-card' : 'cosmic-card'} border-0`}>
            <CardContent className="p-6 flex flex-col items-center">
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center"><Sparkles className="w-5 h-5 mr-2 text-primary" />{language === 'fr' ? 'Soft Skills' : 'Soft Skills'}</h3>
              <ul className="flex flex-wrap gap-2 justify-center">
                {about.softSkills.map((skill, idx) => (
                  <li key={idx} className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">{skill}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;