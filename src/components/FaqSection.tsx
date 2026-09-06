'use client';

import { useMessages, useTranslations } from 'next-intl';

type FaqItem = { question: string; answer: string };

export default function FaqSection() {
  const t = useTranslations('faq');
  const messages = useMessages() as any;
  const items: FaqItem[] = (messages?.faq?.items || []) as FaqItem[];

  return (
    <section
      id="faq"
      className="section-padding"
      style={{ background: 'var(--bg-secondary)' }}
      aria-labelledby="faq-heading"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="faq-heading"
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        {t.has('subtitle') && (
          <p className="mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
            {t('subtitle')}
          </p>
        )}
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-4">
          {items.map((item, i) => (
            <details
              key={i}
              className="group rounded-xl overflow-hidden"
              style={{
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
              }}
              {...(i === 0 ? { open: true } : {})}
            >
              <summary
                className="cursor-pointer list-none flex items-center justify-between gap-4 p-5 sm:p-6 select-none"
                style={{ color: 'var(--text-primary)' }}
              >
                <h3
                  className="font-display text-base sm:text-lg font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.question}
                </h3>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="flex-shrink-0 transition-transform group-open:rotate-180"
                  style={{ color: 'var(--accent)' }}
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </summary>
              <div
                className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                {item.answer}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}