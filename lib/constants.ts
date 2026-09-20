export interface AddonItem {
    id: string;
    name: string;
    priceUSD: number;
    priceINR: number;
    price: number; // Defaults to USD for backward compatibility
    description: string;
}

export const addonsList: AddonItem[] = [
    { id: 'extra-correction', name: 'Extra Correction Round', priceUSD: 20, priceINR: 1500, price: 20, description: '1 additional round of changes' },
    { id: 'advanced-seo', name: 'Advanced SEO Package', priceUSD: 65, priceINR: 5000, price: 65, description: 'Keyword research, meta tags optimization, sitemap' },
    { id: 'priority-support', name: 'Priority Support (1 Mo)', priceUSD: 40, priceINR: 3000, price: 40, description: '24/7 dedicated support channel' },
    { id: 'content-writing', name: 'Professional Content Writing', priceUSD: 50, priceINR: 4000, price: 50, description: 'Up to 5 pages of SEO-optimized content' },
    { id: 'graphics-branding', name: 'Graphics & Digital Branding', priceUSD: 40, priceINR: 3000, price: 40, description: 'Professional logo, social media banners, and brand kit' }
];

export const getAddonPrice = (addon: AddonItem, currency: 'USD' | 'INR'): number => {
    return currency === 'INR' ? addon.priceINR : addon.priceUSD;
};

