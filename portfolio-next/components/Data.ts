// ===== NO MAN'S SKY PORTFOLIO DATA =====

export interface StarSystem {
  id: string;
  name: string;
  type: 'education' | 'internship' | 'project';
  dates: string;
  description: string;
  technologies?: string[];
  achievements?: string[];
  coordinates: {
    x: number;
    y: number;
    z: number;
  };
  discovered: boolean;
  color: string;
}

export interface Galaxy {
  id: string;
  name: string;
  label: string; // Grey text label above galaxy
  description: string;
  starSystems: StarSystem[];
  coordinates: {
    x: number;
    y: number;
    z: number;
  };
  color: string;
  discovered: boolean;
}

export const galaxies: Galaxy[] = [
  {
    id: "education-galaxy",
    name: "Galaxy of Knowledge",
    label: "EDUCATION & ACADEMIC JOURNEY",
    description: "A vast galaxy containing star systems representing my educational path through various institutions and degrees.",
    color: "#4A90E2",
    discovered: true,
    coordinates: { x: 0, y: 0, z: 0 },
    starSystems: [
      {
        id: "dut-system",
        name: "DUT System",
        type: "education",
        dates: "2020 - 2022",
        description: "DUT Informatique at IUT Orsay - Paris Saclay. Specialized in web development and applications.",
        technologies: ["Java", "Web Development", "Databases"],
        achievements: ["Diploma obtained", "Web development specialization"],
        coordinates: { x: 100, y: 50, z: 25 },
        discovered: true,
        color: "#64B5F6"
      },
      {
        id: "engineering-system",
        name: "Engineering Star",
        type: "education",
        dates: "2022 - 2023",
        description: "Engineering School at Polytech Paris Saclay. Focus on AI and systems engineering.",
        technologies: ["AI", "Machine Learning", "Systems Engineering"],
        achievements: ["Engineering degree", "AI specialization"],
        coordinates: { x: 200, y: 75, z: 50 },
        discovered: true,
        color: "#42A5F5"
  },
  { 
        id: "but-system",
        name: "BUT Nebula",
        type: "education",
        dates: "2023 - 2024",
        description: "Bachelor Universitaire de Technologie at IUT Orsay - Paris Saclay. Computer science and networks.",
        technologies: ["Networks", "Computer Science", "Advanced Programming"],
        achievements: ["BUT degree", "Network specialization"],
        coordinates: { x: 150, y: 100, z: 75 },
        discovered: true,
        color: "#2196F3"
  },
  { 
        id: "master-system",
        name: "Master's Constellation",
        type: "education",
        dates: "2024 - 2025",
        description: "Master 1 in Artificial Intelligence and Data Science at URCA - Reims.",
        technologies: ["AI", "Data Science", "Machine Learning", "Deep Learning"],
        achievements: ["Master's degree in progress", "AI specialization"],
        coordinates: { x: 250, y: 125, z: 100 },
        discovered: true,
        color: "#1976D2"
      }
    ]
  },
  {
    id: "internship-galaxy",
    name: "Galaxy of Experience",
    label: "INTERNSHIPS & PROFESSIONAL EXPERIENCE",
    description: "A dynamic galaxy showcasing my professional experiences through various internships and research positions.",
    color: "#FF6B6B",
    discovered: true,
    coordinates: { x: 500, y: 0, z: 0 },
    starSystems: [
      {
        id: "cnrs-flight-system",
        name: "Flight Simulation Star",
        type: "internship",
        dates: "2022 | 9 weeks",
        description: "Python flight software emulation at CNRS/LMD/Polytechnique. Development of meteorological simulation tools.",
        technologies: ["Python", "Meteorology", "Simulation", "Scientific Computing"],
        achievements: ["Meteorological tools developed", "Research contribution"],
        coordinates: { x: 600, y: 50, z: 25 },
        discovered: true,
        color: "#FF8A80"
  },
  { 
        id: "cnrs-prediction-system",
        name: "Prediction Nebula",
        type: "internship",
        dates: "2023 | 9 weeks",
        description: "Weather balloon trajectory prediction tools at CNRS/LMD/Polytechnique. Advanced prediction algorithms.",
        technologies: ["Python", "Algorithms", "Prediction Models", "Meteorology"],
        achievements: ["Prediction algorithms created", "Trajectory modeling"],
        coordinates: { x: 700, y: 75, z: 50 },
        discovered: true,
        color: "#FF5252"
      },
      {
        id: "primti-system",
        name: "Odoo Development Star",
        type: "internship",
        dates: "2024 | 11 weeks",
        description: "Odoo module development at Primti. Business process automation and ERP customization.",
        technologies: ["Odoo", "Python", "ERP", "Business Automation"],
        achievements: ["Odoo modules developed", "Process automation"],
        coordinates: { x: 650, y: 100, z: 75 },
        discovered: true,
        color: "#D32F2F"
      },
      {
        id: "cnrs-continuation-system",
        name: "Advanced Prediction Cluster",
        type: "internship",
        dates: "2024 | 9 weeks",
        description: "Continuation of weather balloon prediction tools. Optimization and improvement of existing systems.",
        technologies: ["Python", "Optimization", "Meteorology", "Advanced Algorithms"],
        achievements: ["System optimization", "Performance improvements"],
        coordinates: { x: 750, y: 125, z: 100 },
        discovered: true,
        color: "#B71C1C"
  },
  { 
        id: "cnrs-final-system",
        name: "Final Deployment Star",
        type: "internship",
        dates: "2025 | 12 weeks",
        description: "Finalization and deployment of meteorological prediction systems for research applications.",
        technologies: ["Python", "Deployment", "Research Tools", "Meteorology"],
        achievements: ["System deployment", "Research contribution"],
        coordinates: { x: 800, y: 150, z: 125 },
        discovered: false,
        color: "#8D1B1B"
      }
    ]
  },
  {
    id: "projects-galaxy",
    name: "Galaxy of Innovation",
    label: "PROJECTS & PERSONAL ENDEAVORS",
    description: "A creative galaxy containing personal projects, research initiatives, and innovative developments.",
    color: "#4CAF50",
    discovered: true,
    coordinates: { x: 0, y: 500, z: 0 },
    starSystems: [
      {
        id: "ai-research-system",
        name: "AI Research Cluster",
        type: "project",
        dates: "2024 - Present",
        description: "Research in artificial intelligence and machine learning applications for meteorological prediction.",
        technologies: ["AI", "Machine Learning", "Meteorology", "Research"],
        achievements: ["Research papers", "AI models developed"],
        coordinates: { x: 100, y: 550, z: 25 },
        discovered: true,
        color: "#66BB6A"
  },
  { 
        id: "weather-simulation-system",
        name: "Weather Simulation Star",
        type: "project",
        dates: "2023 - Present",
        description: "Advanced weather simulation and prediction models for atmospheric phenomena study.",
        technologies: ["Simulation", "Meteorology", "Python", "Scientific Computing"],
        achievements: ["Simulation models", "Research contribution"],
        coordinates: { x: 200, y: 575, z: 50 },
        discovered: true,
        color: "#4CAF50"
      },
      {
        id: "portfolio-system",
        name: "Portfolio Nebula",
        type: "project",
        dates: "2024 - Present",
        description: "Interactive portfolio website with No Man's Sky inspired design and modern web technologies.",
        technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
        achievements: ["Modern UI/UX", "Responsive design"],
        coordinates: { x: 150, y: 600, z: 75 },
        discovered: true,
        color: "#388E3C"
      },
      {
        id: "future-research-system",
        name: "Future Research Star",
        type: "project",
        dates: "2025 - Future",
        description: "Future doctoral research in artificial intelligence and meteorological applications.",
        technologies: ["AI", "Research", "Meteorology", "Doctoral Studies"],
        achievements: ["Research proposal", "Academic preparation"],
        coordinates: { x: 250, y: 625, z: 100 },
        discovered: false,
        color: "#2E7D32"
      }
    ]
  }
];

export const personalInfo = {
  name: "Samy Amarouche",
  title: "AI Developer & Weather Enthusiast",
  description: "Master 1 (AI) in progress, passionate about meteorology and artificial life simulation. Future PhD candidate.",
  avatar: "/avatar.png",
  coordinates: "Galaxy: Milky Way | System: Solar | Planet: Earth",
  discoveryDate: "1999 - Present"
}; 