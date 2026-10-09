import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh', 'en'],
  defaultLocale: 'en',
  localePrefix: {
    mode: 'always',
  },
  pathnames: {
    '/': '/',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service',
    '/cookie-settings': '/cookie-settings',
    '/drumheller-day-trip': '/drumheller-day-trip',
    '/food-and-services': '/food-and-services',
    '/parking-and-directions': '/parking-and-directions',
    '/hoodoos-trail-guide': '/hoodoos-trail-guide',
    '/photos': '/photos',
    '/things-to-do-in-drumheller': '/things-to-do-in-drumheller',
  },
});

export type Locale = (typeof routing.locales)[number];
