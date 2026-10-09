'use client';

import { useTranslations, useLocale, useMessages } from 'next-intl';
import Footer from './Footer';

export default function TopicPage({ namespace }: { namespace: string }) {
  const t = useTranslations(namespace);
  const ht = useTranslations('header');
  const locale = useLocale();
  const messages = useMessages() as any;
  const homeHref = `/${locale}`;
  const sections = (messages?.[namespace]?.sections || []) as Array<{
    heading: string;
    paragraphs: string[];
  }>;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg-primary)' }}>
      <div className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
        <a
          href={homeHref}
          className="inline-flex items-center gap-2 text-sm font-medium mb-10 transition-colors"
          style={{ color: 'var(--accent)' }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          {ht('backToHome')}
        </a>

        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
          {t('pageTitle')}
        </h1>
        <p className="leading-relaxed mb-10" style={{ color: 'var(--text-secondary)' }}>
          {t('standfirst')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i}>
              <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                {section.heading}
              </h2>
              {section.paragraphs.map((paragraph, j) => (
                <p key={j} className="leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
