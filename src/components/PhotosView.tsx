'use client';

import { useTranslations, useLocale } from 'next-intl';
import Gallery from './Gallery';
import Footer from './Footer';

export default function PhotosView() {
  const t = useTranslations('photos');
  const ht = useTranslations('header');
  const locale = useLocale();
  const homeHref = `/${locale}`;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      <div className="flex-1">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 pb-8">
          <a
            href={homeHref}
            className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors"
            style={{ color: 'var(--accent)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="19" y1="12" x2="5" y2="12" />
              <polyline points="12 19 5 12 12 5" />
            </svg>
            {ht('backToHome')}
          </a>

          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
            {t('pageTitle')}
          </h1>
          <p className="leading-relaxed max-w-2xl mb-2" style={{ color: 'var(--text-secondary)' }}>
            {t('standfirst')}
          </p>
          <div className="w-12 h-0.5 mt-6" style={{ background: 'var(--accent)' }} />
        </div>

        <Gallery />
      </div>
      <Footer />
    </div>
  );
}
