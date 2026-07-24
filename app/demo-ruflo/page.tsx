import { Metadata } from 'next'
import SwarmSimulator from './SwarmSimulator'
import { getSeoMetadata } from "@/lib/db/queries";

export default function Page() {
  return <SwarmSimulator />
}

export async function generateMetadata(): Promise<Metadata> {

      const seo = await getSeoMetadata('/demo-ruflo');
      return {
        title: seo?.title,
        description: seo?.description,
        openGraph: {
          title: seo?.title,
          description: seo?.description,
          url: `https://ajprworld.com${'/demo-ruflo'}`,
        }
      };
}
