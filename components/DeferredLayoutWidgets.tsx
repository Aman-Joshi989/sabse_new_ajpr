'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import Script from 'next/script';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

const ExitIntentPopup = dynamic(() => import('@/components/ExitIntentPopup'), { ssr: false });
const HermesChatWidget = dynamic(() => import('@/components/HermesChatWidget'), { ssr: false });
const Toaster = dynamic(() => import('sonner').then((m) => m.Toaster), { ssr: false });

/**
 * Defers heavy interactive floating widgets (AI chat SDK, exit-intent dialog, toaster)
 * and third-party marketing/analytics scripts until first user interaction or idle fallback
 * so initial homepage JS, main-thread blocking time, and LCP stay minimal.
 */
export default function DeferredLayoutWidgets() {
  const [shouldMount, setShouldMount] = useState(false);

  useEffect(() => {
    let activated = false;
    const activate = () => {
      if (activated) return;
      activated = true;
      setShouldMount(true);
    };

    const opts = { once: true, passive: true } as AddEventListenerOptions;
    window.addEventListener('pointerdown', activate, opts);
    window.addEventListener('keydown', activate, { once: true });
    window.addEventListener('scroll', activate, opts);
    window.addEventListener('mousemove', activate, opts);
    window.addEventListener('touchstart', activate, opts);

    const timerId = setTimeout(activate, 15000);

    return () => {
      window.removeEventListener('pointerdown', activate);
      window.removeEventListener('keydown', activate);
      window.removeEventListener('scroll', activate);
      window.removeEventListener('mousemove', activate);
      window.removeEventListener('touchstart', activate);
      clearTimeout(timerId);
    };
  }, []);

  if (!shouldMount) return null;

  return (
    <>
      <ExitIntentPopup />
      <HermesChatWidget />
      <Toaster />
      <Analytics />
      <SpeedInsights />
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-NCWB8DWL');
          `,
        }}
      />
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-RQ61F2W65K"
      />
      <Script
        id="ga4-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RQ61F2W65K');
          `,
        }}
      />
      <Script
        id="ahrefs-analytics"
        src="/analytics/ahrefs.js"
        data-key="NBGEPf0K5JrRzkOhDpu04A"
        data-api="https://analytics.ahrefs.com/api/event"
        data-error="https://analytics.ahrefs.com/api/error"
        strategy="afterInteractive"
        async
      />
    </>
  );
}

