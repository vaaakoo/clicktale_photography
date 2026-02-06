import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AIChatAssistant } from '../ui/AIChatAssistant';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.title = t('meta.title');
  }, [t, i18n.language]);

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300">
      <Navbar />
      <main className="flex-1 pt-20">{children}</main>
      <AIChatAssistant />
      <Footer />
    </div>
  );
};
