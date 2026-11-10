import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Web Design & SEO for Roofing Contractors | AJPR World',
    description: 'Generate exclusive roofing leads with high-converting web design and local SEO systems tailored for US roofing contractors to dominate their local market.',
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: 'https://ajprworld.com/roofing-contractors',
    },
    openGraph: {
        title: 'Web Design & SEO for Roofing Contractors | AJPR World',
        description: 'Generate exclusive roofing leads with high-converting web design and local SEO systems tailored for US roofing contractors to dominate their local market.',
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
    twitter: {
        card: 'summary_large_image',
        title: 'Web Design & SEO for Roofing Contractors | AJPR World',
        description: 'Generate exclusive roofing leads with high-converting web design and local SEO systems tailored for US roofing contractors to dominate their local market.',
        creator: '@ajprworld',
        images: ['https://ajprworld.com/og-image.jpg']
    }
}

export default function RoofingLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
