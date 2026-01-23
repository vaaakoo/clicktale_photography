
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AIChatAssistant } from './AIChatAssistant';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  // Handle scroll to add background blur/border
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Portfolio', path: '/portfolio' },
    { name: 'About Lina', path: '/about' },
    { name: 'Booking', path: '/contact' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled || isMenuOpen 
          ? 'bg-white dark:bg-background-dark shadow-lg border-b border-gray-100 dark:border-gray-800' 
          : 'bg-white/90 md:bg-white/80 dark:bg-background-dark/80 backdrop-blur-xl border-b border-gray-100/50 dark:border-gray-800/50'
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-10 flex h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-blue-500/20">
            <span className="material-symbols-outlined !text-2xl">photo_camera</span>
          </div>
          <h2 className="text-[#111418] dark:text-white text-2xl font-black tracking-tight hidden sm:block">
            Click<span className="text-primary">Tale</span>
          </h2>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-bold tracking-wide transition-all hover:text-primary relative group ${
                isActive(link.path) ? 'text-primary' : 'text-[#617289] dark:text-gray-300'
              }`}
            >
              {link.name}
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link>
          ))}
          <Link to="/contact">
            <button className="h-12 px-8 rounded-2xl bg-primary hover:bg-blue-600 text-white text-sm font-black transition-all shadow-xl shadow-blue-500/20 active:scale-95">
              Book Session
            </button>
          </Link>
        </nav>

        {/* Mobile Toggle - Modern Burger */}
        <button 
          className={`flex md:hidden h-12 w-12 items-center justify-center rounded-2xl transition-all active:scale-90 ${
            isMenuOpen 
              ? 'bg-primary text-white shadow-lg shadow-blue-500/30' 
              : 'bg-gray-100 dark:bg-slate-800 text-primary hover:bg-gray-200 dark:hover:bg-slate-700'
          }`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle Menu"
        >
          <span className="material-symbols-outlined !text-3xl">{isMenuOpen ? 'close' : 'menu_open'}</span>
        </button>
      </div>

      {/* Modern Mobile Menu - Fixed Contrast & Background */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 md:hidden pointer-events-none ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'}`}>
        {/* Backdrop overlay */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md" onClick={() => setIsMenuOpen(false)}></div>
        
        {/* Content Drawer - Solid Background for visibility */}
        <nav className={`absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white dark:bg-background-dark shadow-2xl transition-transform duration-500 p-8 flex flex-col gap-10 ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex justify-between items-center pb-4 border-b border-gray-100 dark:border-gray-800">
             <div className="flex items-center gap-3">
                <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <span className="material-symbols-outlined !text-2xl">photo_camera</span>
                </div>
                <span className="text-xl font-black text-gray-900 dark:text-white">Navigation</span>
             </div>
             <button onClick={() => setIsMenuOpen(false)} className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-50 dark:bg-slate-800 text-gray-400 hover:text-primary transition-colors">
               <span className="material-symbols-outlined">close</span>
             </button>
          </div>
          
          <div className="flex flex-col gap-4">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-3xl font-black tracking-tighter transition-all px-4 py-2 rounded-2xl ${
                  isActive(link.path) 
                    ? 'text-primary bg-primary/5' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-slate-800/50'
                } ${isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className={`mt-auto pt-10 border-t border-gray-100 dark:border-gray-800 transition-all duration-700 delay-300 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
              <button className="w-full h-16 rounded-3xl bg-primary text-white font-black text-xl shadow-2xl shadow-blue-500/20 active:scale-95 flex items-center justify-center gap-3">
                Book a Session
                <span className="material-symbols-outlined">calendar_today</span>
              </button>
            </Link>
            <div className="mt-8 flex justify-center gap-8 text-gray-400">
              <span className="material-symbols-outlined !text-3xl hover:text-primary transition-colors cursor-pointer">photo_camera</span>
              <span className="material-symbols-outlined !text-3xl hover:text-primary transition-colors cursor-pointer">movie</span>
              <span className="material-symbols-outlined !text-3xl hover:text-primary transition-colors cursor-pointer">mail</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

const Footer: React.FC = () => (
  <footer className="bg-white dark:bg-[#101822] border-t border-[#f0f2f4] dark:border-gray-800 py-16">
    <div className="mx-auto max-w-[1400px] px-6 md:px-10">
      <div className="flex flex-col md:flex-row justify-between gap-12 lg:gap-24">
        <div className="flex flex-col gap-6 max-w-sm">
          <div className="flex items-center gap-3 text-[#111418] dark:text-white">
            <span className="material-symbols-outlined text-primary text-3xl">photo_camera</span>
            <span className="text-2xl font-black tracking-tight">ClickTale</span>
          </div>
          <p className="text-[#617289] dark:text-gray-400 text-base leading-relaxed">
            Preserving your Mediterranean memories through high-end professional photography. Based in Oia, serving the entire island of Santorini.
          </p>
        </div>
        <div className="flex flex-wrap gap-12 lg:gap-24">
          <div className="flex flex-col gap-4">
            <h4 className="text-[#111418] dark:text-white font-bold text-sm uppercase tracking-widest">Explore</h4>
            <Link to="/" className="text-[#617289] dark:text-gray-400 hover:text-primary transition-colors">Home</Link>
            <Link to="/portfolio" className="text-[#617289] dark:text-gray-400 hover:text-primary transition-colors">Portfolio</Link>
            <Link to="/about" className="text-[#617289] dark:text-gray-400 hover:text-primary transition-colors">About Lina</Link>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[#111418] dark:text-white font-bold text-sm uppercase tracking-widest">Connect</h4>
            <Link to="/contact" className="text-[#617289] dark:text-gray-400 hover:text-primary transition-colors">Booking</Link>
            <span className="text-[#617289] dark:text-gray-400">Oia Village, 84702</span>
            <span className="text-[#617289] dark:text-gray-400">+30 22860 12345</span>
          </div>
          <div className="flex flex-col gap-4">
            <h4 className="text-[#111418] dark:text-white font-bold text-sm uppercase tracking-widest">Follow</h4>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/photographer_santorini_/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center text-[#617289] hover:bg-primary/10 hover:text-primary transition-all" title="Follow on Instagram">
                <span className="text-lg">📷</span>
              </a>
              <a href="mailto:vaktonik@gmail.com" className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center text-[#617289] hover:bg-primary/10 hover:text-primary transition-all" title="Send email">
                <span className="material-symbols-outlined">alternate_email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-[#617289]">© 2024 ClickTale. All rights reserved.</p>
        <div className="flex gap-6 text-sm text-[#617289]">
          <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
);

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <AIChatAssistant />
      <Footer />
    </div>
  );
};
