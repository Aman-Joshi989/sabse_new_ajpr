'use client'

import { useState, useEffect } from 'react'

const ELITE_ENGINEERING_SERVICES = [
  "Autonomous AI Systems",
  "Next.js Web Platforms",
  "Custom SaaS MVPs",
  "Enterprise Automation",
  "High-Velocity Tech Stacks"
];

interface AnimatedServiceTextProps {
  services?: string[]
}

export default function AnimatedServiceText({ services }: AnimatedServiceTextProps) {
  const [currentService, setCurrentService] = useState(0);

  // Filter out low-ticket or awkward services (e.g. maintenance, branding)
  const filteredServices = (services && services.length > 0)
    ? services
        .filter(s => {
          const lower = s.toLowerCase();
          return !lower.includes('maintenance') && 
                 !lower.includes('security') &&
                 !lower.includes('branding') && 
                 !lower.includes('graphics') &&
                 !lower.includes('cost');
        })
        .map(s => {
          // Normalize suffixes
          return s.replace(/\.+$/, '').trim();
        })
    : [];

  const activeList = filteredServices.length >= 3 ? filteredServices : ELITE_ENGINEERING_SERVICES;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentService((prev) => (prev + 1) % activeList.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [activeList.length]);

  return (
    <span
      key={currentService}
      className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-cyan-500 dark:from-blue-400 dark:via-indigo-300 dark:to-cyan-300 pb-2"
      style={{ animation: 'heroSlideFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
    >
      {activeList[currentService]}.
    </span>
  );
}
