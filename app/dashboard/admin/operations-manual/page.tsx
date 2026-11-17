import { Metadata } from 'next';
import OperationsManualClient from './OperationsManualClient';

export const metadata: Metadata = {
  title: 'Staff Operations Manual & SOP Playbook | AJPR Admin',
  description: 'Comprehensive Standard Operating Procedures for content publishing, candidate lead handling, PR outreach, and cluster infrastructure management.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function OperationsManualPage() {
  return <OperationsManualClient />;
}
