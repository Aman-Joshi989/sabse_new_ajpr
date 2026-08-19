import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Web Design & SEO for Roofing Contractors | AJPR World',
    description: 'Double your exclusive roofing leads with a high-converting web engine. We build premium, SEO-optimized websites and local marketing systems for US and Canadian roofing contractors.',
    openGraph: {
        title: 'Web Design & SEO for Roofing Contractors | AJPR World',
        description: 'Double your exclusive roofing leads with a high-converting web engine.',
        type: 'website',
        url: 'https://ajprworld.com/roofing-contractors',
        siteName: 'AJPR World',
        images: [
            {
                url: 'https://ajprworld.com/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'AJPR World',
            }
        ],
    },
}

export default function RoofingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
