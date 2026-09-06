import { useTranslations, useMessages } from 'next-intl';

type KnowledgeSection = {
  id: string;
  title: string;
  content: string;
};

export default function InfoSection() {
  const t = useTranslations('knowledge');
  const messages = useMessages() as any;
  const sections = (messages?.knowledge?.sections || []) as KnowledgeSection[];

  return (
    <section id="science" className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
      <div className="max-w-6xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2 text-center"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 text-sm text-center max-w-2xl mx-auto" style={{ color: 'var(--text-muted)' }}>
          {messages?.knowledge?.subtitle}
        </p>
        <div className="w-12 h-0.5 mb-12 mx-auto" style={{ background: 'var(--accent)' }} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((section, index) => (
            <article
              key={section.id}
              className="rounded-2xl p-7 sm:p-8 flex flex-col"
              style={{
                background: 'var(--card-bg)',
                border: '1px solid var(--border-color)',
                boxShadow: 'var(--card-shadow)',
              }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, '0')}
                </div>
                <h3
                  className="font-display text-xl sm:text-2xl font-semibold leading-snug"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {section.title}
                </h3>
              </div>
              <div className="space-y-4">
                {section.content.split('\n\n').map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}