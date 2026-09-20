import EmailLink from '@/components/EmailLink';
import { Metadata } from 'next'
import { getSeoMetadata } from "@/lib/db/queries";

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-slate-50 dark:bg-[#030712] text-slate-900 dark:text-slate-300 transition-colors duration-300 font-sans">
            <div className="w-[80%] mx-auto min-h-screen">
                <section className="py-24">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-black mb-8 text-center text-slate-900 dark:text-white">Terms of Service</h1>
                        <div className="prose prose-lg dark:prose-invert text-slate-600 dark:text-slate-400">

                            <p>
                                Welcome to <strong>AJPR World</strong>! These Terms of Service ("Terms") govern your access to 
                                and use of our website, applications, products, and tech services. By using our platform or hiring 
                                AJPR World for custom web development, software engineering, UI/UX design, or digital solutions, 
                                you agree to be bound by these Terms.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">1. Services and Scope of Work</h2>
                            <p>
                                AJPR World delivers custom digital and technology solutions:
                            </p>
                            <ul>
                                <li><strong>Web Development:</strong> Design, development, and hosting configuration of high-end websites, e-commerce stores, and custom web applications.</li>
                                <li><strong>Software Engineering:</strong> Front-end and back-end application engineering, database design, and cloud deployments.</li>
                                <li><strong>Design & Branding:</strong> Premium user interface (UI) and user experience (UX) design, graphic assets, and digital branding layouts.</li>
                            </ul>
                            <p>
                                Specific timelines, project requirements, features, and milestones will be detailed in individual proposals, project scopes, or client agreements.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">2. User Accounts and Security</h2>
                            <p>
                                To access certain dashboard features, custom client portals, or premium digital products, you may be required to register for an account. 
                                You agree to provide accurate, complete, and current information. You are entirely responsible for 
                                maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">3. Payments, Fees, and Refunds</h2>
                            <p>
                                Fees and billing arrangements are governed by the specific billing frequency, invoices, or terms chosen at checkout:
                            </p>
                            <ul>
                                <li><strong>Pricing:</strong> All fees are stated in Indian Rupees (INR) unless otherwise indicated. Prices for design or development packages are subject to change, but we will notify you before any subscription changes take effect.</li>
                                <li><strong>Payments:</strong> We utilize secure third-party payment gateways (such as Razorpay) to process online transactions safely.</li>
                                <li><strong>Refund Policy:</strong> Due to the customized nature of software development, digital designs, and custom programming services, all payments are non-refundable once development or design work has officially commenced.</li>
                            </ul>

                            <h2 className="text-slate-900 dark:text-white">4. Intellectual Property and Code Ownership</h2>
                            <p>
                                Unless otherwise specified in a custom written contract:
                            </p>
                            <ul>
                                <li><strong>AJPR World IP:</strong> All content, pre-existing software, generic templates, source code frameworks, brand logos, and assets displayed on our platform remain the exclusive property of AJPR World.</li>
                                <li><strong>Client Deliverables:</strong> Upon full and final payment of all outstanding invoices, ownership of the custom code, custom graphics, and UI layouts built exclusively for your project will be transferred to you. AJPR World retains a non-exclusive license to use generic, non-proprietary code snippets, libraries, or patterns for other projects.</li>
                            </ul>

                            <h2 className="text-slate-900 dark:text-white">5. Acceptable Use and Restrictions</h2>
                            <p>
                                You agree not to use our platform, code, or services to:
                            </p>
                            <ul>
                                <li>Violate any local, state, national, or international intellectual property or software compliance laws.</li>
                                <li>Upload, distribute, or inject malware, spyware, viruses, or other malicious code.</li>
                                <li>Attempt to hack, bypass security, or gain unauthorized access to our servers, databases, or user credentials.</li>
                                <li>Re-sell, distribute, or sub-license custom AJPR World assets or SaaS applications without explicit prior written authorization.</li>
                            </ul>

                            <h2 className="text-slate-900 dark:text-white">6. Disclaimer of Warranties</h2>
                            <p>
                                Our platform, custom websites, software products, and tech consulting are provided on an <strong>"as is"</strong> and <strong>"as available"</strong> basis 
                                without warranty of any kind, whether express or implied. We do not warrant that the software will be completely uninterrupted, 
                                free from temporary bugs, or compatible with all future third-party software updates, though we strive for maximum reliability.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">7. Limitation of Liability</h2>
                            <p>
                                To the maximum extent permitted by applicable law, AJPR World, its directors, employees, or partners shall 
                                not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, 
                                revenue, data, or business opportunities arising from your use of or inability to use our software and websites.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">8. Governing Law and Jurisdiction</h2>
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of **India**. Any disputes arising under 
                                or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in 
                                **New Delhi, India**.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">9. Termination</h2>
                            <p>
                                We reserve the right to suspend or terminate your account or custom developer support at our sole discretion, 
                                if we believe you have breached these Terms, failed to complete agreed project payments, or engaged in behavior 
                                that threatens the security or integrity of our tech ecosystem.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">10. Contact Information</h2>
                            <p>
                                If you have any questions or require clarification regarding these Terms of Service, please contact us:{' '}
                                <EmailLink className="text-blue-600 hover:underline font-medium" />
                            </p>

                            <p className="text-sm text-gray-500 mt-8">Last updated: May 26, 2026</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getSeoMetadata('/terms');
  const defaultTitle = 'Terms of Service | AJPR World';
  const defaultDesc = 'Read the Terms of Service governing your use of AJPR World websites, software engineering services, web development packages, and consulting solutions.';
  const title = seo?.title || defaultTitle;
  const description = seo?.description || defaultDesc;

  return {
    alternates: { canonical: 'https://ajprworld.com/terms' },
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: 'https://ajprworld.com/terms',
      siteName: 'AJPR World',
      type: 'website',
      images: [
        {
          url: 'https://ajprworld.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'AJPR World',
        }
      ],
    }
  };
}
