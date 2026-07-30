import { getAllProjects, getUsers, getAllMilestones } from '@/lib/db/queries';
import ProjectsTable from './_components/ProjectsTable';

export const dynamic = 'force-dynamic';

export default async function AdminProjectsPage() {
    const projects = await getAllProjects();
    const users = await getUsers();
    const milestones = await getAllMilestones();

    return <ProjectsTable projects={projects} users={users} allMilestones={milestones} />;
}
