import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const Contact: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    message: '',
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaContainerRef = useRef<HTMLDivElement | null>(null);
  const recaptchaWidgetId = useRef<number | null>(null);
  const recaptchaSiteKey = (import.meta as any).env?.VITE_RECAPTCHA_SITE_KEY ?? '';
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const resetRecaptcha = () => {
    setCaptchaToken(null);
    if (typeof window !== 'undefined' && (window as any).grecaptcha?.reset && recaptchaWidgetId.current !== null) {
      (window as any).grecaptcha.reset(recaptchaWidgetId.current);
    }
  };

  const renderRecaptcha = () => {
    if (!recaptchaContainerRef.current || !recaptchaSiteKey) {
      return;
    }
    if (typeof window === 'undefined' || !(window as any).grecaptcha?.render) {
      return;
    }
    if (recaptchaWidgetId.current !== null) {
      (window as any).grecaptcha.reset(recaptchaWidgetId.current);
      return;
    }

    recaptchaWidgetId.current = (window as any).grecaptcha.render(recaptchaContainerRef.current, {
      sitekey: recaptchaSiteKey,
      callback: (token: string) => {
        setCaptchaToken(token);
        setSubmitStatus(null);
      },
      'expired-callback': () => {
        resetRecaptcha();
        setSubmitStatus({
          type: 'error',
          message: t('contact.statusSecurityExpired'),
        });
      },
      'error-callback': () => {
        resetRecaptcha();
        setSubmitStatus({
          type: 'error',
          message: t('contact.statusSecurityFailed'),
        });
      },
    });
  };

  useEffect(() => {
    (window as any).onRecaptchaLoad = () => {
      renderRecaptcha();
    };
    renderRecaptcha();

    return () => {
      delete (window as any).onRecaptchaLoad;
    };
  }, [recaptchaSiteKey, t]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    const isRecaptchaConfigured = Boolean(recaptchaSiteKey);

    if (isRecaptchaConfigured && !captchaToken) {
      setSubmitStatus({
        type: 'error',
        message: t('contact.statusCaptchaRequired'),
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const endpoint = (typeof window !== 'undefined' && window.location.hostname === 'localhost')
        ? 'http://localhost:5000/api/send-booking'
        : '/api/send-booking';

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, captchaToken: captchaToken || '' }),
      });

      if (response.ok) {
        setSubmitStatus({ type: 'success', message: t('contact.statusSuccess') });
        setFormData({ name: '', email: '', date: '', message: '' });
        resetRecaptcha();
      } else {
        setSubmitStatus({
          type: 'error',
          message: t('contact.statusBookingFailed')
        });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', message: t('contact.statusNetworkError') });
      resetRecaptcha();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-16 px-6 md:px-10 flex items-center justify-center relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-50 to-transparent dark:from-blue-900/10 -z-10"></div>

      <div className="w-full max-w-[1200px] bg-white dark:bg-[#1a2634] rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row border border-gray-100 dark:border-gray-800">
        <div className="lg:w-5/12 bg-gray-50 dark:bg-[#15202b] p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-gray-100 dark:border-gray-800 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-6 leading-tight">
              {t('contact.title')} <span className="text-primary">{t('contact.titleHighlight')}</span>
            </h1>
            <p className="text-[#617289] dark:text-gray-400 mb-12 leading-relaxed">
              {t('contact.lead')}
            </p>

            <div className="flex flex-col gap-8">
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-primary shadow-sm border border-gray-100 dark:border-gray-700">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#617289]">{t('contact.emailLabel')}</p>
                  <p className="font-bold">{t('contact.emailValue')}</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-primary shadow-sm border border-gray-100 dark:border-gray-700">
                  <span className="material-symbols-outlined">call</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#617289]">{t('contact.phoneLabel')}</p>
                  <p className="font-bold">{t('contact.phoneValue')}</p>
                </div>
              </div>
              <div className="flex gap-4 items-center">
                <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-primary shadow-sm border border-gray-100 dark:border-gray-700">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#617289]">{t('contact.studioLabel')}</p>
                  <p className="font-bold">{t('contact.studioValue')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <p className="text-sm font-bold text-[#617289] mb-4">{t('contact.followTitle')}</p>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-primary hover:text-primary transition-all cursor-pointer" aria-label={t('contact.socialInstagram')}>
                <span className="material-symbols-outlined text-xl">camera</span>
              </div>
              <div className="w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-primary hover:text-primary transition-all cursor-pointer" aria-label={t('contact.socialVideo')}>
                <span className="material-symbols-outlined text-xl">movie</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:w-7/12 p-8 md:p-12">
          <h2 className="text-3xl font-bold mb-2">{t('contact.messageTitle')}</h2>
          <p className="text-[#617289] dark:text-gray-400 mb-10">{t('contact.messageSubtitle')}</p>

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
              <label className="text-sm font-bold">{t('contact.fieldName')}</label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="h-14 rounded-xl border border-gray-200 dark:bg-slate-800 dark:border-gray-700 focus:ring-primary focus:border-primary px-4"
                placeholder={t('contact.placeholderName')}
                aria-label={t('contact.fieldName')}
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">{t('contact.fieldEmail')}</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="h-14 rounded-xl border border-gray-200 dark:bg-slate-800 dark:border-gray-700 focus:ring-primary focus:border-primary px-4"
                  placeholder={t('contact.placeholderEmail')}
                  aria-label={t('contact.fieldEmail')}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">{t('contact.fieldDate')}</label>
                <input
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="h-14 rounded-xl border border-gray-200 dark:bg-slate-800 dark:border-gray-700 focus:ring-primary focus:border-primary px-4"
                  aria-label={t('contact.fieldDate')}
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold">{t('contact.fieldMessage')}</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="h-32 rounded-xl border border-gray-200 dark:bg-slate-800 dark:border-gray-700 focus:ring-primary focus:border-primary p-4 resize-none"
                placeholder={t('contact.placeholderMessage')}
                aria-label={t('contact.fieldMessage')}
              />
            </div>
            {recaptchaSiteKey && !captchaToken && (
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                </svg>
                {t('contact.securityLoading')}
              </div>
            )}

            <div ref={recaptchaContainerRef} className="flex justify-center"></div>

            <button
              type="submit"
              disabled={isSubmitting || (recaptchaSiteKey && !captchaToken)}
              className="h-14 w-full bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {isSubmitting ? t('contact.sending') : t('contact.sendMessage')} <span className="material-symbols-outlined text-sm">send</span>
            </button>
            {recaptchaSiteKey && !captchaToken && (
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                {t('contact.securityPrompt')}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
