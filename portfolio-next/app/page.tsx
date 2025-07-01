"use client";
import Image from "next/image";
import { AcademicCapIcon, BriefcaseIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTheme } from "../components/ThemeProvider";
import { useEffect, useRef } from "react";

const parcours = [
  { titre: "DUT (IUT Orsay - Paris Sacly)", dates: "2020 à 2022" },
  { titre: "Ecole d'ingé (Polytech Paris Sacly)", dates: "2022 à 2023" },
  { titre: "BUT (IUT Orsay - Paris Saclay)", dates: "2023 à 2024" },
  { titre: "Master 1 (URCA - Reims)", dates: "2024 à 2025" },
];
const experiences = [
  { titre: "Python Emulation de logiciel de vol (CNRS/LMD/Polytechnique)", dates: "2022 | 9 semaines" },
  { titre: "Outils de prediction de trajectoire de ballon meteo (CNRS/LMD/Polytechnique)", dates: "2023 | 9 semaines" },
  { titre: "Développement de module odoo (Primti)", dates: "2024 | 11 semaines" },
  { titre: "Outils de prediction de trajectoire de ballon meteo (suite)", dates: "2024 | 9 semaines" },
  { titre: "Outils de prediction de trajectoire de ballon meteo (suite)", dates: "2025 | 12 semaines" },
];

// CloudWaveSVG: a keynote-style cloud wave
function CloudWaveSVG({ style, className }: { style?: React.CSSProperties; className?: string }) {
  return (
    <svg
      viewBox="0 0 3200 1000"
      width="3200"
      height="1000"
      style={style}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cloudInnerPink" x1="0" y1="200" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
          <stop offset="-10%" stopColor="#ff7fcf" stopOpacity="0.05" />
          <stop offset="0%" stopColor="#ff7fcf" stopOpacity="0.05" />
          <stop offset="30%" stopColor="#ffb3de" stopOpacity="0.08" />
          <stop offset="60%" stopColor="#fff" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Main white cloud */}
      <path
        d="M0,200
          C400,400 400,0 800,200
          S1200,400 1600,200
          S2000,0 2400,200
          S2800,400 3200,200
          V1000 H0 Z"
        fill="#fff"
        stroke="#fff"
        strokeWidth="12"
        opacity="0.98"
        style={{ filter: 'drop-shadow(0 -24px 64px #e0eafc88)' }}
      />
      {/* More visible pink highlight inside the cloud */}
      <path
        d="M0,200
          C400,400 400,0 800,200
          S1200,400 1600,200
          S2000,0 2400,200
          S2800,400 3200,200
          V1000 H0 Z"
        fill="url(#cloudInnerPink)"
        opacity="0.85"
      />
    </svg>
  );
}

function Clouds() {
  // Only render in light mode
  return (
    <CloudWaveSVG className="cloud-wave-svg animate-cloud-wave" style={{ position: 'fixed', bottom: '0', left: '-400px', width: '3200px', height: '1000px', zIndex: 0, opacity: 0.98, pointerEvents: 'none' }} />
  );
}

function DarkCloudWaveSVG({ style, className }: { style?: React.CSSProperties; className?: string }) {
  return (
    <svg
      viewBox="0 0 3200 1000"
      width="3200"
      height="1000"
      style={style}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cloudInnerDark" x1="0" y1="200" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
          <stop offset="-10%" stopColor="#4a4a6a" stopOpacity="0.15" />
          <stop offset="0%" stopColor="#4a4a6a" stopOpacity="0.15" />
          <stop offset="30%" stopColor="#3a3a5a" stopOpacity="0.20" />
          <stop offset="60%" stopColor="#2a2a4a" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#1a1a3a" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Main dark cloud */}
      <path
        d="M0,200
          C400,400 400,0 800,200
          S1200,400 1600,200
          S2000,0 2400,200
          S2800,400 3200,200
          V1000 H0 Z"
        fill="#2a2a4a"
        stroke="#2a2a4a"
        strokeWidth="12"
        opacity="0.85"
        style={{ filter: 'drop-shadow(0 -24px 64px rgba(0,0,0,0.4))' }}
      />
      {/* Dark highlight inside the cloud */}
      <path
        d="M0,200
          C400,400 400,0 800,200
          S1200,400 1600,200
          S2000,0 2400,200
          S2800,400 3200,200
          V1000 H0 Z"
        fill="url(#cloudInnerDark)"
        opacity="0.90"
      />
    </svg>
  );
}

