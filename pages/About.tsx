import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ELENA_PORTRAIT, CALDERA_WIDE } from '../constants';

export const About: React.FC = () => {
  const { t } = useTranslation();

  const stats = [
    { label: t('about.stats.years'), val: t('about.stats.yearsValue') },
    { label: t('about.stats.couples'), val: t('about.stats.couplesValue') },
    { label: t('about.stats.languages'), val: t('about.stats.languagesValue') }
  ];

  const approach = [
    { icon: 'wb_sunny', title: t('about.approach.light.title'), desc: t('about.approach.light.description') },
    { icon: 'photo_camera', title: t('about.approach.candid.title'), desc: t('about.approach.candid.description') },
    { icon: 'self_improvement', title: t('about.approach.stressFree.title'), desc: t('about.approach.stressFree.description') }
  ];

  const reviews = [
    { key: 'sarah', img: 'https://picsum.photos/100/100?random=1' },
    { key: 'elena', img: 'https://picsum.photos/100/100?random=2' },
    { key: 'jessica', img: 'https://picsum.photos/100/100?random=3' },
    { key: 'michael', img: 'https://picsum.photos/100/100?random=4' },
    { key: 'sophia', img: 'https://picsum.photos/100/100?random=5' },
    { key: 'david', img: 'https://picsum.photos/100/100?random=6' }
  ];

  return (
    <div className="py-16 flex flex-col gap-24">
      <section className="px-6 md:px-10 lg:px-40">
        <div className="max-w-[1200px] mx-auto flex flex-col-reverse lg:flex-row gap-16 items-center">
          <div className="flex-1 flex flex-col gap-8">
            <h1 className="text-4xl md:text-6xl font-black leading-tight">{t('about.heroTitle')}</h1>
            <p className="text-xl text-[#111418] dark:text-slate-300 leading-relaxed font-medium">
              {t('about.heroLead')}
            </p>
            <p className="text-[#617289] dark:text-slate-400 leading-relaxed">
              {t('about.heroBody')}
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link to="/contact">
                <button className="h-14 px-8 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  {t('about.ctaPrimary')}
                </button>
              </Link>
              <Link to="/portfolio">
                <button className="h-14 px-8 bg-primary/10 text-primary dark:text-white dark:bg-slate-800 font-bold rounded-xl hover:bg-primary/20 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">
                  {t('about.ctaSecondary')}
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <img src={ELENA_PORTRAIT} alt={t('about.portraitAlt')} className="w-full aspect-[4/5] object-cover rounded-3xl shadow-2xl" />
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-40">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map(s => (
            <div key={s.label} className="p-8 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
              <p className="text-[#617289] dark:text-slate-400 font-semibold text-sm uppercase tracking-wider mb-2">{s.label}</p>
              <p className="text-primary text-4xl font-black">{s.val}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto h-[400px] md:h-[600px] rounded-3xl overflow-hidden relative group shadow-2xl">
          <img src={CALDERA_WIDE} alt={t('about.calderaAlt')} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute bottom-10 left-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-2xl">
            <p className="text-xs font-black uppercase tracking-widest text-primary">{t('about.wideLabel')}</p>
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-40 pb-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-4xl font-bold mb-12">{t('about.approachTitle')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {approach.map(card => (
              <div key={card.title} className="flex flex-col gap-6 p-8 bg-white dark:bg-slate-800 rounded-3xl border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined !text-4xl">{card.icon}</span>
                </div>
                <h3 className="text-2xl font-bold">{card.title}</h3>
                <p className="text-[#617289] dark:text-slate-400 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 md:px-10 lg:px-40">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">{t('about.reviewsTitle')}</h2>
            <p className="text-xl text-[#617289] dark:text-slate-400">{t('about.reviewsSubtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, idx) => (
              <div key={idx} className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-shadow flex flex-col gap-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>

                <p className="text-[#617289] dark:text-slate-300 leading-relaxed flex-1">
                  "{t(`about.reviews.${review.key}.review`)}"
                </p>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
                  <img src={review.img} alt={t(`about.reviews.${review.key}.name`)} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-sm text-[#111418] dark:text-white">{t(`about.reviews.${review.key}.name`)}</p>
                    <p className="text-xs text-[#617289] dark:text-slate-400">{t(`about.reviews.${review.key}.location`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
