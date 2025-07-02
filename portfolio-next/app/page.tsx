"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "../components/ThemeProvider";
import { galaxies, personalInfo, StarSystem } from "../components/Data";
import { GalaxyComponent, StarSystemModal } from "../components/GalaxyComponents";
import { StarField } from "../components/StarField";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [selectedGalaxy, setSelectedGalaxy] = useState<string | null>(null);
  const [selectedStarSystem, setSelectedStarSystem] = useState<StarSystem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 0 });

  // Utility for text colors
  const mainText = theme === "light" ? "text-white" : "text-white";
  const subText = theme === "light" ? "text-white/70" : "text-white/70";

  const handleGalaxySelect = (galaxyId: string) => {
    // Prevent deselecting if a star system is selected (modal open)
    if (isModalOpen) return;
    // Prevent unzooming by clicking the selected galaxy
    if (selectedGalaxy === galaxyId) return;
    setSelectedGalaxy(galaxyId);
  };

  const handleStarSystemClick = (starSystem: StarSystem) => {
    setSelectedStarSystem(starSystem);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStarSystem(null);
    // Do not deselect the galaxy here, so focus remains
    // setSelectedGalaxy(null);
  };

  // Camera movement effect - partagé entre les galaxies et les étoiles
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setCameraPosition({ x, y, z: 0 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Calculate center of the galaxy map area
  const mapWidth = 1000; // adjust as needed
  const mapHeight = 600;
  const centerX = mapWidth / 2;
  const centerY = mapHeight / 2;

  // Calculate offset to center the selected galaxy
  let focusOffset = { x: 0, y: 0 };
  if (selectedGalaxy) {
    const galaxy = galaxies.find(g => g.id === selectedGalaxy);
    if (galaxy) {
      focusOffset = {
        x: centerX - galaxy.coordinates.x,
        y: centerY - galaxy.coordinates.y
      };
    }
  }

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-[#0a0a23] to-[#1a1a4a] transition-colors duration-500">
      {/* Space Background with StarField */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a23] via-[#1a1a4a] to-[#2a2a6a]"></div>
        <StarField cameraPosition={cameraPosition} />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full z-20 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <span className={`text-lg font-bold ${mainText} font-mono`}>
              SAMY AMAROUCHE
            </span>
            <div className="flex gap-6">
              <button className={`text-sm font-mono hover:text-blue-400 transition-colors ${mainText}`}>
                GALAXIES
              </button>
              <button className={`text-sm font-mono hover:text-blue-400 transition-colors ${mainText}`}>
                SYSTEMS
              </button>
              <button className={`text-sm font-mono hover:text-blue-400 transition-colors ${mainText}`}>
                DISCOVERIES
              </button>
            </div>
          </div>
          <button
            className="px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 text-white font-mono text-sm"
            onClick={toggleTheme}
          >
            {theme === "dark" ? "☀️ LIGHT" : "🌙 DARK"}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-8">
        {/* Hero Section */}
        <section className="text-center mb-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="relative mb-8">
              <div className="w-32 h-32 mx-auto rounded-full border-4 border-blue-400/30 overflow-hidden bg-gradient-to-br from-blue-400/20 to-purple-400/20 backdrop-blur-sm">
                <Image 
                  src={personalInfo.avatar} 
                  alt={personalInfo.name} 
                  width={128} 
                  height={128} 
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="absolute inset-0 rounded-full border-2 border-blue-400/50 animate-ping"></div>
            </div>
            <h1 className={`text-5xl sm:text-6xl font-bold mb-4 ${mainText} font-mono tracking-wider`}>
              {personalInfo.name}
            </h1>
            <h2 className={`text-xl sm:text-2xl font-medium mb-6 ${subText} font-mono`}>
              {personalInfo.title}
            </h2>
            <p className={`text-lg mb-8 ${subText} max-w-2xl mx-auto leading-relaxed`}>
              {personalInfo.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center text-sm font-mono">
              <span className={`${subText} px-4 py-2 bg-white/5 rounded-lg border border-white/10`}>
                {personalInfo.coordinates}
              </span>
              <span className={`${subText} px-4 py-2 bg-white/5 rounded-lg border border-white/10`}>
                {personalInfo.discoveryDate}
              </span>
            </div>
          </div>
        </section>

        {/* Galaxy Map */}
        <section className="relative px-4">
          <div className="max-w-7xl mx-auto">
            <h3 className={`text-3xl font-bold mb-12 text-center ${mainText} font-mono tracking-wider`}>
              GALAXY MAP
            </h3>
            
            {/* Galaxy Container with 3D Perspective */}
            <div 
              className="relative w-full h-[600px] perspective-1000"
              style={{
                transform: `translate3d(${-cameraPosition.x * 1}px, ${-cameraPosition.y * 1}px, 0px)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {(selectedGalaxy || isModalOpen) && (
                <button
                  className="absolute top-4 right-8 z-30 px-4 py-2 rounded-lg bg-white/20 hover:bg-white/40 text-black font-mono font-bold shadow-lg border border-white/30 transition-all"
                  onClick={() => {
                    setSelectedGalaxy(null);
                    setIsModalOpen(false);
                    setSelectedStarSystem(null);
                  }}
                >
                  ⬅️ Zoom Out
                </button>
              )}
              {galaxies.map((galaxy) => {
                // Calculate transform for each galaxy
                let transform = '';
                let anotherGalaxySelected = false;
                if (selectedGalaxy) {
                  if (galaxy.id === selectedGalaxy) {
                    // Move selected galaxy to center
                    transform = `translate(${focusOffset.x}px, ${focusOffset.y}px) scale(1.2)`;
                  } else {
                    // Move other galaxies away from the center, proportional to their distance from the selected galaxy
                    const dx = galaxy.coordinates.x - (galaxies.find(g => g.id === selectedGalaxy)?.coordinates.x || 0);
                    const dy = galaxy.coordinates.y - (galaxies.find(g => g.id === selectedGalaxy)?.coordinates.y || 0);
                    transform = `translate(${focusOffset.x + dx * 1.5}px, ${focusOffset.y + dy * 1.5}px) scale(0.8)`;
                    anotherGalaxySelected = true;
                  }
                }
                return (
                  <GalaxyComponent
                    key={galaxy.id}
                    galaxy={galaxy}
                    onStarSystemClick={handleStarSystemClick}
                    isSelected={selectedGalaxy === galaxy.id}
                    onSelect={() => handleGalaxySelect(galaxy.id)}
                    extraTransform={transform}
                    anotherGalaxySelected={anotherGalaxySelected}
                  />
                );
              })}
            </div>

            {/* Galaxy Legend */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
              {galaxies.map((galaxy) => (
                <div 
                  key={galaxy.id}
                  className={"p-6 rounded-2xl backdrop-blur-md border border-white/10 transition-all duration-300 cursor-pointer bg-white/5 hover:bg-white/8"}
                  onClick={() => handleGalaxySelect(galaxy.id)}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div 
                      className="w-8 h-8 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${galaxy.color} 0%, ${galaxy.color}80 50%, transparent 100%)`,
                        boxShadow: `0 0 20px ${galaxy.color}60`
                      }}
                    />
                    <h4 className={`text-lg font-bold ${mainText} font-mono`}>
                      {galaxy.name}
                    </h4>
                  </div>
                  <p className={`text-sm ${subText} leading-relaxed`}>
                    {galaxy.description}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <span className={`text-xs font-mono ${subText}`}>
                      {galaxy.starSystems.filter(sys => sys.discovered).length} DISCOVERED
                    </span>
                    <span className={`text-xs font-mono ${subText}`}>
                      {galaxy.starSystems.length} TOTAL
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-24 text-center py-8 border-t border-white/10">
          <p className={`text-sm font-mono ${subText}`}>
            © {new Date().getFullYear()} {personalInfo.name} | EXPLORING THE DIGITAL UNIVERSE
          </p>
        </footer>
      </div>

      {/* Star System Modal */}
      <StarSystemModal
        starSystem={selectedStarSystem}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
}
