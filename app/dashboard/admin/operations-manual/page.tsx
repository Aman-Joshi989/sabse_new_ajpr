import { Metadata } from 'next';
import OperationsManualClient from './OperationsManualClient';

export const metadata: Metadata = {
  title: 'Staff Operations Manual & SOP Playbook | AJPR Admin',
  description: 'Standard Operating Procedures for content publishing, lead handling, PR outreach, and cluster management.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function OperationsManualPage() {
  return <OperationsManualClient />;
}
