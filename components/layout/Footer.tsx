import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const Footer: React.FC = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-white dark:bg-[#101822] border-t border-[#f0f2f4] dark:border-gray-800 py-16">
      <div className="mx-auto max-w-[1400px] px-6 md:px-10">
        <div className="flex flex-col md:flex-row justify-between gap-12 lg:gap-24">
          <div className="flex flex-col gap-6 max-w-sm">
            <div className="flex items-center gap-3 text-[#111418] dark:text-white">
              <span className="material-symbols-outlined text-primary text-3xl">photo_camera</span>
              <span className="text-2xl font-black tracking-tight">
                {t('brand.click')}<span className="text-primary">{t('brand.tale')}</span>
              </span>
            </div>
            <p className="text-[#617289] dark:text-gray-400 text-base leading-relaxed">
              {t('footer.description')}
            </p>
          </div>
          <div className="flex flex-wrap gap-12 lg:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="text-[#111418] dark:text-white font-bold text-sm uppercase tracking-widest">{t('footer.explore')}</h4>
              <Link to="/" className="text-[#617289] dark:text-gray-400 hover:text-primary transition-colors">{t('nav.home')}</Link>
              <Link to="/portfolio" className="text-[#617289] dark:text-gray-400 hover:text-primary transition-colors">{t('nav.portfolio')}</Link>
              <Link to="/about" className="text-[#617289] dark:text-gray-400 hover:text-primary transition-colors">{t('nav.about')}</Link>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[#111418] dark:text-white font-bold text-sm uppercase tracking-widest">{t('footer.connect')}</h4>
              <Link to="/contact" className="text-[#617289] dark:text-gray-400 hover:text-primary transition-colors">{t('nav.booking')}</Link>
              <span className="text-[#617289] dark:text-gray-400">{t('footer.address')}</span>
              <span className="text-[#617289] dark:text-gray-400">{t('footer.phone')}</span>
            </div>
            <div className="flex flex-col gap-4 min-w-[220px]">
              <h4 className="text-[#111418] dark:text-white font-bold text-sm uppercase tracking-widest">{t('footer.studioLabel')}</h4>
              <span className="text-[#617289] dark:text-gray-400">{t('footer.address')}</span>
              <div className="overflow-hidden rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
                <iframe
                  title={t('footer.mapTitle')}
                  aria-label={t('footer.mapTitle')}
                  className="h-32 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://www.google.com/maps?q=Oia%20Santorini%20Greece&output=embed"
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <h4 className="text-[#111418] dark:text-white font-bold text-sm uppercase tracking-widest">{t('footer.follow')}</h4>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/photographer_santorini_/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center text-[#617289] hover:bg-primary/10 hover:text-primary transition-all"
                  title={t('footer.followInstagram')}
                  aria-label={t('footer.followInstagram')}
                >
                  <span className="text-lg">📷</span>
                </a>
                <a
                  href="mailto:vaktonik@gmail.com"
                  className="h-10 w-10 rounded-full bg-primary/5 flex items-center justify-center text-[#617289] hover:bg-primary/10 hover:text-primary transition-all"
                  title={t('footer.sendEmail')}
                  aria-label={t('footer.sendEmail')}
                >
                  <span className="material-symbols-outlined">alternate_email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#617289]">{t('footer.copyright')}</p>
          <div className="flex gap-6 text-sm text-[#617289]">
            <a href="#" className="hover:text-primary transition-colors">{t('footer.privacy')}</a>
            <a href="#" className="hover:text-primary transition-colors">{t('footer.terms')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
