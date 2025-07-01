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

function Clouds() {
  return (
    <>
      <div className="cloud cloud1" />
      <div className="cloud cloud2" />
      <div className="cloud cloud3" />
      <div className="cloud cloud4" />
    </>
  );
}

function ShootingStars() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    function spawnStar() {
      if (!ref.current) return;
      const star = document.createElement("div");
      star.className = "shooting-star";
      const fromTop = Math.random() < 0.5;
      let startX, startY, endX, endY;
      if (fromTop) {
        startX = Math.random() * window.innerWidth * 0.8;
        startY = 0;
        endX = startX + 300 + Math.random() * 200;
        endY = window.innerHeight * 0.7 + Math.random() * 100;
      } else {
        startX = 0;
        startY = Math.random() * window.innerHeight * 0.5;
        endX = window.innerWidth * 0.7 + Math.random() * 200;
        endY = startY + 300 + Math.random() * 100;
      }
      star.style.left = `${startX}px`;
      star.style.top = `${startY}px`;
      star.animate([
        { opacity: 0, transform: `translate(0,0) scaleX(0.5) rotate(-30deg)` },
        { opacity: 1, offset: 0.1 },
        { opacity: 0, transform: `translate(${endX - startX}px,${endY - startY}px) scaleX(1.2) rotate(-30deg)`, offset: 1 }
      ], {
        duration: 1200,
        easing: "linear",
        fill: "forwards"
      });
      ref.current.appendChild(star);
      setTimeout(() => star.remove(), 1200);
      timeout = setTimeout(spawnStar, 2000 + Math.random() * 3000);
    }
    spawnStar();
    return () => clearTimeout(timeout);
  }, []);
  return <div ref={ref} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 2 }} />;
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
        {theme === "dark" && <ShootingStars />}
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
