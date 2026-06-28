import { getSiteSettings } from '@/lib/db/queries';
import SeoSettingsForm from './_components/SeoSettingsForm';

export default async function AdminSeoSettingsPage() {
    const settings = await getSiteSettings();

    return (
        <div className="space-y-6">
            <SeoSettingsForm initialSettings={settings} />
        </div>
    );
}
