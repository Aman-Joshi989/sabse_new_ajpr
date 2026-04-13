"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";

interface MeteorsProps {
  number?: number;
  className?: string;
}

export const Meteors = ({ number = 20, className }: MeteorsProps) => {
  const [meteors, setMeteors] = useState<
    { id: number; left: string; delay: string; duration: string }[]
  >([]);

  useEffect(() => {
    const generateMeteors = () => {
      return new Array(number).fill(true).map((_, idx) => ({
        id: idx,
        left: Math.floor(Math.random() * (100 - -100) + -100) + "%",
        delay: (Math.random() * (0.8 - 0.2) + 0.2).toFixed(2) + "s",
        duration: Math.floor(Math.random() * (10 - 2) + 2) + "s",
      }));
    };
    setMeteors(generateMeteors());
  }, [number]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      {meteors.map((meteor) => (
        <span
          key={meteor.id}
          className={clsx(
            "animate-meteor-effect absolute h-0.5 w-0.5 rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10] rotate-[215deg]",
            "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[1px] before:bg-gradient-to-r before:from-[#64748b] before:to-transparent",
            className
          )}
          style={{
            top: 0,
            left: meteor.left,
            animationDelay: meteor.delay,
            animationDuration: meteor.duration,
          }}
        />
      ))}
    </div>
  );
};
