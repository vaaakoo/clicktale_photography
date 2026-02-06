import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LanguageSwitcher } from '../ui/LanguageSwitcher';
import { ThemeToggle } from '../ui/ThemeToggle';

const mobileDelayClasses = ['delay-0', 'delay-75', 'delay-150', 'delay-200'];

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();
  const menuRef = useRef<HTMLElement | null>(null);
  const previouslyFocusedElement = useRef<HTMLElement | null>(null);

  const navLinks = useMemo(
    () => [
      { name: t('nav.home'), path: '/' },
      { name: t('nav.portfolio'), path: '/portfolio' },
      { name: t('nav.about'), path: '/about' },
      { name: t('nav.booking'), path: '/contact' },
    ],
    [t]
  );

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const body = document.body;
    if (isMenuOpen) {
      // Lock scroll to prevent double scroll (body + menu).
      previouslyFocusedElement.current = document.activeElement as HTMLElement | null;
      body.style.overflow = 'hidden';
      body.style.touchAction = 'none';
      requestAnimationFrame(() => {
        const focusable = menuRef.current?.querySelector<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        focusable?.focus();
      });
    } else {
      body.style.overflow = '';
      body.style.touchAction = '';
      previouslyFocusedElement.current?.focus();
    }
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setIsMenuOpen(false);
        return;
      }

      if (event.key !== 'Tab') {
        return;
      }

      // Trap focus within the open mobile menu.
      const focusableElements = menuRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusableElements || focusableElements.length === 0) {
        return;
      }

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isMenuOpen
          ? 'bg-white/95 dark:bg-[#0e1622]/95 shadow-lg shadow-black/5 backdrop-blur-xl border-b border-white/20 dark:border-white/5'
          : isScrolled
            ? 'bg-white/95 dark:bg-[#0e1622]/95 shadow-lg shadow-black/5 backdrop-blur-xl border-b border-white/20 dark:border-white/5'
            : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-10">
        <Link to="/" className="flex items-center gap-3 shrink-0" aria-label={t('nav.home')}>
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-blue-500/20">
            <span className="material-symbols-outlined !text-2xl">photo_camera</span>
          </div>
          <h2 className="text-[#111418] dark:text-white text-2xl font-black tracking-tight hidden sm:block">
            {t('brand.click')}<span className="text-primary">{t('brand.tale')}</span>
          </h2>
        </Link>

        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`relative text-sm font-bold tracking-wide transition-all hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary after:absolute after:-bottom-3 after:left-1/2 after:h-0.5 after:w-0 after:-translate-x-1/2 after:rounded-full after:bg-primary after:transition-all after:duration-300 ${
                isActive(link.path)
                  ? 'text-primary after:w-full'
                  : 'text-[#617289] dark:text-gray-300 hover:after:w-full'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <LanguageSwitcher />
          <ThemeToggle />
          <Link to="/contact" className="group" aria-label={t('nav.booking')}
          >
            <span className="flex h-12 items-center gap-2 rounded-2xl bg-primary px-8 text-sm font-black text-white shadow-xl shadow-blue-500/30 transition-all group-hover:-translate-y-0.5 group-hover:shadow-2xl active:scale-95">
              {t('nav.bookSession')}
              <span className="material-symbols-outlined !text-base transition-transform group-hover:translate-x-1">arrow_forward</span>
            </span>
          </Link>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <ThemeToggle />
          <button
            className={`flex h-12 w-12 items-center justify-center rounded-2xl transition-all active:scale-90 ${
              isMenuOpen
                ? 'bg-primary text-white shadow-lg shadow-blue-500/30'
                : 'bg-gray-100 dark:bg-slate-800 text-primary hover:bg-gray-200 dark:hover:bg-slate-700'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t('nav.toggleMenu')}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
          >
            <span className="material-symbols-outlined !text-3xl">{isMenuOpen ? 'close' : 'menu_open'}</span>
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 transition-all duration-500 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-md"
          onClick={() => setIsMenuOpen(false)}
          aria-hidden="true"
        />

        <nav
          id="mobile-nav"
          ref={menuRef}
          className={`absolute right-0 top-0 flex h-full w-full max-w-full flex-col gap-10 bg-white dark:bg-[#0e1622] p-8 shadow-2xl transition-transform duration-500 ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          aria-label={t('nav.mobileNavigation')}
        >
          <div className="flex items-center justify-between border-b border-gray-100 pb-4 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                <span className="material-symbols-outlined !text-2xl">photo_camera</span>
              </div>
              <span className="text-xl font-black text-gray-900 dark:text-white">{t('nav.navigation')}</span>
            </div>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-slate-800 text-gray-400 hover:text-primary transition-colors"
              aria-label={t('nav.closeMenu')}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-3xl font-black tracking-tighter transition-all px-4 py-2 rounded-2xl ${
                  isActive(link.path)
                    ? 'text-primary bg-primary/5'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-slate-800/50'
                } ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'} ${
                  mobileDelayClasses[index] ?? 'delay-0'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className={`mt-auto flex flex-col gap-6 border-t border-gray-100 pt-10 dark:border-gray-800 transition-all duration-700 ${
            isMenuOpen ? 'translate-y-0 opacity-100 delay-300' : 'translate-y-10 opacity-0'
          }`}>
            <LanguageSwitcher />
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              <span className="flex h-16 items-center justify-center gap-3 rounded-3xl bg-primary text-white font-black text-xl shadow-2xl shadow-blue-500/20 active:scale-95">
                {t('nav.bookSessionLong')}
                <span className="material-symbols-outlined">calendar_today</span>
              </span>
            </Link>
            <div className="mt-2 flex justify-center gap-8 text-gray-400">
              <span className="material-symbols-outlined !text-3xl hover:text-primary transition-colors cursor-pointer" aria-hidden="true">photo_camera</span>
              <span className="material-symbols-outlined !text-3xl hover:text-primary transition-colors cursor-pointer" aria-hidden="true">movie</span>
              <span className="material-symbols-outlined !text-3xl hover:text-primary transition-colors cursor-pointer" aria-hidden="true">mail</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
