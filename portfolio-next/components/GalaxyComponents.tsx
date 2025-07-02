"use client";
import React, { useState, useEffect } from 'react';
import { Galaxy, StarSystem } from './Data';

interface GalaxyProps {
  galaxy: Galaxy;
  onStarSystemClick: (starSystem: StarSystem) => void;
  isSelected: boolean;
  onSelect: () => void;
  extraTransform?: string;
  anotherGalaxySelected?: boolean;
}

interface StarSystemProps {
  starSystem: StarSystem;
  onClick: () => void;
  isSelected: boolean;
  galaxyColor: string;
  index: number;
  totalSystems: number;
  verticalStacked: boolean;
}

export const GalaxyComponent: React.FC<GalaxyProps> = ({ 
  galaxy, 
  onStarSystemClick, 
  isSelected, 
  onSelect, 
  extraTransform, 
  anotherGalaxySelected 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedStarSystem, setSelectedStarSystem] = useState<StarSystem | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showStarSystems, setShowStarSystems] = useState(false);
  const [galaxyFade, setGalaxyFade] = useState(1);
  const [isZoomedIn, setIsZoomedIn] = useState(false);

  const handleStarSystemClick = (starSystem: StarSystem) => {
    setSelectedStarSystem(starSystem);
    onStarSystemClick(starSystem);
  };

  // Effet de zoom progressif et disparition de la galaxie
  useEffect(() => {
    if (isSelected) {
      let fadeTimeout: NodeJS.Timeout;
      // Faster zoom animation with a slow start
      const zoomInterval = setInterval(() => {
        setZoomLevel(prev => {
          if (prev < 3) {
            return prev + 0.18; // was 0.1, now faster
          } else {
            clearInterval(zoomInterval);
            // Commencer à faire disparaître la galaxie
            fadeTimeout = setTimeout(() => setGalaxyFade(0), 150); // slightly faster fade
            setShowStarSystems(true);
            setIsZoomedIn(true);
            return 3;
          }
        });
      }, 32); // was 50ms, now faster
      return () => {
        clearInterval(zoomInterval);
        clearTimeout(fadeTimeout);
      };
    } else {
      setZoomLevel(1);
      setGalaxyFade(1);
      setShowStarSystems(false);
      setIsZoomedIn(false);
      setSelectedStarSystem(null);
    }
  }, [isSelected]);

  // Only show/interact with star systems when zoomed in or a star system is selected
  const canShowStarSystems = isSelected && (isZoomedIn || selectedStarSystem);

  return (
    <div
      className="galaxy-container absolute"
      style={{
        transform: `${extraTransform ? extraTransform + ' ' : ''}translate3d(${galaxy.coordinates.x}px, ${galaxy.coordinates.y}px, ${galaxy.coordinates.z}px) scale(${zoomLevel})`,
        transformStyle: 'preserve-3d',
        zIndex: isSelected ? 20 : 10,
        pointerEvents: anotherGalaxySelected && !isSelected ? 'none' : 'auto',
        transition: 'transform 0.45s cubic-bezier(0.6,0,0.2,1)'
      }}
      onClick={onSelect}
    >
      {/* Systèmes stellaires positionnés selon les coordonnées du data */}
      <div className="absolute inset-0 z-0" style={{ opacity: canShowStarSystems ? 1 : 0, transition: 'opacity 0.7s' }}>
        {canShowStarSystems && (
          <div className="relative w-full h-full" style={{height: '180px', width: '180px'}}>
            {(() => {
              const discovered = galaxy.starSystems.filter(s => s.discovered);
              if (discovered.length === 0) return null;
              // Calculer les coordonnées relatives
              const relCoords = discovered.map(s => ({
                x: s.coordinates.x,
                y: s.coordinates.y
              }));
              return discovered.map((starSystem, idx) => {
                const rel = relCoords[idx];
                const x = rel.x;
                const y = rel.y;
                return (
                  <div key={starSystem.id} style={{position: 'absolute', top: y, left: x, zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                    <StarSystemComponent
                      starSystem={starSystem}
                      onClick={() => handleStarSystemClick(starSystem)}
                      isSelected={selectedStarSystem?.id === starSystem.id}
                      galaxyColor={galaxy.color}
                      index={idx}
                      totalSystems={discovered.length}
                      verticalStacked={false}
                    />
                  </div>
                );
              });
            })()}
          </div>
        )}
      </div>

      {/* Galaxie circulaire au premier plan */}
      <div
        className="galaxy-core relative flex items-center justify-center cursor-pointer transition-all duration-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          width: 180,
          height: 180,
          borderRadius: '50%',
          opacity: galaxyFade,
          transition: 'opacity 0.7s, box-shadow 0.5s',
          boxShadow: isHovered || isSelected ? `0 0 80px ${galaxy.color}40, 0 0 160px ${galaxy.color}20` : `0 0 40px ${galaxy.color}30, 0 0 80px ${galaxy.color}15`,
          background: 'none',
        }}
      >
        {/* Bras spiraux et bulbe central */}
        {/* <div className="absolute inset-0 rounded-full animate-spin-slow" style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${galaxy.color}20 60deg, transparent 120deg, ${galaxy.color}30 180deg, transparent 240deg, ${galaxy.color}20 300deg, transparent 360deg)`
        }} /> */}
        <div className="absolute inset-4 rounded-full" style={{
          background: `radial-gradient(circle, ${galaxy.color}40 0%, ${galaxy.color}20 40%, transparent 70%)`,
          boxShadow: `inset 0 0 30px ${galaxy.color}20`
        }} />
        <div className="absolute inset-8 rounded-full flex items-center justify-center" style={{
          background: `radial-gradient(circle, ${galaxy.color}60 0%, ${galaxy.color}40 30%, ${galaxy.color}20 60%, transparent 100%)`,
          boxShadow: `0 0 20px ${galaxy.color}50, inset 0 0 15px ${galaxy.color}30`
        }}>
          {/* Texte intégré dans la galaxie */}
          <span className="text-white/90 font-bold text-lg font-mono tracking-wider text-center select-none pointer-events-none" style={{textShadow: `0 0 8px ${galaxy.color}80`}}>
            {galaxy.name}
          </span>
        </div>
        {/* Particules stellaires autour de la galaxie */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * Math.PI) / 4;
          const radius = 70;
          const left = 90 + radius * Math.cos(angle);
          const top = 90 + radius * Math.sin(angle);
          const animationDelay = i * 0.5;
          const animationDuration = 2 + (i % 3) + 0.5;
          const opacity = 0.6 + (i % 4) * 0.1;
          return (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full animate-pulse"
              style={{
                left: `${left}px`,
                top: `${top}px`,
                animationDelay: `${animationDelay}s`,
                animationDuration: `${animationDuration}s`,
                opacity: opacity
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export const StarSystemComponent: React.FC<StarSystemProps> = ({ 
  starSystem, 
  onClick,
  isSelected, 
  galaxyColor,
  index,
  totalSystems,
  verticalStacked
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Les systèmes sont déjà masqués/affichés par le parent
  if (!starSystem.discovered) {
    return null;
  }

  return (
    <div
      className="cursor-pointer transition-all duration-500"
      style={{
        zIndex: 1,
        transform: `scale(${isSelected ? 1.2 : 1})`
      }}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Star System Core */}
      <div
        className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
          isSelected ? 'animate-pulse' : ''
        }`}
        style={{
          background: `radial-gradient(circle, ${starSystem.color} 0%, ${starSystem.color}80 50%, transparent 100%)`,
          boxShadow: isHovered || isSelected
            ? `0 0 6px ${starSystem.color}80, 0 0 12px ${starSystem.color}40`
            : `0 0 3px ${starSystem.color}60, 0 0 6px ${starSystem.color}30`
        }}
      >
        <div className="w-full h-full rounded-full bg-white/20 animate-ping"></div>
      </div>
      {/* Star System Name - Even smaller */}
      <div className="absolute left-1/2 top-full mt-0.5 -translate-x-1/2 z-30 pointer-events-none">
        <div className="px-1.5 py-0.5 rounded bg-white/10 backdrop-blur-sm border border-white/20 text-white font-mono text-[10px] whitespace-nowrap shadow-lg">
          {starSystem.name}
        </div>
      </div>
    </div>
  );
};

// Star System Detail Modal Component
interface StarSystemModalProps {
  starSystem: StarSystem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StarSystemModal: React.FC<StarSystemModalProps> = ({ 
  starSystem, 
  isOpen, 
  onClose 
}) => {
  if (!starSystem || !isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/20">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
        >
          ✕
        </button>

        {/* Star System Header */}
        <div className="text-center mb-6">
          <div 
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{
              background: `radial-gradient(circle, ${starSystem.color} 0%, ${starSystem.color}80 50%, transparent 100%)`,
              boxShadow: `0 0 30px ${starSystem.color}60`
            }}
          >
            <span className="text-white font-bold text-lg">
              {starSystem.name.split(' ').map(word => word[0]).join('')}
            </span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            {starSystem.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
            {starSystem.dates}
          </p>
        </div>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
          {starSystem.description}
        </p>

        {/* Technologies */}
        {starSystem.technologies && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {starSystem.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {starSystem.achievements && (
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
              Achievements
            </h4>
            <ul className="space-y-2">
              {starSystem.achievements.map((achievement, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span className="text-gray-700 dark:text-gray-300 text-sm">
                    {achievement}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Coordinates */}
        <div className="text-xs text-gray-500 dark:text-gray-400 font-mono border-t border-gray-200 dark:border-gray-700 pt-4">
          Coordinates: {starSystem.coordinates.x}, {starSystem.coordinates.y}, {starSystem.coordinates.z}
        </div>
      </div>
    </div>
  );
}; 