function DarkClouds() {
  // Dark mode clouds using the same wave structure as light mode
  return (
    <DarkCloudWaveSVG className="dark-cloud-wave-svg animate-cloud-wave" style={{ position: 'fixed', bottom: '0', left: '-400px', width: '3200px', height: '1000px', zIndex: 0, opacity: 0.75, pointerEvents: 'none' }} />
  );
}

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  // Utilitaire pour le texte principal
  const mainText = theme === "light" ? "text-black" : "text-white";
  const subText = theme === "light" ? "text-black/70" : "text-white/70";

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-x-hidden bg-gradient-to-b from-[#0a0a23] to-[#23234a] dark:from-[#0a0a23] dark:to-[#23234a] transition-colors duration-500">
      {/* Effet étoilé/nuageux à ajouter ici */}
      <div className="absolute inset-0 z-0 pointer-events-none" id="background-effect">
        {theme === "light" && <Clouds />}
        {theme === "dark" && <DarkClouds />}
      </div>
      {/* Navigation sticky */}
      <nav className="fixed top-0 left-0 w-full z-20 bg-white/30 dark:bg-black/30 backdrop-blur-md shadow-md flex justify-center py-2 gap-8">
        <a href="#hero" className={`text-lg font-bold hover:underline ${mainText}`}>Accueil</a>
        <a href="#parcours" className={`text-lg font-bold hover:underline ${mainText}`}>Parcours</a>
        <a href="#experiences" className={`text-lg font-bold hover:underline ${mainText}`}>Expériences</a>
        <a href="#projets" className={`text-lg font-bold hover:underline ${mainText}`}>Projets</a>
        <button
          className="ml-4 px-3 py-1 rounded-full bg-white/40 dark:bg-black/40 border border-white/30 dark:border-black/30 shadow hover:bg-white/60 dark:hover:bg-black/60 transition"
          onClick={toggleTheme}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </nav>
      {/* Hero Section */}
      <section id="hero" className="w-full flex flex-col items-center justify-center pt-32 pb-16 z-10">
        <div className="relative flex flex-col items-center gap-6 fade-in">
          <div className="rounded-full border-4 border-white/40 shadow-xl overflow-hidden w-40 h-40 bg-white/10 backdrop-blur-md">
            <Image src="/avatar.png" alt="Samy Amarouche" width={160} height={160} className="object-cover w-full h-full" />
          </div>
          <h1 className={`text-5xl sm:text-6xl font-extrabold drop-shadow-lg text-center ${mainText}`}>Samy Amarouche</h1>
          <h2 className={`text-2xl sm:text-3xl font-medium text-center ${mainText} opacity-80`}>Développeur IA & passionné de météo</h2>
          <p className={`text-center max-w-2xl mt-2 text-lg ${subText}`}>
            Master 1 (IA) en cours, passionné par la météorologie et la simulation de vie artificielle. Futur doctorant.
          </p>
          <a href="#parcours" className={`mt-4 px-6 py-3 rounded-full bg-white/30 backdrop-blur-md font-semibold shadow-lg border border-white/30 hover:bg-white/50 transition text-lg flex items-center gap-2 ${mainText}`}>
            Découvrir mon parcours <ArrowDownIcon className="w-6 h-6" />
          </a>
        </div>
      </section>
      {/* Parcours scolaire */}
      <section id="parcours" className="w-full max-w-5xl mx-auto px-4 py-16 z-10">
        <h3 className={`flex items-center gap-2 text-3xl font-bold mb-8 fade-in ${mainText}`}>
          <AcademicCapIcon className="w-8 h-8 text-pink-400 dark:text-white/80" /> Parcours scolaire
        </h3>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {parcours.map((item, i) => (
            <div key={i} className={`glass p-6 shadow-xl font-semibold fade-in ${mainText}`}>
              <div className="font-bold text-lg mb-2">{item.titre}</div>
              <div className={`text-sm ${subText}`}>{item.dates}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Expériences */}
      <section id="experiences" className="w-full max-w-5xl mx-auto px-4 py-16 z-10">
        <h3 className={`flex items-center gap-2 text-3xl font-bold mb-8 fade-in ${mainText}`}>
          <BriefcaseIcon className="w-8 h-8 text-pink-400 dark:text-white/80" /> Stages & CDD
        </h3>
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {experiences.map((item, i) => (
            <div key={i} className={`glass p-6 shadow-xl font-semibold fade-in ${mainText}`}>
              <div className="font-bold text-lg mb-2">{item.titre}</div>
              <div className={`text-sm ${subText}`}>{item.dates}</div>
            </div>
          ))}
        </div>
      </section>
      {/* Projets d'étude (à compléter) */}
      <section id="projets" className="w-full max-w-5xl mx-auto px-4 py-16 z-10">
        <h3 className={`flex items-center gap-2 text-3xl font-bold mb-8 fade-in ${mainText}`}>
          <ArrowDownIcon className="w-8 h-8 text-pink-400 dark:text-white/80" /> Projets d'étude
        </h3>
        <div className={`glass p-6 shadow-xl font-semibold fade-in ${mainText}`}>
          <div className="font-semibold">À venir…</div>
          <div className={`text-sm ${subText}`}>Section à compléter</div>
        </div>
      </section>
      <footer className="w-full text-center text-black/60 dark:text-white/60 py-8 z-10">
        © {new Date().getFullYear()} Samy Amarouche
      </footer>
    </div>
  );
}
