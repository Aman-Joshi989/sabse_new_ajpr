/**
 * Centralized review URLs.
 * Override NEXT_PUBLIC_GOOGLE_REVIEW_URL in environment variables with a direct
 * https://g.page/r/.../review or search.google.com/local/writereview?placeid=... link.
 */
export const GOOGLE_REVIEW_URL =
  process.env.NEXT_PUBLIC_GOOGLE_REVIEW_URL ||
  'https://www.google.com/search?q=AJPR+World+Haldwani+reviews';

export const CLUTCH_PROFILE_URL = 'https://clutch.co/profile/ajpr-world';
export const GOODFIRMS_PROFILE_URL = 'https://www.goodfirms.co/company/ajpr-world';
export const SOURCEFORGE_PROFILE_URL = 'https://sourceforge.net/p/ajprworld/';
export const DIRECT_REVIEWS_URL = 'https://ajprworld.com/reviews';
