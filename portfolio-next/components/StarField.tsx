"use client";
import React, { useState, useEffect, useCallback } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinkleSpeed: number;
  layer: number; // 1 = background, 2 = middle, 3 = foreground
}

interface StarFieldProps {
  cameraPosition?: { x: number; y: number; z: number };
}

export const StarField: React.FC<StarFieldProps> = ({ cameraPosition: externalCameraPosition }) => {
  const [stars, setStars] = useState<Star[]>([]);
  const [internalCameraPosition, setInternalCameraPosition] = useState({ x: 0, y: 0 });

  // Utiliser la position de caméra externe si fournie, sinon utiliser l'interne
  const cameraPosition = externalCameraPosition || internalCameraPosition;

  // Générer les étoiles au montage du composant
  useEffect(() => {
    const generateStars = () => {
      const newStars: Star[] = [];
      
      // Étoiles de fond (plus petites, plus nombreuses) - bougent le moins
      for (let i = 0; i < 150; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 0.5 + Math.random() * 1,
          opacity: 0.2 + Math.random() * 0.3,
          twinkleSpeed: 2 + Math.random() * 3,
          layer: 1
        });
      }
      
      // Étoiles du milieu (taille moyenne) - bougent modérément
      for (let i = 150; i < 250; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 1 + Math.random() * 1.5,
          opacity: 0.4 + Math.random() * 0.4,
          twinkleSpeed: 1.5 + Math.random() * 2.5,
          layer: 2
        });
      }
      
      // Étoiles de premier plan (plus grandes, plus brillantes) - bougent le plus
      for (let i = 250; i < 300; i++) {
        newStars.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: 1.5 + Math.random() * 2,
          opacity: 0.6 + Math.random() * 0.4,
          twinkleSpeed: 1 + Math.random() * 2,
          layer: 3
        });
      }
      
      setStars(newStars);
    };

    generateStars();
  }, []);

  // Effet de caméra interne (seulement si pas de caméra externe fournie)
  useEffect(() => {
    if (externalCameraPosition) return; // Utiliser la caméra externe

    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setInternalCameraPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [externalCameraPosition]);

  return (
    <div 
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        transform: `translate3d(${-cameraPosition.x * 2}px, ${-cameraPosition.y * 2}px, 0px)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.1s ease-out'
      }}
    >
      {stars.map((star) => {
        // Calculer le déplacement basé sur la couche de l'étoile
        // Plus la couche est élevée, plus le mouvement est important
        const parallaxMultiplier = star.layer * 0.8; // 0.8, 1.6, 2.4 (encore plus augmenté)
        const moveX = cameraPosition.x * parallaxMultiplier;
        const moveY = cameraPosition.y * parallaxMultiplier;
        
        return (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              transform: `translate(${moveX}px, ${moveY}px)`,
              transition: 'transform 0.2s ease-out',
              animation: `starTwinkle${star.layer} ${star.twinkleSpeed}s ease-in-out infinite`,
              animationDelay: `${Math.random() * star.twinkleSpeed}s`
            }}
          />
        );
      })}
      
      <style jsx>{`
        @keyframes starTwinkle1 {
          0%, 100% { 
            opacity: 0.2; 
            transform: scale(1) translate(var(--moveX), var(--moveY));
          }
          50% { 
            opacity: 0.5; 
            transform: scale(1.1) translate(var(--moveX), var(--moveY));
          }
        }
        
        @keyframes starTwinkle2 {
          0%, 100% { 
            opacity: 0.4; 
            transform: scale(1) translate(var(--moveX), var(--moveY));
          }
          50% { 
            opacity: 0.8; 
            transform: scale(1.15) translate(var(--moveX), var(--moveY));
          }
        }
        
        @keyframes starTwinkle3 {
          0%, 100% { 
            opacity: 0.6; 
            transform: scale(1) translate(var(--moveX), var(--moveY));
          }
          50% { 
            opacity: 1; 
            transform: scale(1.2) translate(var(--moveX), var(--moveY));
          }
        }
      `}</style>
    </div>
  );
}; 