'use client';

import { useEffect } from 'react';

/**
 * Registers /sw.js after the page becomes interactive so the first render is
 * never blocked by service worker boot. Skipped outside production builds and
 * in browsers that don't support Service Workers.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!('serviceWorker' in navigator)) return;
    if (process.env.NODE_ENV !== 'production') return;
    if (!window.isSecureContext) return;

    const onLoad = () => {
      navigator.serviceWorker
        .register('/sw.js', { scope: '/' })
        .catch(() => {
          /* ignore — service worker is progressive enhancement */
        });
    };

    if (document.readyState === 'complete') onLoad();
    else window.addEventListener('load', onLoad, { once: true });

    return () => window.removeEventListener('load', onLoad);
  }, []);

  return null;
}