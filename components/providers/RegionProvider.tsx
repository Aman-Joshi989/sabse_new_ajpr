'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Region = 'US' | 'IN';

interface RegionContextType {
  region: Region;
  setRegion: (region: Region) => void;
  toggleRegion: () => void;
  isIndia: boolean;
  isUS: boolean;
  currency: 'USD' | 'INR';
  currencySymbol: '$' | '₹';
  formatPrice: (usdAmount: number, inrAmount?: number) => string;
}

const RegionContext = createContext<RegionContextType | undefined>(undefined);

export const RegionProvider = ({ 
  children,
  initialRegion = 'US'
}: { 
  children: React.ReactNode;
  initialRegion?: Region;
}) => {
  // Keep initial SSR & first client hydration pass identical to avoid hydration reflows.
  const [region, setRegionState] = useState<Region>(initialRegion);

  useEffect(() => {
    // 1. Check explicit localStorage
    const saved = localStorage.getItem('ajpr_region');
    if (saved === 'US' || saved === 'IN') {
      if (saved !== region) setRegionState(saved);
      return;
    }

    // 2. Check Cookie
    const cookieMatch = document.cookie.match(/ajpr_region=(US|IN)/);
    if (cookieMatch) {
      const cRegion = cookieMatch[1] as Region;
      if (cRegion !== region) setRegionState(cRegion);
      return;
    }

    // 3. Client Timezone, UTC Offset & Locale automatic trigger
    let geoTimer: ReturnType<typeof setTimeout> | undefined;
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      const offset = new Date().getTimezoneOffset(); // -330 for IST (UTC+5:30)
      const lang = navigator.language || '';
      const isIndianSystem = 
        tz.includes('Calcutta') || 
        tz.includes('Kolkata') || 
        tz.includes('India') || 
        offset === -330 || 
        lang.endsWith('-IN') ||
        lang === 'hi';

      if (isIndianSystem) {
        setRegion('IN');
        return;
      }

      // 4. Defer edge IP verification so it does not trigger network/reflow during initial LCP or Speed Index calculation.
      const runGeo = () => {
        fetch('/api/geo')
          .then(res => res.json())
          .then(data => {
            if (data?.region && (data.region === 'IN' || data.region === 'US')) {
              if (data.region !== region) {
                setRegion(data.region);
              }
            }
          })
          .catch(() => {});
      };

      if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
        (window as any).requestIdleCallback(runGeo, { timeout: 10000 });
      } else {
        geoTimer = setTimeout(runGeo, 10000);
      }
    } catch (e) {
      // Ignore detection errors
    }
    return () => {
      if (geoTimer) clearTimeout(geoTimer);
    };
  }, []);

  const setRegion = (newRegion: Region) => {
    setRegionState(newRegion);
    localStorage.setItem('ajpr_region', newRegion);
    localStorage.setItem('ajpr_currency', newRegion === 'IN' ? 'INR' : 'USD');
    document.cookie = `ajpr_region=${newRegion}; path=/; max-age=31536000`;
    // Dispatch storage event so other tabs/components sync
    window.dispatchEvent(new Event('storage'));
  };

  const toggleRegion = () => {
    const next = region === 'US' ? 'IN' : 'US';
    setRegion(next);
  };

  const isIndia = region === 'IN';
  const isUS = region === 'US';
  const currency = isIndia ? 'INR' : 'USD';
  const currencySymbol = isIndia ? '₹' : '$';

  const formatPrice = (usdAmount: number, inrAmount?: number): string => {
    if (isIndia) {
      const val = inrAmount !== undefined ? inrAmount : Math.round(usdAmount * 85);
      return `₹${val.toLocaleString('en-IN')}`;
    }
    return `$${usdAmount.toLocaleString('en-US')}`;
  };

  return (
    <RegionContext.Provider
      value={{
        region,
        setRegion,
        toggleRegion,
        isIndia,
        isUS,
        currency,
        currencySymbol,
        formatPrice
      }}
    >
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => {
  const context = useContext(RegionContext);
  if (!context) {
    // Fallback safe values during SSR or pre-mount
    return {
      region: 'US' as Region,
      setRegion: () => {},
      toggleRegion: () => {},
      isIndia: false,
      isUS: true,
      currency: 'USD' as const,
      currencySymbol: '$' as const,
      formatPrice: (usd: number) => `$${usd.toLocaleString('en-US')}`
    };
  }
  return context;
};

