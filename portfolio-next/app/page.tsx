"use client";
import Image from "next/image";
import { AcademicCapIcon, BriefcaseIcon, ArrowDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useTheme } from "../components/ThemeProvider";
import { useEffect, useRef } from "react";
import { Clouds, DarkClouds } from "../components/CloudComponents";
import { parcours, experiences, personalInfo } from "../components/Data";

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
            <Image src={personalInfo.avatar} alt={personalInfo.name} width={160} height={160} className="object-cover w-full h-full" />
          </div>
          <h1 className={`text-5xl sm:text-6xl font-extrabold drop-shadow-lg text-center ${mainText}`}>{personalInfo.name}</h1>
          <h2 className={`text-2xl sm:text-3xl font-medium text-center ${mainText} opacity-80`}>{personalInfo.title}</h2>
          <p className={`text-center max-w-2xl mt-2 text-lg ${subText}`}>
            {personalInfo.description}
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
        © {new Date().getFullYear()} {personalInfo.name}
      </footer>
    </div>
  );
}
