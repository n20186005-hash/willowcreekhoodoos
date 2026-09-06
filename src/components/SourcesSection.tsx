import { useTranslations, useMessages } from 'next-intl';

type Source = {
  name: string;
  url: string;
  description?: string;
};

export default function SourcesSection() {
  const t = useTranslations('sources');
  const messages = useMessages() as any;
  const items: Source[] = (messages?.sources?.items || []) as Source[];

  return (
    <section
      id="sources"
      className="section-padding"
      style={{ background: 'var(--bg-tertiary)' }}
      aria-labelledby="sources-heading"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          id="sources-heading"
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('description')}
        </p>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        <ul className="space-y-4">
          {items.map((source, i) => (
            <li
              key={i}
              className="rounded-xl p-5"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
              }}
            >
              <a
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-display text-lg font-semibold hover:underline"
                style={{ color: 'var(--accent)' }}
              >
                {source.name}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="inline-block ml-1 align-baseline"
                  aria-hidden="true"
                >
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
              {source.description && (
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {source.description}
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}