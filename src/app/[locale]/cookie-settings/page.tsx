import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import CookieSettingsClient from './CookieSettingsClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const baseUrl = 'https://willowcreekhoodoos.com';
  const zhUrl = `${baseUrl}/cookie-settings`;
  const enUrl = `${baseUrl}/en/cookie-settings`;

  return {
    alternates: {
      canonical: zhUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'x-default': zhUrl,
      },
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
