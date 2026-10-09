import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { SITE_ORIGIN } from '@/lib/seo';
import PhotosView from '@/components/PhotosView';

const SLUG = 'photos';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const zhUrl = `${SITE_ORIGIN}/zh/${SLUG}`;
  const enUrl = `${SITE_ORIGIN}/en/${SLUG}`;
  const selfUrl = locale === 'zh' ? zhUrl : enUrl;
  const ns = messages?.photos?.meta;

  return {
    title: ns?.title ?? messages?.meta?.title,
    description: ns?.description ?? messages?.meta?.description,
    alternates: {
      canonical: selfUrl,
      languages: {
        zh: zhUrl,
        en: enUrl,
        'x-default': enUrl,
      },
    },
    openGraph: {
      title: ns?.title ?? messages?.meta?.title,
      description: ns?.description ?? messages?.meta?.description,
      url: selfUrl,
    },
  };
}

export default async function PhotosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PhotosView />;
}
