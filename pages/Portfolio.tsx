import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { PORTFOLIO } from '../constants';
import { SessionType } from '../types';

type FilterType = SessionType | 'all';

export const Portfolio: React.FC = () => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<FilterType>('all');
  const [visibleCount, setVisibleCount] = useState(6);

  const filteredItems = filter === 'all'
    ? PORTFOLIO
    : PORTFOLIO.filter(item => item.category === filter);

  const visibleItems = filteredItems.slice(0, visibleCount);

  return (
    <div className="min-h-screen py-16 px-6 md:px-10 lg:px-40">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-12">
        <div className="text-center flex flex-col gap-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight">{t('portfolio.title')}</h1>
          <p className="text-[#617289] dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {t('portfolio.description')}
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          {(['all', ...Object.values(SessionType)] as FilterType[]).map((cat) => (
            <button
              key={cat}
              onClick={() => { setFilter(cat); setVisibleCount(6); }}
              className={`px-6 h-10 rounded-full font-semibold text-sm transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                filter === cat
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-gray-700 hover:border-primary text-gray-600 dark:text-gray-300'
              }`}
            >
              {cat === 'all' ? t('portfolio.filters.all') : t(`sessionTypes.${cat}`)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-fadeIn">
          {visibleItems.map((item) => (
            <div key={item.id} className="group relative aspect-[3/4] cursor-pointer overflow-hidden rounded-2xl shadow-xl">
              <img
                src={item.imageUrl}
                alt={t(item.titleKey)}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-8">
                <p className="text-xl font-bold text-white">{t(item.titleKey)}</p>
                <p className="text-sm font-medium text-white/80">{t(`sessionTypes.${item.category}`)}</p>
              </div>
            </div>
          ))}
        </div>

        {visibleCount < filteredItems.length && (
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setVisibleCount(prev => prev + 3)}
              className="flex items-center gap-2 h-12 px-8 rounded-xl border-2 border-primary text-primary font-bold hover:bg-primary hover:text-white transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {t('portfolio.loadMore')} <span className="material-symbols-outlined">expand_more</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
