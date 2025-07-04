import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, GraduationCap, Briefcase, Folder } from 'lucide-react';

const Sidebar = () => {
  const { t } = useLanguage();
  const [active, setActive] = React.useState('about');
  React.useEffect(() => {
    const onScroll = () => {
      const ids = ['about', 'education', 'experience', 'projects'];
      let found = 'about';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && window.scrollY + 120 >= el.offsetTop) {
          found = id;
        }
      }
      setActive(found);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const sections = [
    { id: 'about', label: t('nav.about'), icon: <BookOpen className="w-5 h-5 mr-2" /> },
    { id: 'education', label: t('nav.education'), icon: <GraduationCap className="w-5 h-5 mr-2" /> },
    { id: 'experience', label: t('nav.experience'), icon: <Briefcase className="w-5 h-5 mr-2" /> },
    { id: 'projects', label: t('nav.projects'), icon: <Folder className="w-5 h-5 mr-2" /> },
  ];
  return (
    <nav className="fixed top-32 left-0 z-40 hidden md:flex flex-col gap-2 px-2 py-6">
      {sections.map((section) => (
        <button
          key={section.id}
          className={`flex items-center w-40 px-4 py-2 text-left rounded-r-lg transition-colors
            border-l-4
            ${active === section.id
              ? 'border-primary bg-muted/60 text-primary font-semibold shadow-sm'
              : 'border-transparent text-muted-foreground hover:bg-muted/30 hover:text-foreground'}
          `}
          onClick={() => {
            const el = document.getElementById(section.id.toLowerCase());
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          {section.icon}{section.label}
        </button>
      ))}
    </nav>
  );
};

const Index = () => {
  const { theme } = useTheme();
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="md:ml-40">
        <div id="hero"><Hero /></div>
        <div id="about"><About /></div>
        <div id="education"><Education /></div>
        <div id="experience"><Experience /></div>
        <div id="projects"><Projects /></div>
        <div id="footer"><Footer /></div>
      </div>
    </div>
  );
};

export default Index;
