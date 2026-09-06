import { getMessages, setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import InfoSection from '@/components/InfoSection';
import RouteSection from '@/components/RouteSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import MapEmbed from '@/components/MapEmbed';
import WeatherSection from '@/components/WeatherSection';
import AmenitiesSection from '@/components/AmenitiesSection';
import FaqSection from '@/components/FaqSection';
import SourcesSection from '@/components/SourcesSection';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import {
  ATTRACTION,
  SITE_ORIGIN,
  touristAttractionSchema,
  faqSchema,
  breadcrumbSchema,
} from '@/lib/seo';

// Revalidate the page every 30 minutes so live weather stays reasonably fresh.
export const revalidate = 1800;

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  const inLanguage = locale === 'zh' ? 'zh-CN' : 'en-CA';
  const selfUrl = `${SITE_ORIGIN}/${locale}`;
  const tourism = touristAttractionSchema({ url: selfUrl, inLanguage });

  const faqItems = (messages as any)?.faq?.items ?? [];
  const faqs = faqSchema(
    (faqItems as Array<{ question: string; answer: string }>).map((f) => ({
      question: f.question,
      answer: f.answer,
    })),
  );

  const breadcrumbs = breadcrumbSchema([
    { name: 'Willow Creek Hoodoos', url: selfUrl },
    { name: 'Drumheller', url: ATTRACTION.mapsShareUrl },
    { name: 'Alberta' },
    { name: 'Canada' },
  ]);

  return (
    <>
      <Header />
      <main>
        <Hero />
        <Intro />
        <BasicInfo />
        <HoursSection />
        <TicketsSection />
        <TransportSection />
        <InfoSection />
        <RouteSection />
        <Gallery />
        <Reviews />
        <MapEmbed />
        <WeatherSection />
        <AmenitiesSection />
        <FaqSection />
        <SourcesSection />
      </main>
      <Footer />

      {/* Structured data: entity, FAQ, geographic breadcrumb */}
      <JsonLd data={tourism} />
      <JsonLd data={faqs} />
      <JsonLd data={breadcrumbs} />
    </>
  );
}