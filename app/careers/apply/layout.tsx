import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Apply for Career Opportunities | AJPR World',
  description: 'Apply for high-impact software engineering, AI systems, and product design roles at AJPR World. Collaborate with senior engineering pods.',
  robots: {
    index: true,
    follow: true,
  },
};

export default function CareersApplyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
