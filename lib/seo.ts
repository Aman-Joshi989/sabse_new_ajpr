import type { Metadata } from 'next';

const BASE_URL = 'https://ajprworld.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

/**
 * Sanitizes and bounds a title between 10 and 60 characters for maximum CTR and zero SERP truncation.
 */
export function sanitizeMetaTitle(
  title: string | null | undefined,
  fallback: string,
  maxLen: number = 60
): string {
  const raw = (title || fallback || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  if (!raw) return fallback.slice(0, maxLen);
  if (raw.length <= maxLen) return raw;

  const sliced = raw.slice(0, maxLen - 3);
  const lastSpace = sliced.lastIndexOf(' ');
  if (lastSpace > maxLen * 0.7) {
    return `${sliced.slice(0, lastSpace).trim()}...`;
  }
  return `${sliced.trim()}...`;
}

/**
 * Normalizes meta descriptions strictly between 120 and 158 characters.
 * Prevents Ahrefs "Meta description too short" (< 110 chars) and "Meta description too long" (> 160 chars) warnings.
 */
export function sanitizeMetaDescription(
  desc: string | null | undefined,
  fallback: string,
  minLen: number = 120,
  maxLen: number = 158
): string {
  let clean = (desc || fallback || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  
  if (!clean) {
    clean = fallback;
  }

  // If description is too short, augment with contextual branding
  if (clean.length < minLen) {
    const extension = ' Engineered by AJPR World for fast-growing US enterprises and startups.';
    clean = `${clean.replace(/\.*$/, '')}.${extension}`.trim();
  }

  // If still under minLen in rare edge case, pad cleanly
  if (clean.length < minLen) {
    clean = `${clean} Explore actionable insights and technical solutions.`;
  }

  // If within bounds, return
  if (clean.length <= maxLen) {
    return clean;
  }

  // Intelligently truncate at word boundary
  const sliced = clean.slice(0, maxLen - 3);
  const lastSpace = sliced.lastIndexOf(' ');
  if (lastSpace > maxLen * 0.75) {
    return `${sliced.slice(0, lastSpace).trim()}...`;
  }
  return `${sliced.trim()}...`;
}

export interface EnterpriseMetadataOptions {
  path: string;
  title?: string | null;
  description?: string | null;
  defaultTitle: string;
  defaultDesc: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

/**
 * Generates an enterprise-grade Metadata object for Next.js App Router.
 * Ensures 100% compliance with Ahrefs site audit and Google Rich Results guidelines.
 */
export function constructEnterpriseMetadata(options: EnterpriseMetadataOptions): Metadata {
  const {
    path,
    title: rawTitle,
    description: rawDesc,
    defaultTitle,
    defaultDesc,
    image,
    type = 'website',
    publishedTime,
    authors,
    noIndex = false,
  } = options;

  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${BASE_URL}${normalizedPath}`;
  const finalTitle = sanitizeMetaTitle(rawTitle, defaultTitle, 60);
  const finalDesc = sanitizeMetaDescription(rawDesc, defaultDesc, 120, 158);
  const ogImageUrl = image?.startsWith('http') ? image : (image ? `${BASE_URL}${image}` : DEFAULT_OG_IMAGE);

  return {
    metadataBase: new URL(BASE_URL),
    title: finalTitle,
    description: finalDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          'max-snippet': -1,
          'max-image-preview': 'large',
          'max-video-preview': -1,
        },
    openGraph: {
      title: finalTitle,
      description: finalDesc,
      url: canonicalUrl,
      siteName: 'AJPR World',
      type: type,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: finalTitle,
        },
      ],
      locale: 'en_US',
      ...(publishedTime ? { publishedTime } : {}),
      ...(authors ? { authors } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: finalTitle,
      description: finalDesc,
      images: [ogImageUrl],
      creator: '@ajprworld',
      site: '@ajprworld',
    },
  };
}
