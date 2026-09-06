import { useTranslations, useMessages } from 'next-intl';

export default function Intro() {
  const t = useTranslations('intro');
  const tOff = useTranslations('officialManagement');
  const messages = useMessages() as any;
  const items: string[] = messages?.intro?.visitGuide?.items || [];
  const alsoKnownAsItems: string[] = messages?.intro?.alsoKnownAs?.items || [];
  const breadcrumbItems: string[] = messages?.intro?.breadcrumbItems || [];

  return (
    <section className="section-padding">
      <div className="max-w-4xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-6"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        {/* Semantic equivalence statement (entity ↔ short/common name) */}
        {messages?.intro?.entityIntro && (
          <p
            className="text-base sm:text-lg leading-relaxed mb-6 font-medium"
            style={{ color: 'var(--text-primary)' }}
          >
            {t('entityIntro')}
          </p>
        )}

        {/* Geographic breadcrumb: Willow Creek Hoodoos → City → State → Country */}
        {breadcrumbItems.length > 0 && (
          <nav
            aria-label={t('breadcrumbLabel')}
            className="mb-8 text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            <ol className="flex flex-wrap items-center gap-x-1 gap-y-1">
              {breadcrumbItems.map((segment, i) => (
                <li key={i} className="flex items-center gap-1">
                  {i > 0 && (
                    <span aria-hidden="true" style={{ color: 'var(--text-muted)' }}>
                      →
                    </span>
                  )}
                  <span
                    className={i === 0 ? 'font-semibold' : ''}
                    style={{ color: i === 0 ? 'var(--accent)' : 'var(--text-secondary)' }}
                  >
                    {segment}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        )}

        <p
          className="text-lg leading-relaxed mb-12"
          style={{ color: 'var(--text-secondary)' }}
        >
          {t('description')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('visitGuide.title')}
            </h3>
            <ul className="space-y-3">
              {items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('alsoKnownAs.title')}
            </h3>
            <ul className="space-y-3">
              {alsoKnownAsItems.map((keyword, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  <span style={{ color: 'var(--text-secondary)' }}>{keyword}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Nearby landmarks semantic cluster */}
        {messages?.intro?.nearbyIntro && (
          <div
            className="mt-8 rounded-xl p-6 sm:p-8"
            style={{ background: 'var(--bg-tertiary)' }}
          >
            <h3
              className="font-display text-xl font-semibold mb-3"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('nearbyTitle')}
            </h3>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              {t('nearbyIntro')}
            </p>
          </div>
        )}

        <div className="mt-12 p-6 sm:p-8 rounded-xl border border-[var(--accent)]" style={{ background: 'var(--bg-tertiary)' }}>
          <h2 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
            {tOff('title')}
          </h2>
          <div className="text-base leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--text-secondary)' }}>
            {tOff('text')}
          </div>
        </div>
      </div>
    </section>
  );
}