import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Art item class/interface and mock data
export interface ArtItem {
  id: number;
  image: string;
  name: string;
  description: string;
  link?: string;
  year?: string;
  medium?: string;
}

const mockArtList: ArtItem[] = [
  {
    id: 1,
    image: '/art/art_0.jpg',
    name: 'La ruelle',
    description: 'La ruelle',
    year: '2020',
    medium: 'Papier',
    link: '#',
  },
  {
    id: 2,
    image: '/art/art_1.jpg',
    name: 'Me',
    description: 'Me',
    year: '2021',
    medium: 'Papier',
    link: '#',
  },
  {
    id: 3,
    image: '/art/art_2.jpg',
    name: 'Nuit du Nord',
    description: 'Nuit du Nord',
    year: '2021',
    medium: 'Papier',
    link: '#',
  },
  {
    id: 4,
    image: '/art/art_3.jpg',
    name: 'Smoke',
    description: 'Smoke (Do not smoke)',
    year: '2021',
    medium: 'Papier',
    link: '#',
  },
  {
    id: 5,
    image: '/art/art_4.jpg',
    name: 'Mouette',
    description: 'Mouette',
    year: '2021',
    medium: 'Papier',
    link: '#',
  },
];

const NAVBAR_HEIGHT = 72; // px
const SLIDE_SPEED = 0.5; // px per frame (adjust for speed)

const ArtPage = () => {
  const { language } = useLanguage();
  const [selected, setSelected] = useState<ArtItem | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Duplicate images for seamless infinite scroll
  const images = [...mockArtList, ...mockArtList];

  useEffect(() => {
    if (!sliderRef.current) return;
    let frame: number;
    let pos = 0;
    const slider = sliderRef.current;
    let paused = false;

    const getTotalWidth = () => {
      let total = 0;
      for (let i = 0; i < slider.children.length; i++) {
        const slide = slider.children[i] as HTMLElement;
        if (slide) total += slide.offsetWidth;
      }
      return total;
    };

    const animate = () => {
      const totalWidth = getTotalWidth();
      if (!paused) {
        pos -= SLIDE_SPEED;
        if (Math.abs(pos) >= totalWidth / 2) {
          pos = 0;
          slider.style.transform = `translateX(0px)`;
        } else {
          slider.style.transform = `translateX(${pos}px)`;
        }
      }
      frame = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      // rien à faire ici car totalWidth est recalculé à chaque frame
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <section className="px-0 w-full h-screen bg-background relative flex items-center overflow-hidden pt-[72px]" style={{ userSelect: 'none' }}>
        <div
          ref={sliderRef}
          className="flex h-full min-w-0"
          style={{ willChange: 'transform' }}
        >
          {images.map((art, i) => (
            <div
              key={i}
              className="flex items-center h-[calc(100vh-72px)] flex-shrink-0 p-0 m-0"
              style={{ marginRight: 0 }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <img
                    src={art.image}
                    alt={art.name}
                    className="h-full max-h-[calc(100vh-72px)] w-auto block m-0 p-0 border-0 bg-transparent"
                    style={{ display: 'block' }}
                    onClick={() => setSelected(art)}
                  />
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{art.name}</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>{art.description}</DialogDescription>
                  <div className="mt-4 text-sm text-muted-foreground">
                    {art.year && <div><b>{language === 'fr' ? 'Année' : 'Year'}:</b> {art.year}</div>}
                    {art.medium && <div><b>{language === 'fr' ? 'Technique' : 'Medium'}:</b> {art.medium}</div>}
                    {art.link && <div><a href={art.link} className="text-primary underline" target="_blank" rel="noopener noreferrer">{language === 'fr' ? 'Voir plus' : 'See more'}</a></div>}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      </section>
      <section className="py-20 px-4 bg-background">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6 text-foreground">{language === 'fr' ? 'À propos de cette section' : 'About this section'}</h2>
          <p className="text-muted-foreground mb-4">
            {language === 'fr'
              ? "Bienvenue dans ma galerie d'art ! Faites défiler vers le bas pour en savoir plus sur moi, mon parcours artistique, mes inspirations et mes techniques."
              : "Welcome to my art gallery! Scroll down to learn more about me, my artistic journey, inspirations, and techniques."}
          </p>
          {/* Ajoute ici plus d'infos, liens, etc. */}
        </div>
      </section>
    </>
  );
};

export default ArtPage; 