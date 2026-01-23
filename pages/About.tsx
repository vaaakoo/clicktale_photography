
import React from 'react';
import { Link } from 'react-router-dom';
import { ELENA_PORTRAIT, CALDERA_WIDE } from '../constants';

export const About: React.FC = () => {
  return (
    <div className="py-16 flex flex-col gap-24">
      {/* Bio Section */}
      <section className="px-6 md:px-10 lg:px-40">
        <div className="max-w-[1200px] mx-auto flex flex-col-reverse lg:flex-row gap-16 items-center">
          <div className="flex-1 flex flex-col gap-8">
            <h1 className="text-4xl md:text-6xl font-black leading-tight">Hello, I'm Lina.</h1>
            <p className="text-xl text-[#111418] dark:text-slate-300 leading-relaxed font-medium">
              I am a visual storyteller based in the heart of Santorini. My passion is capturing the raw, unscripted moments of love against the backdrop of our endless blue skies.
            </p>
            <p className="text-[#617289] dark:text-slate-400 leading-relaxed">
              For over 5 years, I've had the privilege of documenting love stories from all over the world. Whether it's a secret proposal at sunset or an intimate elopement, my goal is to make you feel completely at ease.
            </p>
            <div className="flex flex-wrap gap-4 mt-4">
              <Link to="/contact">
                <button className="h-14 px-8 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 transition-all">
                  Contact Me
                </button>
              </Link>
              <Link to="/portfolio">
                <button className="h-14 px-8 bg-primary/10 text-primary dark:text-white dark:bg-slate-800 font-bold rounded-xl hover:bg-primary/20 transition-all">
                  View Portfolio
                </button>
              </Link>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <img src={ELENA_PORTRAIT} alt="Lina Photographer" className="w-full aspect-[4/5] object-cover rounded-3xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 md:px-10 lg:px-40">
        <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: 'Years Experience', val: '5+' },
              { label: 'Couples Photographed', val: '200+' },
              { label: 'Languages Spoken', val: 'EN & GR' }
            ].map(s => (
              <div key={s.label} className="p-8 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <p className="text-[#617289] dark:text-slate-400 font-semibold text-sm uppercase tracking-wider mb-2">{s.label}</p>
                <p className="text-primary text-4xl font-black">{s.val}</p>
              </div>
            ))}
        </div>
      </section>

      {/* Wide Break */}
      <section className="px-6 md:px-10">
        <div className="max-w-[1400px] mx-auto h-[400px] md:h-[600px] rounded-3xl overflow-hidden relative group shadow-2xl">
          <img src={CALDERA_WIDE} alt="Santorini Caldera" className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
          <div className="absolute bottom-10 left-10 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-6 py-3 rounded-2xl">
            <p className="text-xs font-black uppercase tracking-widest text-primary">Santorini, Greece</p>
          </div>
        </div>
      </section>

      {/* My Approach */}
      <section className="px-6 md:px-10 lg:px-40 pb-20">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-4xl font-bold mb-12">My Approach</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: 'wb_sunny', title: 'Natural Light', desc: 'I utilize the famous golden Greek sun to create warm, ethereal images that glow with authenticity.' },
              { icon: 'photo_camera', title: 'Candid Moments', desc: 'The best photos happen in between poses. I capture fleeting glances and genuine laughter.' },
              { icon: 'self_improvement', title: 'Stress-Free', desc: 'I guide you gently through the session, ensuring you feel relaxed, confident, and beautiful.' }
            ].map(card => (
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

      {/* Reviews Section */}
      <section className="px-6 md:px-10 lg:px-40">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-4">Client Reviews</h2>
            <p className="text-xl text-[#617289] dark:text-slate-400">What my clients are saying</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah & James',
                location: 'New York, USA',
                review: 'Lina made us feel so comfortable from the very first moment. The photos are absolutely stunning and capture the magic of our honeymoon perfectly.',
                rating: 5,
                img: 'https://picsum.photos/100/100?random=1'
              },
              {
                name: 'Elena & Marco',
                location: 'Milan, Italy',
                review: 'The best decision we made was choosing Lina for our engagement shoot. Her creativity and attention to detail is unmatched. We love every single photo!',
                rating: 5,
                img: 'https://picsum.photos/100/100?random=2'
              },
              {
                name: 'Jessica Chen',
                location: 'Sydney, Australia',
                review: 'Incredible photographer! She captured my solo adventure in Santorini perfectly. The images tell the story of my journey beautifully.',
                rating: 5,
                img: 'https://picsum.photos/100/100?random=3'
              },
              {
                name: 'Michael & Lisa',
                location: 'London, UK',
                review: 'From the initial consultation to the final photos, everything was seamless. Lina is professional, creative, and genuinely cares about her clients.',
                rating: 5,
                img: 'https://picsum.photos/100/100?random=4'
              },
              {
                name: 'Sophia Rodriguez',
                location: 'Barcelona, Spain',
                review: 'This session exceeded all my expectations. The photos are not just beautiful—they capture the essence of who I am. Highly recommended!',
                rating: 5,
                img: 'https://picsum.photos/100/100?random=5'
              },
              {
                name: 'David & Rachel',
                location: 'Toronto, Canada',
                review: 'Worth every penny! Lina went above and beyond to make our vow renewal special. The golden hour shots are absolutely breathtaking.',
                rating: 5,
                img: 'https://picsum.photos/100/100?random=6'
              }
            ].map((review, idx) => (
              <div key={idx} className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-shadow flex flex-col gap-4">
                <div className="flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                
                <p className="text-[#617289] dark:text-slate-300 leading-relaxed flex-1">
                  "{review.review}"
                </p>
                
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-slate-700">
                  <img src={review.img} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-sm text-[#111418] dark:text-white">{review.name}</p>
                    <p className="text-xs text-[#617289] dark:text-slate-400">{review.location}</p>
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
