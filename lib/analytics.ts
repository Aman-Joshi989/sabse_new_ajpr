'use client';

/**
 * Centralized Conversion & Event Tracking Utility
 * Safely triggers Google Analytics 4 (gtag), Google Tag Manager (dataLayer),
 * and PostHog (if present on window).
 */

interface EventParams {
  event_category?: string;
  event_label?: string;
  value?: number;
  [key: string]: any;
}

export function trackEvent(eventName: string, params: EventParams = {}) {
  if (typeof window === 'undefined') return;

  try {
    // 1. Google Analytics 4 (gtag.js)
    if (typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', eventName, params);
    }

    // 2. Google Tag Manager (dataLayer)
    if (Array.isArray((window as any).dataLayer)) {
      (window as any).dataLayer.push({
        event: eventName,
        ...params,
        timestamp: new Date().toISOString(),
      });
    }

    // 3. PostHog (if initialized)
    if ((window as any).posthog && typeof (window as any).posthog.capture === 'function') {
      (window as any).posthog.capture(eventName, params);
    }
  } catch (err) {
    // Fail silently in production to never disrupt user navigation
    console.debug('Analytics tracking error:', err);
  }
}

/**
 * Dedicated high-intent conversion event for "Book Strategy Call" triggers.
 */
export function trackBookCall(source: string = 'unknown_source') {
  trackEvent('book_strategy_call_click', {
    event_category: 'conversion',
    event_label: source,
    page_location: typeof window !== 'undefined' ? window.location.href : '',
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

