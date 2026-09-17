import { Metadata } from 'next'
import GraphicsBrandingClient from './GraphicsBrandingClient'

export const metadata: Metadata = {
    title: 'Premium Graphics & Branding Services | AJPR World',
    description: 'Transform your business with professional graphics, logo design, and digital branding. We create visual stories that connect with your audience and drive growth.',
    alternates: {
        canonical: 'https://ajprworld.com/services/graphics-branding',
    },
    openGraph: {
        title: 'Premium Graphics & Branding Services | AJPR World',
        description: 'Transform your business with professional graphics, logo design, and digital branding. We create visual stories that connect with your audience and drive growth.',
        url: 'https://ajprworld.com/services/graphics-branding',
        images: [
            {
                url: 'https://ajprworld.com/images/og/graphics-branding.jpg',
                width: 1200,
                height: 630,
                alt: 'Graphics and Branding Services by AJPR World',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Premium Graphics & Branding Services | AJPR World',
        description: 'Transform your business with professional graphics, logo design, and digital branding.',
        creator: '@ajprworld',
        images: ['https://ajprworld.com/images/og/graphics-branding.jpg']
    }
}

export default function GraphicsBrandingPage() {
    return <GraphicsBrandingClient />
}
