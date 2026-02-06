import React from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme } from './ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useTranslation();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t('nav.toggleTheme')}
      aria-pressed={theme === 'dark'}
      className="h-11 w-11 rounded-2xl border border-white/10 bg-white/70 dark:bg-slate-900/70 text-primary shadow-lg shadow-blue-500/10 backdrop-blur-md transition-all hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <span className="material-symbols-outlined !text-2xl">
        {theme === 'dark' ? 'light_mode' : 'dark_mode'}
      </span>
    </button>
  );
};
