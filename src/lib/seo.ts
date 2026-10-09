// Centralised, template-driven entity data for the Willow Creek Hoodoos site.
// Drives JSON-LD, OG meta tags and the semantic body content described in the
// "single-attraction SEO entity binding" template.

export const ATTRACTION = {
  domain: 'willowcreekhoodoos.com',
  fullName: 'Willow Creek Hoodoos',
  shortName: 'Hoodoos of Drumheller',
  city: 'Drumheller',
  stateProvince: 'Alberta',
  countryName: 'Canada',
  countryCode: 'CA',
  postalCode: 'T0J 0Y0',
  latitude: 51.3806406,
  longitude: -112.5342411,
  plusCode: '9FJ8+78 Drumheller, Alberta, Canada',
  phone: '+1 403-823-7741',
  mapsShareUrl: 'https://maps.app.goo.gl/zbAfMgVchpXzbtH88',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4260.610218247472!2d-112.5342411!3d51.3806406!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x537310bbb13aab47%3A0x413e22da4a7149cc!2sWillow%20Creek%20Hoodoos!5e1!3m2!1sen!2s!4v1788712369946!5m2!1sen!2s',
  rating: '4.6',
  reviewCount: 6642,
  reviewCheckedDate: 'October 2026',
  description:
    'Popular hike through a unique landscape featuring otherworldly sandstone pillars with rock caps.',
  nearbyLandmarks: [
    'Royal Tyrrell Museum of Palaeontology',
    'Hoodoo Trail',
    'Horseshoe Canyon',
  ],
  officialTourismUrl: 'https://www.travelalberta.com/listings/hoodoos-and-hoodoo-trail-4517',
  officialSiteUrl: 'https://www.willowcreekhoodoos.com/',
} as const;

export const SITE_ORIGIN = `https://${ATTRACTION.domain}`;

// Official Town of Drumheller visitor parking policy. The Hoodoos lot is a
// paid lot during the designated visitor season — link here so visitors can
// confirm current rates, hours and payment instructions before arriving.
export const PARKING_POLICY_URL =
  'https://www.drumheller.ca/live/pay-parking/visitor-parking';

export const heroImageUrl = `${SITE_ORIGIN}/images/hero.jpg`;

export function touristAttractionSchema(opts: { url: string; inLanguage: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristAttraction',
    '@id': `${opts.url}#attraction`,
    name: ATTRACTION.fullName,
    alternateName: [
      ATTRACTION.shortName,
      `${ATTRACTION.city} ${ATTRACTION.fullName}`,
      'Willow Creek Hoodoos (Drumheller)',
    ],
    description:
      `${ATTRACTION.fullName} (${ATTRACTION.city}) is the iconic sandstone hoodoo formation in the Canadian Badlands, Alberta, Canada.`,
    url: opts.url,
    image: [heroImageUrl],
    isAccessibleForFree: true,
    publicAccess: true,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `Coulee Way, ${ATTRACTION.plusCode}`,
      addressLocality: ATTRACTION.city,
      addressRegion: ATTRACTION.stateProvince,
      postalCode: ATTRACTION.postalCode,
      addressCountry: ATTRACTION.countryCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: ATTRACTION.latitude,
      longitude: ATTRACTION.longitude,
    },
    telephone: ATTRACTION.phone,
    hasMap: ATTRACTION.mapsShareUrl,
    availableLanguage: [
      { '@type': 'Language', name: 'English', alternateName: 'en' },
      { '@type': 'Language', name: 'Chinese', alternateName: 'zh' },
    ],
    inLanguage: opts.inLanguage,
    sameAs: [
      ATTRACTION.mapsShareUrl,
      ATTRACTION.officialSiteUrl,
      ATTRACTION.officialTourismUrl,
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: ATTRACTION.rating,
      reviewCount: ATTRACTION.reviewCount,
      bestRating: '5',
      worstRating: '1',
    },
    touristType: ['Nature traveller', 'Family', 'Photographer', 'Geotourist'],
    isPartOf: {
      '@type': 'AdministrativeArea',
      name: `${ATTRACTION.city}, ${ATTRACTION.stateProvince}, ${ATTRACTION.countryName}`,
    },
  } as const;
}

export function faqSchema(
  faqs: Array<{ question: string; answer: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ question, answer }) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answer,
      },
    })),
  } as const;
}

export function breadcrumbSchema(items: Array<{ name: string; url?: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  } as const;
}