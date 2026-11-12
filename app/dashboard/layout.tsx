import React from 'react'
import { Metadata } from 'next'
import FontLoader from '@/components/FontLoader'

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
}
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="font-display">
      <FontLoader />
      {children}
    </div>
  )
}
