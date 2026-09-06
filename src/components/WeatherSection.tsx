import { getLocale, getTranslations } from 'next-intl/server';
import { ATTRACTION } from '@/lib/seo';

type CurrentWeather = {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  weather_code: number;
  wind_speed_10m: number;
};

type DailyWeather = {
  time: string[];
  weather_code: number[];
  temperature_2m_max: number[];
  temperature_2m_min: number[];
  precipitation_probability_max: (number | null)[];
  uv_index_max: (number | null)[];
};

type WeatherResponse = {
  current?: CurrentWeather;
  daily?: DailyWeather;
};

const WEATHER_TIMEZONE = 'America/Edmonton';

const CODE_THUNDER = [95, 96, 99];
const CODE_FREEZING_RAIN = [66, 67];
const CODE_HEAVY_RAIN = [63, 65, 82];
const CODE_LIGHT_RAIN = [51, 53, 55, 61, 80, 81];
const CODE_SNOW = [71, 73, 75, 77, 85, 86];
const CODE_FOG = [45, 48];
const CODE_CLEAR = [0, 1, 2];

async function fetchWeather(): Promise<WeatherResponse | null> {
  const params = new URLSearchParams({
    latitude: String(ATTRACTION.latitude),
    longitude: String(ATTRACTION.longitude),
    current: 'temperature_2m,apparent_temperature,weather_code,wind_speed_10m',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max',
    timezone: WEATHER_TIMEZONE,
    forecast_days: '7',
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
    precipitation_unit: 'mm',
  });

  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?${params.toString()}`,
      { next: { revalidate: 1800 } },
    );
    if (!res.ok) return null;
    const data = (await res.json()) as WeatherResponse;
    if (!data.current || !data.daily) return null;
    return data;
  } catch {
    return null;
  }
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div
      className="flex-1 rounded-lg px-4 py-3 text-center"
      style={{ background: 'var(--bg-tertiary)' }}
    >
      <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
        {label}
      </p>
      <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
        {value}
      </p>
    </div>
  );
}

function SectionIcon({ kind }: { kind: 'clothing' | 'plan' | 'items' | 'risk' }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  if (kind === 'clothing') {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M20.4 8.1 17 4.5h-2.1a2.9 2.9 0 0 0-5.8 0H7L3.6 8.1 6 10.4l1.6-1.5V20h8.8V8.9L18 10.4z" />
      </svg>
    );
  }
  if (kind === 'plan') {
    return (
      <svg {...common} aria-hidden="true">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3.5 2" />
      </svg>
    );
  }
  if (kind === 'items') {
    return (
      <svg {...common} aria-hidden="true">
        <path d="M6 7h12a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z" />
        <path d="M8 7V5a4 4 0 0 1 8 0v2" />
        <path d="M6 11h12" />
      </svg>
    );
  }
  return (
    <svg {...common} aria-hidden="true">
      <path d="M12 3 2.5 20h19z" />
      <path d="M12 10v4" />
      <path d="M12 17.5h.01" />
    </svg>
  );
}

export default async function WeatherSection() {
  const t = await getTranslations('weather');
  const at = await getTranslations('advice');
  const locale = await getLocale();
  const data = await fetchWeather();

  const round = (n: number | undefined | null) =>
    typeof n === 'number' ? `${Math.round(n)}°` : '--';

  const conditionLabel = (code: number | undefined | null) =>
    typeof code === 'number' ? t(`codes.${String(code)}`) : '';

  const updatedAt = data?.current?.time
    ? new Intl.DateTimeFormat(locale, {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: WEATHER_TIMEZONE,
      }).format(new Date(data.current.time))
    : '';

  const dayLabel = (dateStr: string) =>
    new Intl.DateTimeFormat(locale, {
      weekday: 'short',
      month: 'numeric',
      day: 'numeric',
      timeZone: WEATHER_TIMEZONE,
    }).format(new Date(`${dateStr}T12:00:00`));

  const days = data?.daily?.time ?? [];
  const current = data?.current;
  const today = data?.daily;

  // ---------- Advice engine (only renders matching, tourist-friendly lines) ----------
  const currentCode = current?.weather_code;
  const dayCode = today?.weather_code[0];
  const maxT = today?.temperature_2m_max[0];
  const minT = today?.temperature_2m_min[0];
  const ppn = today?.precipitation_probability_max[0];
  const uv = today?.uv_index_max[0];
  const wind = current?.wind_speed_10m;

  const inCodes = (code: number | undefined, list: number[]) =>
    typeof code === 'number' && list.includes(code);

  const lists: { clothing: string[]; plan: string[]; items: string[]; risk: string[] } = {
    clothing: [],
    plan: [],
    items: [],
    risk: [],
  };
  const has = (path: string) => at.has(path as any);
  const fire = (rule: string) => {
    (['clothing', 'plan', 'items', 'risk'] as const).forEach((cat) => {
      const path = `rules.${rule}.${cat}`;
      if (has(path)) lists[cat].push(at(path));
    });
  };

  if (typeof dayCode === 'number') {
    if (inCodes(dayCode, CODE_THUNDER)) {
      fire('thunder');
    } else if (inCodes(dayCode, CODE_FREEZING_RAIN)) {
      fire('freezingRain');
    } else if (inCodes(dayCode, CODE_HEAVY_RAIN)) {
      fire('heavyRain');
    } else if (inCodes(dayCode, CODE_LIGHT_RAIN)) {
      fire('lightRain');
    } else if (inCodes(dayCode, CODE_SNOW)) {
      fire('snow');
    } else if (inCodes(dayCode, CODE_FOG)) {
      fire('fog');
    } else if (inCodes(dayCode, CODE_CLEAR)) {
      fire('sunny');
    } else {
      fire('cloudy');
    }
  }

  const activelyWet =
    inCodes(dayCode, CODE_THUNDER) ||
    inCodes(dayCode, CODE_FREEZING_RAIN) ||
    inCodes(dayCode, CODE_HEAVY_RAIN) ||
    inCodes(dayCode, CODE_LIGHT_RAIN) ||
    inCodes(dayCode, CODE_SNOW);

  if (typeof ppn === 'number' && ppn >= 60 && !activelyWet) fire('precip60');

  if (typeof maxT === 'number') {
    if (maxT >= 32) fire('hot');
    if (maxT <= 10) fire('cool');
  }
  if (typeof minT === 'number' && typeof maxT === 'number' && maxT - minT > 8) {
    fire('diurnal');
  }
  if (typeof uv === 'number' && uv >= 5) fire('uv');
  if (typeof wind === 'number') {
    if (wind >= 50) fire('windStrong');
    else if (wind >= 29) fire('windMedium');
  }

  const unique = (arr: string[]) => [...new Set(arr)];
  type AdviceSection = { key: 'clothing' | 'plan' | 'items'; lines: string[] };
  const allSections: AdviceSection[] = [
    { key: 'clothing', lines: unique(lists.clothing) },
    { key: 'plan', lines: unique(lists.plan) },
    { key: 'items', lines: unique(lists.items) },
  ];
  const sections = allSections.filter((s) => s.lines.length > 0);
  const risks = unique(lists.risk);
  const hasAdvice = risks.length > 0 || sections.length > 0;

  const uvWord = (value: number | null | undefined) => {
    if (typeof value !== 'number') return '--';
    if (value >= 8) return t('uvVeryHigh');
    if (value >= 5) return t('uvHigh');
    if (value >= 3) return t('uvModerate');
    return t('uvLow');
  };

  return (
    <section id="weather" className="section-padding" style={{ background: 'var(--bg-primary)' }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-2"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-6 text-sm" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-8" style={{ background: 'var(--accent)' }} />

        {current && today ? (
          <>
            {/* Current conditions */}
            <div
              className="rounded-2xl p-6 sm:p-8 mb-6"
              style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="md:min-w-[220px]">
                  <p className="text-sm mb-1" style={{ color: 'var(--accent)' }}>
                    {t('now')}
                  </p>
                  <p
                    className="font-display leading-none"
                    style={{ fontSize: '4.5rem', color: 'var(--text-primary)' }}
                  >
                    {round(current.temperature_2m)}
                    <span style={{ fontSize: '2rem' }}>C</span>
                  </p>
                  <p className="mt-2 font-medium" style={{ color: 'var(--text-primary)' }}>
                    {conditionLabel(currentCode)}
                  </p>
                  {updatedAt && (
                    <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                      {t('updated')} {updatedAt}
                    </p>
                  )}
                </div>
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  <Stat label={t('feelsLike')} value={round(current.apparent_temperature)} />
                  <Stat label={t('wind')} value={`${Math.round(current.wind_speed_10m)} km/h`} />
                  <Stat
                    label={t('precipChance')}
                    value={
                      typeof ppn === 'number' ? `${Math.round(ppn)}%` : '--'
                    }
                  />
                  <Stat label={t('uvIndex')} value={uvWord(uv)} />
                  <Stat
                    label={t('todayRange')}
                    value={
                      typeof maxT === 'number' && typeof minT === 'number'
                        ? `${Math.round(maxT)}° ~ ${Math.round(minT)}°`
                        : '--'
                    }
                  />
                </div>
              </div>
            </div>

            {/* Smart advice — shows only what actually matches today's weather */}
            {hasAdvice && (
              <div
                className="rounded-2xl p-6 sm:p-7 mb-8"
                style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
              >
                <div className="flex items-baseline gap-3 mb-1">
                  <h3
                    className="font-display text-lg sm:text-xl font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {at('title')}
                  </h3>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {at('subtitle')}
                  </span>
                </div>

                {risks.length > 0 && (
                  <div
                    className="mt-4 mb-1 rounded-xl px-4 py-3"
                    style={{
                      background: 'rgba(220,38,38,0.07)',
                      borderLeft: '4px solid #dc2626',
                    }}
                  >
                    <p
                      className="text-sm font-semibold mb-1 flex items-center gap-2"
                      style={{ color: '#dc2626' }}
                    >
                      <SectionIcon kind="risk" />
                      {at('riskTitle')}
                    </p>
                    <ul className="space-y-1">
                      {risks.map((line) => (
                        <li
                          key={line}
                          className="text-sm leading-relaxed"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-3">
                  {sections.map((section) => (
                    <div
                      key={section.key}
                      className="flex flex-col sm:flex-row gap-3 py-3 first:pt-1 last:pb-0 border-t"
                      style={{ borderColor: 'var(--border-color)' }}
                    >
                      <div
                        className="flex items-center gap-2 sm:w-32 sm:shrink-0"
                        style={{ color: 'var(--accent)' }}
                      >
                        <SectionIcon kind={section.key} />
                        <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
                          {at(`sections.${section.key}`)}
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {section.lines.map((line) => (
                          <li
                            key={line}
                            className="text-sm leading-relaxed"
                            style={{ color: 'var(--text-secondary)' }}
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 7-day forecast */}
            <h3
              className="font-display text-xl font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              {t('forecastTitle')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
              {days.map((day, i) => (
                <div
                  key={day}
                  className="rounded-xl p-4 text-center"
                  style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}
                >
                  <p className="text-xs font-semibold mb-3" style={{ color: 'var(--accent)' }}>
                    {dayLabel(day)}
                  </p>
                  <p
                    className="text-sm mb-2 leading-snug min-h-[2.5rem]"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {conditionLabel(today.weather_code[i])}
                  </p>
                  <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                    {round(today.temperature_2m_max[i])}
                    <span className="mx-1" style={{ color: 'var(--text-muted)' }}>/</span>
                    {round(today.temperature_2m_min[i])}
                  </p>
                  {typeof today.precipitation_probability_max[i] === 'number' && (
                    <p className="mt-1 text-xs" style={{ color: 'var(--text-muted)' }}>
                      {today.precipitation_probability_max[i]}%
                    </p>
                  )}
                </div>
              ))}
            </div>
          </>
        ) : (
          <div
            className="rounded-2xl p-8 text-center text-sm"
            style={{
              background: 'var(--card-bg)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
            }}
          >
            {t('unavailable')}
          </div>
        )}

        <p className="mt-6 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('disclaimer')}
        </p>
      </div>
    </section>
  );
}
