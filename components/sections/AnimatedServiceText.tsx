'use client'

import { useState, useEffect } from 'react'

interface AnimatedServiceTextProps {
    services: string[]
}

export default function AnimatedServiceText({ services }: AnimatedServiceTextProps) {
    const [currentService, setCurrentService] = useState(0)

    useEffect(() => {
        if (!services || services.length === 0) return;
        const interval = setInterval(() => {
            setCurrentService((prev) => (prev + 1) % services.length)
        }, 2500)
        return () => clearInterval(interval)
    }, [services])

    if (!services || services.length === 0) return null;

    return (
        <span
            key={currentService}
            className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 pb-4"
            style={{ animation: 'slideUpFade 0.5s ease-out forwards' }}
        >
            {services[currentService]}.
        </span>
    )
}
