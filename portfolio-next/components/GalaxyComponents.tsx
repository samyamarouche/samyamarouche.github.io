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

  const handleStarSystemClick = (starSystem: StarSystem) => {
    setSelectedStarSystem(starSystem);
    onStarSystemClick(starSystem);
  };

  return (
    <div 
      className={`galaxy-container relative transition-all duration-500 ${
        isSelected ? 'scale-110' : 'scale-100'
      }`}
      style={{
        transform: `translate3d(${galaxy.coordinates.x}px, ${galaxy.coordinates.y}px, ${galaxy.coordinates.z}px)`
      }}
    >
      {/* Galaxy Label */}
      <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-20">
        <span className="text-gray-400 dark:text-gray-500 text-xs font-mono tracking-wider uppercase">
          {galaxy.label}
        </span>
      </div>

      {/* Galaxy Core */}
      <div
        className={`galaxy-core relative cursor-pointer transition-all duration-700 ${
          isSelected ? 'animate-pulse' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onSelect}
        style={{
          background: `radial-gradient(circle, ${galaxy.color}40 0%, ${galaxy.color}20 50%, transparent 100%)`,
          boxShadow: isHovered || isSelected 
            ? `0 0 60px ${galaxy.color}60, 0 0 120px ${galaxy.color}30` 
            : `0 0 30px ${galaxy.color}40, 0 0 60px ${galaxy.color}20`
        }}
      >
        <div className="w-32 h-32 rounded-full flex items-center justify-center">
          <div 
            className="w-24 h-24 rounded-full bg-gradient-to-br from-white/20 to-transparent backdrop-blur-sm border border-white/30"
            style={{
              background: `radial-gradient(circle, ${galaxy.color}60 0%, ${galaxy.color}30 50%, transparent 100%)`
            }}
          >
            <div className="w-full h-full rounded-full flex items-center justify-center">
              <span className="text-white/90 font-bold text-sm text-center leading-tight">
                {galaxy.name.split(' ').map(word => word[0]).join('')}
              </span>
            </div>
          </div>
        </div>

        {/* Galaxy Name Tooltip */}
        {isHovered && (
          <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 z-30">
            <div className="bg-black/80 backdrop-blur-md text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap">
              {galaxy.name}
            </div>
          </div>
        )}
      </div>

      {/* Star Systems */}
      {isSelected && (
        <div className="absolute inset-0 z-10">
          {galaxy.starSystems.map((starSystem, index) => (
            <StarSystemComponent
              key={starSystem.id}
              starSystem={starSystem}
              onClick={() => handleStarSystemClick(starSystem)}
              isSelected={selectedStarSystem?.id === starSystem.id}
              galaxyColor={galaxy.color}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const StarSystemComponent: React.FC<StarSystemProps> = ({ 
  starSystem, 
  onClick, 
  isSelected, 
  galaxyColor 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  if (!starSystem.discovered) {
    return (
      <div 
        className="absolute cursor-pointer transition-all duration-300"
        style={{
          left: `${starSystem.coordinates.x}px`,
          top: `${starSystem.coordinates.y}px`,
          transform: `translateZ(${starSystem.coordinates.z}px)`
        }}
      >
        <div className="w-4 h-4 rounded-full bg-gray-600/50 border border-gray-500/30 animate-pulse">
          <div className="w-full h-full rounded-full bg-gray-400/20 animate-ping"></div>
        </div>
        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
          <span className="text-gray-500 text-xs font-mono">UNDISCOVERED</span>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="absolute cursor-pointer transition-all duration-500"
      style={{
        left: `${starSystem.coordinates.x}px`,
        top: `${starSystem.coordinates.y}px`,
        transform: `translateZ(${starSystem.coordinates.z}px) scale(${isSelected ? 1.2 : 1})`
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

      {/* Star System Name */}
      {isHovered && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 z-30">
          <div className="bg-black/80 backdrop-blur-md text-white text-xs px-2 py-1 rounded whitespace-nowrap">
            {starSystem.name}
          </div>
        </div>
      )}

      {/* Connection Line to Galaxy */}
      <svg 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: -1 }}
      >
        <line
          x1="50%"
          y1="50%"
          x2="0%"
          y2="0%"
          stroke={galaxyColor}
          strokeWidth="1"
          strokeOpacity="0.3"
          strokeDasharray="2,2"
        />
      </svg>
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