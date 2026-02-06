import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SERVICES, FAQ, HERO_BG, ALEX_PORTRAIT, PORTFOLIO } from '../constants';
import { FAQSection } from '../components/ui/FAQSection';

export const Home: React.FC = () => {
  const { t } = useTranslation();

  const faqItems = useMemo(
    () => FAQ.map(item => ({
      question: t(item.questionKey),
      answer: t(item.answerKey)
    })),
    [t]
  );

  return (
    <div className="flex flex-col gap-20">
      <section className="relative px-6 py-12 md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div
            className="relative h-[500px] md:h-[650px] w-full overflow-hidden rounded-[3rem] shadow-2xl bg-black"
          >
            <video
              autoPlay
              muted
              loop
              playsInline
              poster={HERO_BG}
              className="absolute inset-0 w-full h-full object-cover opacity-60 pointer-events-none"
            >
              <source src="https://player.vimeo.com/external/494252666.sd.mp4?s=bc2c427386000c25a0b9435b8006b53b844f2434&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>

            <div className="relative flex h-full flex-col justify-center px-8 md:px-20 max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-xl px-5 py-2 text-sm font-bold uppercase tracking-[0.2em] text-white border border-white/20">
                <span className="material-symbols-outlined !text-lg text-primary">verified</span> {t('home.hero.location')}
              </div>
              <h1 className="mb-6 text-5xl md:text-8xl font-black leading-[0.9] text-white tracking-tighter animate-fadeInUp">
                {t('home.hero.titlePrefix')} <br /> <span className="text-primary italic">{t('home.hero.titleHighlight')}</span> {t('home.hero.titleSuffix')}
              </h1>
              <p className="mb-10 text-xl md:text-2xl font-medium text-gray-200 leading-relaxed opacity-90 max-w-2xl">
                {t('home.hero.subtitle')}
              </p>
              <div className="flex flex-wrap gap-6">
                <Link to="/contact">
                  <button className="h-16 px-12 rounded-3xl bg-primary text-white font-black text-xl hover:bg-blue-600 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-blue-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                    {t('home.hero.ctaPrimary')}
                  </button>
                </Link>
                <Link to="/portfolio">
                  <button className="h-16 px-12 rounded-3xl bg-white/10 backdrop-blur-xl text-white font-black text-xl border border-white/30 hover:bg-white/20 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
                    {t('home.hero.ctaSecondary')}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6">
        <div className="mx-auto max-w-[1200px] flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <div className="flex flex-col gap-10 flex-1">
            <div className="flex flex-col gap-4">
              <div className="w-20 h-2 bg-primary rounded-full"></div>
              <span className="text-primary font-black tracking-[0.3em] uppercase text-sm">{t('home.intro.eyebrow')}</span>
              <h2 className="text-[#111418] dark:text-white text-5xl md:text-7xl font-black leading-tight tracking-tighter">
                {t('home.intro.name')}
              </h2>
            </div>
            <p className="text-[#617289] dark:text-gray-300 text-xl leading-relaxed">
              {t('home.intro.description')}
            </p>
            <div className="flex gap-16 border-t border-gray-100 dark:border-gray-800 pt-10">
              <div>
                <span className="block text-primary text-5xl font-black tracking-tighter">10+</span>
                <span className="text-[#617289] dark:text-gray-400 text-xs font-bold uppercase tracking-widest">{t('home.intro.yearsLabel')}</span>
              </div>
              <div>
                <span className="block text-primary text-5xl font-black tracking-tighter">500+</span>
                <span className="text-[#617289] dark:text-gray-400 text-xs font-bold uppercase tracking-widest">{t('home.intro.storiesLabel')}</span>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <div className="relative group p-4">
              <div className="absolute inset-0 bg-primary rounded-[3rem] rotate-3 group-hover:rotate-0 transition-transform duration-700 -z-10 opacity-10"></div>
              <img
                src={ALEX_PORTRAIT}
                alt={t('home.portraitAlt')}
                className="relative w-full aspect-[4/5] rounded-[2.5rem] object-cover shadow-2xl z-10 grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute -bottom-4 -left-4 z-20 bg-white dark:bg-slate-900 p-6 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-800">
                <span className="material-symbols-outlined text-primary !text-5xl">auto_awesome</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-10">
        <div className="mx-auto max-w-[1400px]">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <span className="text-primary font-black tracking-[0.3em] uppercase text-sm mb-4 block">{t('home.gallery.eyebrow')}</span>
              <h2 className="text-[#111418] dark:text-white text-5xl md:text-7xl font-black tracking-tighter leading-none">
                {t('home.gallery.title')} <span className="text-primary">{t('home.gallery.titleHighlight')}</span>
              </h2>
            </div>
            <Link to="/portfolio" className="group flex items-center gap-4 h-16 px-10 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-gray-700 font-black tracking-tighter text-lg hover:border-primary transition-all shadow-sm hover:shadow-xl active:scale-95">
              {t('home.gallery.cta')} <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_right_alt</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 aspect-[16/11] rounded-[3rem] overflow-hidden group relative shadow-2xl">
              <img src={PORTFOLIO[0].imageUrl} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" alt={t('home.gallery.featuredAlt')} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-12 flex flex-col justify-end">
                <p className="text-white text-3xl font-black tracking-tighter">{t(PORTFOLIO[0].titleKey)}</p>
                <p className="text-white/70 font-bold uppercase tracking-widest text-xs mt-2">{t(`sessionTypes.${PORTFOLIO[0].category}`)}</p>
              </div>
            </div>

            <div className="md:col-span-5 aspect-[4/5] rounded-[3rem] overflow-hidden group relative shadow-xl">
              <img src={PORTFOLIO[1].imageUrl} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110" alt={t('home.gallery.featuredAlt')} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-10 flex flex-col justify-end">
                <p className="text-white text-2xl font-black tracking-tighter">{t(PORTFOLIO[1].titleKey)}</p>
                <p className="text-white/70 font-bold uppercase tracking-widest text-xs mt-2">{t(`sessionTypes.${PORTFOLIO[1].category}`)}</p>
              </div>
            </div>

            {[PORTFOLIO[2], PORTFOLIO[3], PORTFOLIO[4]].map((item) => (
              <div key={item.id} className="md:col-span-4 aspect-square rounded-[2.5rem] overflow-hidden group relative shadow-lg hover:z-10 transition-all hover:scale-105">
                <img src={item.imageUrl} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={t('home.gallery.highlightAlt')} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-50 dark:bg-slate-900/40 py-32 px-6">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col gap-6 mb-20 max-w-3xl">
            <h2 className="text-[#111418] dark:text-white text-5xl md:text-7xl font-black tracking-tighter">{t('home.services.title')}</h2>
            <p className="text-[#617289] dark:text-gray-400 text-xl leading-relaxed">{t('home.services.subtitle')}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {SERVICES.map((service) => (
              <div key={service.id} className="group relative flex flex-col bg-white dark:bg-slate-800 rounded-[2.5rem] overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-4">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={service.imageUrl} alt={t(service.titleKey)} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-black tracking-tight">{t(service.titleKey)}</h3>
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-[#617289] dark:text-gray-400 text-base mb-8 leading-relaxed line-clamp-2">{t(service.descriptionKey)}</p>
                  <Link to="/portfolio" className="inline-flex items-center gap-3 text-primary text-sm font-black uppercase tracking-widest group/btn">
                    {t('home.services.cta')} <span className="material-symbols-outlined !text-xl group-hover/btn:translate-x-2 transition-transform">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-[1400px] flex flex-col gap-20">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-6">
            <span className="text-primary font-black tracking-[0.3em] uppercase text-sm">{t('home.faq.eyebrow')}</span>
            <h2 className="text-[#111418] dark:text-white text-5xl md:text-7xl font-black tracking-tighter">{t('home.faq.title')}</h2>
            <p className="text-[#617289] dark:text-gray-400 text-xl">{t('home.faq.subtitle')}</p>
          </div>
          <FAQSection items={faqItems} />
        </div>
      </section>
    </div>
  );
};
