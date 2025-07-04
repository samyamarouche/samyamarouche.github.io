import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Mail, Phone, Linkedin, Github, MapPin, Download } from 'lucide-react';

const Contact = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const contactInfo = [
    {
      icon: Mail,
      label: t('common.email'),
      value: 'etudiant.master@email.fr',
      href: 'mailto:etudiant.master@email.fr'
    },
    {
      icon: Phone,
      label: t('common.phone'),
      value: '+33 6 12 34 56 78',
      href: 'tel:+33612345678'
    },
    {
      icon: Linkedin,
      label: t('common.linkedin'),
      value: 'linkedin.com/in/etudiant-master',
      href: 'https://linkedin.com/in/etudiant-master'
    },
    {
      icon: Github,
      label: t('common.github'),
      value: 'github.com/etudiant-master',
      href: 'https://github.com/etudiant-master'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'France',
      href: null
    }
  ];

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {t('contact.title')}
          </h2>
          <h3 className="text-2xl text-primary mb-4">
            {t('contact.subtitle')}
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t('contact.description')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Contact Information */}
          <Card className={`${theme === 'weather' ? 'weather-card' : 'cosmic-card'} border-0`}>
            <CardContent className="p-8">
              <h4 className="text-xl font-semibold text-foreground mb-6">
                Informations de contact
              </h4>
              
              <div className="space-y-4">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <info.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-muted-foreground">{info.label}</div>
                      {info.href ? (
                        <a 
                          href={info.href}
                          className="text-foreground hover:text-primary transition-colors"
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <div className="text-foreground">{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8">
                <Button className="w-full" size="lg">
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger CV
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Research Interests */}
          <Card className={`${theme === 'weather' ? 'weather-card' : 'cosmic-card'} border-0`}>
            <CardContent className="p-8">
              <h4 className="text-xl font-semibold text-foreground mb-6">
                Intérêts de recherche
              </h4>
              
              <div className="space-y-6">
                <div>
                  <h5 className="font-medium text-primary mb-3">Météorologie Computationnelle</h5>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Modèles GFS et prévision numérique</li>
                    <li>• Analyse de données ballons-sondes</li>
                    <li>• Machine learning pour la météorologie</li>
                    <li>• Systèmes d'alerte précoce</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-primary mb-3">Simulation de Vie Artificielle</h5>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Algorithmes évolutionnaires</li>
                    <li>• Systèmes multi-agents</li>
                    <li>• Réseaux de neurones artificiels</li>
                    <li>• Écosystèmes virtuels</li>
                  </ul>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    <strong>Objectif :</strong> Contribuer à l'avancement des connaissances 
                    en combinant l'IA et les sciences atmosphériques pour résoudre 
                    les défis climatiques contemporains.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Contact;