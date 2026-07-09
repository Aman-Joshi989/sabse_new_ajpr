import { getPortfolioItems } from '@/lib/db/queries'
import PortfolioClient from './_components/PortfolioClient'

export const revalidate = 60; // Cache for 60 seconds (ISR) to fix slow HTML load times

export default async function PortfolioPage() {
    const projects = await getPortfolioItems();

    return <PortfolioClient initialProjects={projects} />
}
