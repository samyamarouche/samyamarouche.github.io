"use client";
import React, { useState, useEffect } from 'react';
import { Galaxy, StarSystem } from './Data';

interface GalaxyProps {
  galaxy: Galaxy;
  onStarSystemClick: (starSystem: StarSystem) => void;
  isSelected: boolean;
  onSelect: () => void;
}

interface StarSystemProps {
  starSystem: StarSystem;
  onClick: () => void;
  isSelected: boolean;
  galaxyColor: string;
}

export const GalaxyComponent: React.FC<GalaxyProps> = ({ 
  galaxy, 
  onStarSystemClick, 
  isSelected, 
  onSelect 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedStarSystem, setSelectedStarSystem] = useState<StarSystem | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showStarSystems, setShowStarSystems] = useState(false);
  const [galaxyFade, setGalaxyFade] = useState(1);

  const handleStarSystemClick = (starSystem: StarSystem) => {
    setSelectedStarSystem(starSystem);
    onStarSystemClick(starSystem);
  };

  // Effet de zoom progressif et disparition de la galaxie
  useEffect(() => {
    if (isSelected) {
      let fadeTimeout: NodeJS.Timeout;
      // Animation de zoom rapide
      const zoomInterval = setInterval(() => {
        setZoomLevel(prev => {
          if (prev < 3) {
            return prev + 0.1;
          } else {
            clearInterval(zoomInterval);
            // Commencer à faire disparaître la galaxie
            fadeTimeout = setTimeout(() => setGalaxyFade(0), 200);
            setShowStarSystems(true);
            return 3;
          }
        });
      }, 50);
      return () => {
        clearInterval(zoomInterval);
        clearTimeout(fadeTimeout);
      };
    } else {
      setZoomLevel(1);
      setGalaxyFade(1);
      setShowStarSystems(false);
    }
  }, [isSelected]);

  return (
    <div
      className="galaxy-container absolute"
      style={{
        transform: `translate3d(${galaxy.coordinates.x}px, ${galaxy.coordinates.y}px, ${galaxy.coordinates.z}px) scale(${zoomLevel})`,
        transformStyle: 'preserve-3d',
        zIndex: isSelected ? 20 : 10,
        pointerEvents: isSelected || isHovered ? 'auto' : 'auto',
      }}
    >
      {/* Systèmes stellaires en arrière-plan */}
      <div className="absolute inset-0 flex items-center justify-center z-0" style={{ opacity: showStarSystems ? 1 : 0, transition: 'opacity 0.7s' }}>
        {showStarSystems && (
          <div className="relative w-full h-full">
            {galaxy.starSystems.map((starSystem, index) => (
              <StarSystemComponent
                key={starSystem.id}
                starSystem={starSystem}
                onClick={() => handleStarSystemClick(starSystem)}
                isSelected={selectedStarSystem?.id === starSystem.id}
                galaxyColor={galaxy.color}
                index={index}
                totalSystems={galaxy.starSystems.length}
              />
            ))}
          </div>
        )}
      </div>

      {/* Galaxie circulaire au premier plan */}
      <div
        className="galaxy-core relative flex items-center justify-center cursor-pointer transition-all duration-700"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onSelect}
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
        <div className="absolute inset-0 rounded-full animate-spin-slow" style={{
          background: `conic-gradient(from 0deg, transparent 0deg, ${galaxy.color}20 60deg, transparent 120deg, ${galaxy.color}30 180deg, transparent 240deg, ${galaxy.color}20 300deg, transparent 360deg)`
        }} />
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

      {/* Particules de voyage spatial pendant le zoom */}
      {isSelected && zoomLevel > 1 && zoomLevel < 3 && (
        <div className="absolute inset-0 z-5 pointer-events-none">
          {Array.from({ length: 30 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full space-travel-particle"
              style={{
                left: `${50 + (i % 10 - 5) * 10}%`,
                top: `${50 + (Math.floor(i / 10) - 1) * 10}%`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: `${1.5 + (i % 3) * 0.5}s`,
                opacity: 0.4 + (i % 6) * 0.1
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const StarSystemComponent: React.FC<StarSystemProps & { index: number; totalSystems: number }> = ({ 
  starSystem, 
  onClick, 
  isSelected, 
  galaxyColor,
  index,
  totalSystems
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Les systèmes sont déjà masqués/affichés par le parent
  if (!starSystem.discovered) {
    return null;
  }

  // Placement circulaire autour du centre
  const angle = (index / totalSystems) * 2 * Math.PI;
  const radius = 120;
  const x = 90 + radius * Math.cos(angle);
  const y = 90 + radius * Math.sin(angle);

  return (
    <div
      className="absolute cursor-pointer transition-all duration-500"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        zIndex: 1,
        transform: `scale(${isSelected ? 1.2 : 1})`
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Star System Core */}
      <div
        className={`w-6 h-6 rounded-full transition-all duration-300 ${
          isSelected ? 'animate-pulse' : ''
        }`}
        style={{
          background: `radial-gradient(circle, ${starSystem.color} 0%, ${starSystem.color}80 50%, transparent 100%)`,
          boxShadow: isHovered || isSelected
            ? `0 0 20px ${starSystem.color}80, 0 0 40px ${starSystem.color}40`
            : `0 0 10px ${starSystem.color}60, 0 0 20px ${starSystem.color}30`
        }}
      >
        <div className="w-full h-full rounded-full bg-white/20 animate-ping"></div>
      </div>
      {/* Star System Name - Centré sur le système */}
      <div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
        <div className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white font-mono text-xs whitespace-nowrap">
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