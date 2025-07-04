import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'weather' | 'cosmic';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check localStorage for theme preference
  const getInitialTheme = (): Theme => {
    if (typeof window !== 'undefined') {
      const cached = localStorage.getItem('theme');
      if (cached === 'weather' || cached === 'cosmic') return cached as Theme;
    }
    return 'weather';
  };
  const [theme, setTheme] = useState<Theme>(getInitialTheme());

  useEffect(() => {
    // Add no-theme-transition on first render
    document.body.classList.add('no-theme-transition');
    // Remove it after hydration (next tick)
    setTimeout(() => {
      document.body.classList.remove('no-theme-transition');
    }, 50);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    
    if (theme === 'cosmic') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};