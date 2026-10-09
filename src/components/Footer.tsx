import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  const locale = useLocale();
  const prefix = `/${locale}`;

  return (
    <footer
      className="py-12 px-4 sm:px-6"
      style={{ background: 'var(--bg-tertiary)', borderTop: '1px solid var(--border-color)' }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mb-8">
          <div className="max-w-md">
            <h3 className="font-display text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              Willow Creek Hoodoos
            </h3>
            <p className="text-xs mb-4" style={{ color: 'var(--text-muted)' }}>
              {t('officialResourcesTitle')}
            </p>
            <div className="flex flex-col gap-2">
              <a href="https://hermis.alberta.ca/ARHP/Details.aspx?DeptID=1&ObjectID=4665-0062" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {locale === 'zh' ? '阿尔伯塔省历史遗址名录' : 'Alberta Historic Resources Act'}
              </a>
              <a href="https://tyrrellmuseum.com/whats_on/off_site_experiences/hoodoos" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {locale === 'zh' ? '皇家泰瑞尔古生物博物馆' : 'Royal Tyrrell Museum'}
              </a>
              <a href="https://www.travelalberta.com/listings/hoodoos-and-hoodoo-trail-4517" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {locale === 'zh' ? '阿尔伯塔省旅游' : 'Travel Alberta'}
              </a>
              <a href="https://open.alberta.ca/publications/h09" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {locale === 'zh' ? '阿尔伯塔省开放出版物库' : 'Alberta Open Data' }
              </a>
              <a href="https://weather.gc.ca/en/location/index.html?coords=50.117,-113.769" target="_blank" rel="noopener noreferrer" className="hover:underline text-sm" style={{ color: 'var(--accent)' }}>
                {locale === 'zh' ? '加拿大环境' : 'Environment Canada'}
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 text-sm mt-4 sm:mt-0">
            <p className="font-medium" style={{ color: 'var(--text-secondary)' }}>{t('guidesTitle')}</p>
            <a href={`${prefix}/drumheller-day-trip`} className="hover:underline" style={{ color: 'var(--accent)' }}>
              {t('dayTripGuide')}
            </a>
            <a href={`${prefix}/food-and-services`} className="hover:underline" style={{ color: 'var(--accent)' }}>
              {t('foodGuide')}
            </a>
            <a href={`${prefix}/parking-and-directions`} className="hover:underline" style={{ color: 'var(--accent)' }}>
              {t('parkingGuide')}
            </a>
            <a href={`${prefix}/hoodoos-trail-guide`} className="hover:underline" style={{ color: 'var(--accent)' }}>
              {t('trailGuide')}
            </a>
            <a href={`${prefix}/photos`} className="hover:underline" style={{ color: 'var(--accent)' }}>
              {t('photosGuide')}
            </a>
            <a href={`${prefix}/things-to-do-in-drumheller`} className="hover:underline" style={{ color: 'var(--accent)' }}>
              {t('thingsToDoGuide')}
            </a>
            <div className="flex flex-wrap gap-4 pt-2">
              <a href={`${prefix}/privacy-policy`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
                {t('privacy')}
              </a>
              <a href={`${prefix}/terms-of-service`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
                {t('terms')}
              </a>
              <a href={`${prefix}/cookie-settings`} style={{ color: 'var(--text-secondary)' }} className="hover:underline">
                {t('cookies')}
              </a>
            </div>
          </div>
        </div>

        <div
          className="pt-6 text-center text-sm space-y-4"
          style={{ borderTop: '1px solid var(--border-color)', color: 'var(--text-muted)' }}
        >
          <p>{t('rights')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('disclaimer')}</p>
          <p className="text-xs max-w-3xl mx-auto leading-relaxed">{t('imageCopyright')}</p>
        </div>
      </div>
    </footer>
  );
}
