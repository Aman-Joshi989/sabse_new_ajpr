import { getSiteSettings } from '@/lib/db/queries';
import SeoSettingsForm from './_components/SeoSettingsForm';
import IndexNowButton from './_components/IndexNowButton';

export default async function AdminSeoSettingsPage() {
    const settings = await getSiteSettings();

    return (
        <div className="space-y-6">
            <IndexNowButton />
            <SeoSettingsForm initialSettings={settings} />
        </div>
    );
}
