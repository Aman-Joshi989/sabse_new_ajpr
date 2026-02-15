import { getPortfolioItems } from '@/lib/db/queries'
import PortfolioClient from './_components/PortfolioClient'

export const dynamic = 'force-dynamic';

export default async function PortfolioPage() {
    const projects = await getPortfolioItems();

    return <PortfolioClient initialProjects={projects} />
}
