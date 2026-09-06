'use client';

import { useMessages, useTranslations } from 'next-intl';

type Amenity = { id: string; title: string; text: string };

const iconPaths: Record<string, React.ReactNode> = {
  washrooms: (
    <>
      <circle cx="12" cy="7" r="4" />
      <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 21v-2a4 4 0 0 0-4-4h0a4 4 0 0 0-4 4v2" />
    </>
  ),
  parking: (
    <>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M9 17V7h3.5a2.5 2.5 0 0 1 0 5H9" />
    </>
  ),
  dining: (
    <>
      <path d="M4 2v8a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V2" />
      <path d="M6 12v10" />
      <path d="M16 2c-1.5 1.5-2 4-2 7h-1v6a2 2 0 0 0 2 2h0a2 2 0 0 0 2-2V2" />
    </>
  ),
  lodging: (
    <>
      <path d="M2 5v14" />
      <path d="M2 9h18a2 2 0 0 1 2 2v8" />
      <path d="M2 17h20" />
      <path d="M6 9V5" />
      <path d="M10 9V5" />
    </>
  ),
  grocery: (
    <>
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <path d="M3 6h18" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </>
  ),
  fuel: (
    <>
      <path d="M3 22V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v18" />
      <path d="M13 22h-8" />
      <path d="M4 9h8" />
      <path d="M13 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-7a2 2 0 0 0-.59-1.42L17 5" />
    </>
  ),
};

export default function AmenitiesSection() {
  const t = useTranslations('amenities');
  const messages = useMessages() as any;
  const items: Amenity[] = (messages?.amenities?.items || []) as Amenity[];

  return (
    <section
      id="amenities"
      className="section-padding"
      style={{ background: 'var(--bg-tertiary)' }}
      aria-labelledby="amenities-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          id="amenities-heading"
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <article
              key={item.id}
              className="rounded-xl p-6"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: 'var(--tag-bg)', color: 'var(--accent)' }}
              >
                <svg
                  width="26"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {iconPaths[item.id] ?? iconPaths.washrooms}
                </svg>
              </div>
              <h3
                className="font-display text-lg font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {item.text}
              </p>
            </article>
          ))}
        </div>

        <p
          className="mt-8 text-xs max-w-3xl leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          {t('intro')}
        </p>
      </div>
    </section>
  );
}