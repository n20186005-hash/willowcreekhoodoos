import type { MetadataRoute } from 'next';
import { SITE_ORIGIN } from '@/lib/seo';

// Keep in sync with src/components/Gallery.tsx (photoCount = 15)
const galleryImages = Array.from(
  { length: 15 },
  (_, i) => `${SITE_ORIGIN}/gallery/willow-creek-hoodoos-${i + 1}.jpg`,
);

const legalPages = ['privacy-policy', 'terms-of-service', 'cookie-settings'] as const;
const contentPages = [
  'drumheller-day-trip',
  'food-and-services',
  'parking-and-directions',
  'hoodoos-trail-guide',
  'photos',
  'things-to-do-in-drumheller',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${SITE_ORIGIN}/en`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
      images: galleryImages,
    },
    {
      url: `${SITE_ORIGIN}/zh`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
      images: galleryImages,
    },
    ...contentPages.flatMap((page): MetadataRoute.Sitemap => [
      {
        url: `${SITE_ORIGIN}/en/${page}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.7,
      },
      {
        url: `${SITE_ORIGIN}/zh/${page}`,
        lastModified,
        changeFrequency: 'weekly',
        priority: 0.7,
      },
    ]),
    ...legalPages.flatMap((page): MetadataRoute.Sitemap => [
      {
        url: `${SITE_ORIGIN}/en/${page}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.3,
      },
      {
        url: `${SITE_ORIGIN}/zh/${page}`,
        lastModified,
        changeFrequency: 'monthly',
        priority: 0.3,
      },
    ]),
  ];
}
