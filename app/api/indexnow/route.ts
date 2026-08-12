import { NextResponse } from 'next/server';
import sitemap from '@/app/sitemap';

export async function GET() {
    try {
        const sitemapData = await sitemap();
        const urlList = sitemapData.map((item) => item.url);

        const indexNowPayload = {
            host: "ajprworld.com",
            key: "8fa45d677a2846f4949a023b6b1580bc",
            keyLocation: "https://ajprworld.com/8fa45d677a2846f4949a023b6b1580bc.txt",
            urlList: urlList
        };

        const response = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(indexNowPayload)
        });

        if (response.ok) {
            return NextResponse.json({ success: true, message: 'Submitted to IndexNow successfully', urlsSubmitted: urlList.length });
        } else {
            return NextResponse.json({ success: false, error: 'IndexNow API rejected the submission', status: response.status }, { status: 500 });
        }
    } catch (error) {
        console.error('Error submitting to IndexNow:', error);
        return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
    }
}
