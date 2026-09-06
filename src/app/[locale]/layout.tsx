import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata, Viewport } from 'next';
import ServiceWorkerRegister from '@/components/ServiceWorkerRegister';
import { ATTRACTION, SITE_ORIGIN, heroImageUrl } from '@/lib/seo';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: '#234d5c',
  colorScheme: 'light',
  width: 'device-width',
  initialScale: 1,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;
  const baseUrl = SITE_ORIGIN;
  const inLanguage = locale === 'zh' ? 'zh-CN' : 'en-CA';

  const zhUrl = `${baseUrl}/zh`;
  const enUrl = `${baseUrl}/en`;
  const selfUrl = locale === 'zh' ? zhUrl : enUrl;

  return {
    title: messages.meta.title,
    description: messages.meta.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh': zhUrl,
        'en': enUrl,
        'x-default': enUrl,
      },
    },
    manifest: '/manifest.webmanifest',
    icons: {
      icon: [
        { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
        { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
      apple: [
        { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      ],
      shortcut: ['/icons/icon-192.png'],
    },
    appleWebApp: {
      capable: true,
      statusBarStyle: 'default',
      title: ATTRACTION.fullName,
    },
    applicationName: ATTRACTION.fullName,
    authors: [{ name: `${ATTRACTION.fullName} Independent Tourism Research Association` }],
    generator: 'Next.js',
    keywords: [
      ATTRACTION.fullName,
      `${ATTRACTION.fullName} (${ATTRACTION.city})`,
      `${ATTRACTION.city} Hoodoos`,
      'Drumheller Hoodoos',
      'Canadian Badlands',
      'Royal Tyrrell Museum',
      'Hoodoo Trail',
      'Alberta tourism',
      ATTRACTION.shortName,
    ],
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: ATTRACTION.fullName,
      locale: locale === 'zh' ? 'zh_CN' : 'en_US',
      type: 'website',
      images: [
        {
          url: heroImageUrl,
          width: 1200,
          height: 630,
          alt: `${ATTRACTION.fullName} - Main view in ${ATTRACTION.city}, ${ATTRACTION.countryName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [heroImageUrl],
    },
    other: {
      'geo.region': `CA-${ATTRACTION.countryCode === 'CA' ? 'AB' : ''}`,
      'geo.placename': `${ATTRACTION.fullName}, ${ATTRACTION.city}, ${ATTRACTION.stateProvince}`,
      'geo.position': `${ATTRACTION.latitude};${ATTRACTION.longitude}`,
      'ICBM': `${ATTRACTION.latitude}, ${ATTRACTION.longitude}`,
      'rating': 'General',
      'distribution': 'global',
      'revisit-after': '7 days',
      'language': inLanguage,
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const ga4Id = 'G-HXM22WWPKP';

  // GA4 consent bootstrap: read cookiePrefs in localStorage to decide whether
  // analytics should fire. Defaults to "granted" if no explicit preference.
  const gaBootstrap = `
(function(){
  try {
    var prefs = JSON.parse(localStorage.getItem('cookiePrefs') || 'null');
    var granted = !(prefs && prefs.analytics === false);
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: granted ? 'granted' : 'denied'
    });
    window.gtag('js', new Date());
    window.gtag('config', '${ga4Id}', {
      anonymize_ip: true,
      send_page_view: granted
    });
  } catch (e) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function(){ window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', '${ga4Id}', { anonymize_ip: true });
  }
})();
`;

  return (
    <html lang={locale === 'zh' ? 'zh-CN' : 'en'} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* Google Analytics 4 (GA4) — measurement ID G-HXM22WWPKP */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${ga4Id}`}
        />
        <script dangerouslySetInnerHTML={{ __html: gaBootstrap }} />
        {/* PWA: app banner & web-app capable */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="application-name" content={ATTRACTION.fullName} />
        <meta name="apple-mobile-web-app-title" content={ATTRACTION.fullName} />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}