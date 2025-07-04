import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';

// Music cover class/interface and mock data
export interface MusicCover {
  id: number;
  image: string;
  name: string;
  artist: string;
  description: string;
  link?: string;
  year?: string;
  genre?: string;
}

const mockMusicList: MusicCover[] = [
  {
    id: 1,
    image: '/music/cover1.jpg',
    name: 'Stellar Vibes',
    artist: 'DJ Nebula',
    description: 'A cosmic journey through sound.',
    year: '2023',
    genre: 'Electronic',
    link: '#',
  },
  {
    id: 2,
    image: '/music/cover2.jpg',
    name: 'Dreamscape',
    artist: 'Aurora',
    description: 'Ambient melodies for late nights.',
    year: '2022',
    genre: 'Ambient',
    link: '#',
  },
  {
    id: 3,
    image: '/music/cover3.jpg',
    name: 'Forest Echoes',
    artist: 'Sylva',
    description: 'Organic sounds inspired by nature.',
    year: '2021',
    genre: 'World',
    link: '#',
  },
];

const NAVBAR_HEIGHT = 72; // px
const SLIDE_SPEED = 0.5; // px per frame

const MusicPage = () => {
  const { language } = useLanguage();
  const [selected, setSelected] = useState<MusicCover | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Dupliquer la liste pour l'effet infini
  const images = [...mockMusicList, ...mockMusicList];

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
          {images.map((cover, i) => (
            <div
              key={i}
              className="flex items-center h-[calc(100vh-72px)] flex-shrink-0 p-0 m-0"
              style={{ marginRight: 0 }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <img
                    src={cover.image}
                    alt={cover.name}
                    className="h-full max-h-[calc(100vh-72px)] w-auto block m-0 p-0 border-0 bg-transparent cursor-pointer rounded-lg shadow-lg"
                    style={{ display: 'block' }}
                    onClick={() => setSelected(cover)}
                  />
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>{cover.name}</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>{cover.description}</DialogDescription>
                  <div className="mt-4 text-sm text-muted-foreground">
                    <div><b>{language === 'fr' ? 'Artiste' : 'Artist'}:</b> {cover.artist}</div>
                    {cover.year && <div><b>{language === 'fr' ? 'Année' : 'Year'}:</b> {cover.year}</div>}
                    {cover.genre && <div><b>{language === 'fr' ? 'Genre' : 'Genre'}:</b> {cover.genre}</div>}
                    {cover.link && <div><a href={cover.link} className="text-primary underline" target="_blank" rel="noopener noreferrer">{language === 'fr' ? 'Écouter' : 'Listen'}</a></div>}
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
              ? "Bienvenue dans ma collection musicale ! Faites défiler vers le bas pour en savoir plus sur mes goûts, mes inspirations et mes créations."
              : "Welcome to my music collection! Scroll down to learn more about my tastes, inspirations, and creations."}
          </p>
          {/* Ajoute ici plus d'infos, liens, etc. */}
        </div>
      </section>
    </>
  );
};

export default MusicPage; 