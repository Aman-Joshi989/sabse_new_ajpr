'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const ExitIntentPopup = dynamic(() => import('@/components/ExitIntentPopup'), { ssr: false });
const HermesChatWidget = dynamic(() => import('@/components/HermesChatWidget'), { ssr: false });

/**
 * Defers heavy interactive floating widgets (AI chat SDK, exit-intent dialog) until
 * browser idle or first user interaction so initial homepage JS/LCP stays minimal.
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

    let idleId: number | undefined;
    let timerId: ReturnType<typeof setTimeout> | undefined;

    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      idleId = (window as any).requestIdleCallback(() => activate(), { timeout: 3500 });
    } else {
      timerId = setTimeout(activate, 3000);
    }

    return () => {
      window.removeEventListener('pointerdown', activate);
      window.removeEventListener('keydown', activate);
      window.removeEventListener('scroll', activate);
      if (idleId !== undefined && 'cancelIdleCallback' in window) {
        (window as any).cancelIdleCallback(idleId);
      }
      if (timerId !== undefined) clearTimeout(timerId);
    };
  }, []);

  if (!shouldMount) return null;

  return (
    <>
      <ExitIntentPopup />
      <HermesChatWidget />
    </>
  );
}
