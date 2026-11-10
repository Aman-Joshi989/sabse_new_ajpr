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

export const RegionProvider = ({ children }: { children: React.ReactNode }) => {
  const [region, setRegionState] = useState<Region>('US');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // 1. Check localStorage
    const saved = localStorage.getItem('ajpr_region');
    if (saved === 'US' || saved === 'IN') {
      setRegionState(saved);
      return;
    }

    // 2. Check Cookie
    const cookieMatch = document.cookie.match(/ajpr_region=(US|IN)/);
    if (cookieMatch) {
      setRegionState(cookieMatch[1] as Region);
      return;
    }

    // 3. Client Timezone & Locale auto-detection
    try {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz.includes('Calcutta') || tz.includes('Kolkata') || tz.includes('India')) {
        setRegionState('IN');
        localStorage.setItem('ajpr_region', 'IN');
        localStorage.setItem('ajpr_currency', 'INR');
        document.cookie = 'ajpr_region=IN; path=/; max-age=31536000';
        return;
      }

      const lang = navigator.language || '';
      if (lang.endsWith('-IN')) {
        setRegionState('IN');
        localStorage.setItem('ajpr_region', 'IN');
        localStorage.setItem('ajpr_currency', 'INR');
        document.cookie = 'ajpr_region=IN; path=/; max-age=31536000';
        return;
      }
    } catch (e) {
      // Ignore detection errors
    }

    // Default to US
    setRegionState('US');
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
