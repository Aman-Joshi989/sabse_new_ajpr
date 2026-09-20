import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply for Career Opportunities | AJPR World',
  description: 'Join the engineering and AI systems development team at AJPR World.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function CareersApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
