'use client';

import { useTranslations } from 'next-intl';
import { PARKING_POLICY_URL } from '@/lib/seo';

export default function ParkingNote() {
  const t = useTranslations('parking');

  return (
    <div className="mt-3">
      <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
        {t('note')}
      </p>
      <a
        href={PARKING_POLICY_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 mt-2 text-sm font-medium hover:underline"
        style={{ color: 'var(--accent)' }}
      >
        <span>{t('policyLabel')}</span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <line x1="7" y1="17" x2="17" y2="7" />
          <polyline points="7 7 17 7 17 17" />
        </svg>
      </a>
    </div>
  );
}
