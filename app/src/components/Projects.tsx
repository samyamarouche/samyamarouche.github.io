import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { ExternalLink, Github, Cloud, Cpu, BarChart3, Zap } from 'lucide-react';

const Projects = () => {
  const { t } = useLanguage();
  const { theme } = useTheme();

  const projectsData = [
    {
      category: t('projects.weather'),
      projects: [
        {
          title: 'GFS Data Processor',
          description: 'Système avancé de traitement et d\'analyse des données GFS pour l\'amélioration des prévisions météorologiques.',
          technologies: ['Python', 'NumPy', 'Pandas', 'NetCDF4', 'Matplotlib'],
          features: [
            'Traitement automatisé des données GFS',
            'Visualisation interactive des modèles',
            'API REST pour l\'accès aux données',
            'Système d\'alertes météorologiques'
          ],
          icon: Cloud,
          status: 'Production',
          github: '#',
          demo: '#'
        },
        {
          title: 'Weather Balloon Analytics',
          description: 'Plateforme d\'analyse des données de ballons-sondes avec machine learning pour la prédiction atmosphérique.',
          technologies: ['R', 'Shiny', 'Machine Learning', 'Time Series', 'Statistics'],
          features: [
            'Analyse en temps réel des données ballons-sondes',
            'Modèles prédictifs avancés',
            'Interface web interactive',
            'Exportation de rapports automatisés'
          ],
          icon: BarChart3,
          status: 'Développement',
          github: '#',
          demo: '#'
        }
      ]
    },
    {
      category: t('projects.simulation'),
      projects: [
        {
          title: 'Artificial Life Ecosystem',
          description: 'Simulation complexe d\'écosystème de vie artificielle avec algorithmes évolutionnaires et réseaux de neurones.',
          technologies: ['C++', 'OpenGL', 'CUDA', 'Neural Networks', 'Genetic Algorithms'],
          features: [
            'Agents autonomes avec IA',
            'Évolution génétique en temps réel',
            'Environnement 3D interactif',
            'Métriques de performance avancées'
          ],
          icon: Cpu,
          status: 'Recherche',
          github: '#',
          demo: '#'
        },
        {
          title: 'Multi-Agent Weather Simulation',
          description: 'Simulation multi-agents pour modéliser les interactions atmosphériques complexes.',
          technologies: ['Java', 'JADE', 'Machine Learning', 'Parallel Computing'],
          features: [
            'Agents météorologiques intelligents',
            'Simulation parallèle haute performance',
            'Apprentissage adaptatif',
            'Visualisation 3D des résultats'
          ],
          icon: Zap,
          status: 'Prototype',
          github: '#',
          demo: '#'
        }
      ]
    }
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
          {t('projects.title')}
        </h2>
        {/* No projects to display for now */}
      </div>
    </section>
  );
};

export default Projects;