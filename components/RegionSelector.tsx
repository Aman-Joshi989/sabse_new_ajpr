'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRegion } from '@/components/providers/RegionProvider';
import { Globe, Check, ChevronDown } from 'lucide-react';

interface RegionSelectorProps {
  variant?: 'compact' | 'footer' | 'pill';
  className?: string;
}

export default function RegionSelector({ variant = 'compact', className = '' }: RegionSelectorProps) {
  const { region, setRegion, isIndia } = useRegion();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const regions = [
    {
      code: 'US' as const,
      label: 'United States',
      currency: 'USD ($)',
      flag: '🇺🇸',
      subtitle: 'US Startups & Fixed USD Sprints'
    },
    {
      code: 'IN' as const,
      label: 'India',
      currency: 'INR (₹)',
      flag: '🇮🇳',
      subtitle: 'Indian Founders & GST Invoicing'
    }
  ];

  const current = regions.find(r => r.code === region) || regions[0];
  const isFooter = variant === 'footer';

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 transition-all cursor-pointer shadow-2xs"
        aria-label={`${current.code} (${current.code === 'IN' ? '₹' : '$'}) - Select Region and Currency`}
        aria-expanded={isOpen}
      >
        <span className="text-sm leading-none">{current.flag}</span>
        <span className="font-bold">{current.code}</span>
        <span className="text-slate-600 dark:text-slate-300 font-normal">({current.code === 'IN' ? '₹' : '$'})</span>
        <ChevronDown className={`w-3 h-3 text-slate-600 dark:text-slate-300 transition-transform duration-200 ${isOpen ? (isFooter ? '-rotate-180' : 'rotate-180') : (isFooter ? 'rotate-180' : '')}`} />
      </button>

      {isOpen && (
        <div 
          className={`absolute z-50 w-80 max-w-[calc(100vw-32px)] rounded-2xl bg-white dark:bg-[#0a0f1c] border border-slate-200 dark:border-slate-800 shadow-2xl p-2 duration-150 ${
            isFooter
              ? 'bottom-full mb-3 left-1/2 -translate-x-1/2 sm:left-0 sm:translate-x-0 origin-bottom-left animate-in fade-in slide-in-from-bottom-2 zoom-in-95'
              : 'top-full mt-2 right-0 origin-top-right animate-in fade-in slide-in-from-top-2 zoom-in-95'
          }`}
        >
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800 mb-1.5">
            Choose Delivery Region
          </div>
          {regions.map((item) => {
            const isSelected = item.code === region;
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => {
                  setRegion(item.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300'
                    : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300'
                }`}
              >
                <span className="text-xl leading-none shrink-0">{item.flag}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {item.label}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 shrink-0">
                      {item.currency}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight whitespace-normal">
                    {item.subtitle}
                  </p>
                </div>
                {isSelected && (
                  <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

