import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ status: 'ERROR', message: 'OPENAI_API_KEY NOT SET on this Vercel environment' }, { status: 500 });
  }

  const maskedKey = apiKey.slice(0, 7) + '...' + apiKey.slice(-4);

  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: 'Say exactly: API working' }],
        max_tokens: 10,
      }),
    });

    const body = await res.json();
    if (!res.ok) {
      return NextResponse.json({ status: 'API_ERROR', httpStatus: res.status, key: maskedKey, error: body.error });
    }

    return NextResponse.json({ status: 'OK', key: maskedKey, response: body.choices[0].message.content });
  } catch (err: any) {
    return NextResponse.json({ status: 'NETWORK_ERROR', key: maskedKey, message: err.message }, { status: 500 });
  }
}
