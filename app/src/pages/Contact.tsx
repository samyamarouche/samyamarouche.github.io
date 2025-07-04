import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Mail } from 'lucide-react';

const ContactPage = () => {
  const { language } = useLanguage();
  return (
    <section className="py-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-foreground">
          {language === 'fr' ? 'Contactez-moi' : 'Contact Me'}
        </h1>
        <Card className="mb-8">
          <CardContent className="p-8 flex flex-col items-center">
            <Mail className="w-12 h-12 text-primary mb-4" />
            <p className="text-lg text-muted-foreground text-center mb-4">
              {language === 'fr'
                ? "Vous souhaitez échanger, collaborer ou en savoir plus ? N'hésitez pas à me contacter !"
                : "Want to chat, collaborate, or learn more? Feel free to contact me!"}
            </p>
            <div className="w-full flex flex-col items-center gap-4 mt-4">
              <a href="mailto:etudiant.master@email.fr" className="text-primary underline text-lg">etudiant.master@email.fr</a>
              <span className="text-muted-foreground">LinkedIn: <a href="https://linkedin.com/in/etudiant-master" className="underline">linkedin.com/in/etudiant-master</a></span>
              <span className="text-muted-foreground">GitHub: <a href="https://github.com/etudiant-master" className="underline">github.com/etudiant-master</a></span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default ContactPage; 