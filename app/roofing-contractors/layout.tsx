import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Web Design & SEO for Roofing Contractors | AJPR World',
    description: 'Double your exclusive roofing leads with a high-converting web engine. We build premium, SEO-optimized websites and local marketing systems for US and Canadian roofing contractors.',
    openGraph: {
        title: 'Web Design & SEO for Roofing Contractors | AJPR World',
        description: 'Double your exclusive roofing leads with a high-converting web engine.',
        type: 'website',
    },
}

export default function RoofingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
