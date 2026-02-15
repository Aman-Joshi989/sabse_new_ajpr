import { getPortfolioItemById } from '@/lib/db/queries'
import EditPortfolioClient from './_components/EditPortfolioClient'

export const dynamic = 'force-dynamic';

export default async function EditPortfolioPage({ params }: { params: { id: string } }) {
    const resolvedParams = await params;
    const project = await getPortfolioItemById(Number(resolvedParams.id));

    if (!project) {
        return <div>Project not found</div>
    }

    return <EditPortfolioClient project={project} />
}
