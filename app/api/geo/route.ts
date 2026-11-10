import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const geoCountry = (
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    request.headers.get('x-country-code') ||
    (request as any).geo?.country ||
    ''
  ).toUpperCase();

  const isIndia = geoCountry === 'IN';
  const region = isIndia ? 'IN' : 'US';
  const currency = isIndia ? 'INR' : 'USD';

  return NextResponse.json({
    country: geoCountry || 'US',
    region,
    currency,
    isIndia
  });
}
