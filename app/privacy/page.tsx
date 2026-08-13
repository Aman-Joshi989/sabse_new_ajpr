import EmailLink from '@/components/EmailLink';
import { Metadata } from 'next'
import { getSeoMetadata } from "@/lib/db/queries";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-300 transition-colors duration-300 font-sans">
            <div className="w-[80%] mx-auto min-h-screen">
                <section className="py-24">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-black mb-8 text-center text-slate-900 dark:text-white">Privacy Policy</h1>
                        <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-400">

                            <p>
                                At <strong>AJPR World</strong>, your privacy is our top priority.
                                This Privacy Policy explains how we collect, use, and protect your information
                                when you interact with our website, services, and digital platforms.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">1. Information We Collect</h2>
                            <ul>
                                <li><strong>Personal Information:</strong> such as your name, email address, phone number, and payment details when you sign up or contact us.</li>
                                <li><strong>Usage Data:</strong> including IP address, browser type, device information, and pages you visit.</li>
                                <li><strong>Cookies & Tracking:</strong> small files that enhance your browsing experience and help us improve our services.</li>
                            </ul>

                            <h2 className="text-slate-900 dark:text-white">2. How We Use Your Information</h2>
                            <p>We use the collected information to:</p>
                            <ul>
                                <li>Provide, personalize, and improve our services.</li>
                                <li>Process payments and complete transactions.</li>
                                <li>Send important updates, promotional content, or newsletters.</li>
                                <li>Enhance security and prevent fraudulent activities.</li>
                            </ul>

                            <h2 className="text-slate-900 dark:text-white">3. Information Sharing</h2>
                            <p>
                                We do <strong>not</strong> sell, rent, or trade your personal data.
                                Information may be shared only with trusted partners, service providers, or
                                when legally required (such as compliance with law enforcement).
                            </p>

                            <h2 className="text-slate-900 dark:text-white">4. Data Security</h2>
                            <p>
                                We implement industry-standard security practices including encryption, secure servers,
                                and limited access controls to protect your data from unauthorized access, misuse, or disclosure.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">5. Your Privacy Rights</h2>
                            <p>You have the right to:</p>
                            <ul>
                                <li>Access, update, or delete your personal information.</li>
                                <li>Opt-out of marketing communications.</li>
                                <li>Request a copy of the data we hold about you.</li>
                            </ul>

                            <h2 className="text-slate-900 dark:text-white">6. Cookies & Tracking</h2>
                            <p>
                                We use cookies to improve your browsing experience.
                                You can control or disable cookies through your browser settings,
                                but some features may not function properly without them.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">7. Third-Party Services</h2>
                            <p>
                                Our services may include links to third-party websites or tools.
                                We are not responsible for the privacy practices of these external platforms,
                                and we encourage you to review their privacy policies.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">8. Updates to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. Any changes will be posted on this page
                                with a revised "Last Updated" date.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">9. Contact Us</h2>
                            <p>
                                If you have questions, concerns, or requests regarding this Privacy Policy, please reach out to us at:{' '}
                                <EmailLink className="text-blue-600 hover:underline font-medium" />
                            </p>

                            <p className="text-sm text-gray-500 mt-8">Last updated: August 19, 2025</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export async function generateMetadata(): Promise<Metadata> {

      const seo = await getSeoMetadata('/privacy');
      return {
    alternates: { canonical: '/privacy' },
        title: seo?.title,
        description: seo?.description,
        openGraph: {
          title: seo?.title,
          description: seo?.description,
          url: `https://ajprworld.com${'/privacy'}`,
        }
      };
}
