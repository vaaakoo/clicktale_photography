
import React, { useState, useEffect } from 'react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    message: '',
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  useEffect(() => {
    (window as any).onTurnstileSuccess = (token: string) => {
      console.log('Turnstile token received:', token);
      setCaptchaToken(token);
    };

    return () => {
      delete (window as any).onTurnstileSuccess;
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    if (!captchaToken) {
      setSubmitStatus({
        type: 'error',
        message: 'Please confirm you are not a robot.',
      });
      setIsSubmitting(false);
      return;
    }
    try {
      // Use environment variable for API URL, fallback to localhost for development
      // Use local server in dev, relative path in production (Vercel)
      const endpoint = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
        ? 'http://localhost:5000/api/send-booking'
        : '/api/send-booking';
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: 'Booking request sent! Check your email for confirmation.' });
        setFormData({ name: '', email: '', date: '', message: '' });
      } else {
        setSubmitStatus({ type: 'error', message: data.error || 'Failed to send booking. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: 'Network error. Please check if the server is running.' });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen py-16 px-6 md:px-10 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent dark:from-blue-900/10 -z-10"></div>
      
      <div className="w-full max-w-[1200px] bg-white dark:bg-[#1a2634] rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100 dark:border-gray-800">
        
        {/* Left Side: Info */}
        <div className="lg:w-5/12 bg-gray-50 dark:bg-[#15202b] p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              Let's Capture <span className="text-primary">Your Story</span>
            </h1>
            <p className="text-[#617289] dark:text-gray-400 mb-12 leading-relaxed">
              Based in Oia, capturing love stories worldwide. Whether it's an engagement, wedding, or solo adventure, reach out to plan your dream session.
            </p>

            <div className="flex flex-col gap-8">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-primary shadow-sm border border-gray-100 dark:border-gray-700">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#617289]">Email</p>
                  <p className="font-bold">hello@santoriniphoto.com</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-primary shadow-sm border border-gray-100 dark:border-gray-700">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#617289]">Phone</p>
                  <p className="font-bold">+30 22860 12345</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-primary shadow-sm border border-gray-100 dark:border-gray-700">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#617289]">Studio</p>
                  <p className="font-bold">Oia, Santorini, Greece</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
             <p className="text-sm font-bold text-[#617289] mb-4">Follow My Journey</p>
             <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-primary hover:text-primary transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-xl">camera</span>
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-primary hover:text-primary transition-all cursor-pointer">
                  <span className="material-symbols-outlined text-xl">movie</span>
                </div>
             </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="lg:w-7/12 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-2">Send a Message</h2>
          <p className="text-[#617289] dark:text-gray-400 mb-10">I typically respond within 24 hours.</p>

          {submitStatus && (
            <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
              submitStatus.type === 'success' 
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800' 
                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
            }`}>
              <span className="material-symbols-outlined">{submitStatus.type === 'success' ? 'check_circle' : 'error'}</span>
              <span>{submitStatus.message}</span>
            </div>
          )}

          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Your Name</label>
              <input 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-14 rounded-xl border border-gray-200 dark:bg-slate-800 dark:border-gray-700 focus:ring-primary focus:border-primary px-4"
                placeholder="e.g. Elena & Marco"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Email</label>
                <input 
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-14 rounded-xl border border-gray-200 dark:bg-slate-800 dark:border-gray-700 focus:ring-primary focus:border-primary px-4"
                  placeholder="name@example.com"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Preferred Date</label>
                <input 
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="h-14 rounded-xl border border-gray-200 dark:bg-slate-800 dark:border-gray-700 focus:ring-primary focus:border-primary px-4"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">Tell me about your vision</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="h-32 rounded-xl border border-gray-200 dark:bg-slate-800 dark:border-gray-700 focus:ring-primary focus:border-primary p-4 resize-none"
                placeholder="Tell me what you are looking for..."
              />
            </div>
            <div
              className="cf-turnstile"
              data-sitekey="0x4AAAAAACQkiCrOWu32m6v-"
              data-callback="onTurnstileSuccess"
              data-theme="light"
            ></div>

            <button 
              type="submit"
              disabled={isSubmitting}
              className="h-14 w-full bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'} <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
