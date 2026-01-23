
import React, { useState } from 'react';
import { FAQItem } from '../types';

const FAQItemComponent: React.FC<{ item: FAQItem }> = ({ item }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`group transition-all duration-500 rounded-[2rem] border border-gray-100 dark:border-gray-800 bg-white dark:bg-slate-900/50 p-8 hover:shadow-2xl hover:border-primary/30 ${isOpen ? 'ring-2 ring-primary/20 bg-primary/[0.02] dark:bg-primary/[0.05]' : 'shadow-sm'}`}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-start gap-6 cursor-pointer text-left"
      >
        <h3 className="text-[#111418] dark:text-white font-black text-xl md:text-2xl tracking-tight flex-1 leading-tight">
          {item.question}
        </h3>
        <div className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-primary text-white rotate-180' : 'bg-gray-50 dark:bg-slate-800 text-primary'}`}>
          <span className="material-symbols-outlined !text-2xl">
            {isOpen ? 'remove' : 'add'}
          </span>
        </div>
      </button>
      
      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-6' : 'grid-rows-[0fr] opacity-0'}`}>
        <div className="overflow-hidden">
          <p className="text-[#617289] dark:text-gray-400 text-lg leading-relaxed font-medium">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export const FAQSection: React.FC<{ items: FAQItem[] }> = ({ items }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
    {items.map((item, idx) => (
      <FAQItemComponent key={idx} item={item} />
    ))}
  </div>
);
