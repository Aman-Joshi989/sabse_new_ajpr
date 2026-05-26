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
                                and use of our website, applications, services, and digital solutions. By using our platform or hiring 
                                AJPR World for web development, legal, GST, company registration, or consulting services, you agree 
                                to be bound by these Terms.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">1. Services and Scope of Work</h2>
                            <p>
                                AJPR World delivers comprehensive business solutions across several domains:
                            </p>
                            <ul>
                                <li><strong>Tech Solutions:</strong> Custom web development, software engineering, cloud architecture, and maintenance.</li>
                                <li><strong>Legal & Company Services:</strong> Business registrations, startup company formation, intellectual property filings, and corporate legal drafting.</li>
                                <li><strong>Financial & Tax Services:</strong> GST filing, accounting, tax planning, and general business consulting.</li>
                            </ul>
                            <p>
                                Specific service scopes, timelines, deliverables, and service-level agreements (SLAs) will be detailed in individual service orders or client proposals.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">2. User Accounts and Security</h2>
                            <p>
                                To access certain services or dashboard features, you may be required to register for an account. 
                                You agree to provide accurate, complete, and current information. You are entirely responsible for 
                                maintaining the confidentiality of your account credentials and for all activities that occur under your account.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">3. Payments, Fees, and Refunds</h2>
                            <p>
                                Payment terms are governed by the billing frequency and terms chosen at checkout or outlined in client agreements:
                            </p>
                            <ul>
                                <li><strong>Pricing:</strong> All fees are stated in Indian Rupees (INR) unless otherwise indicated. Prices for services are subject to change, but we will notify you before any subscription changes take effect.</li>
                                <li><strong>Payments:</strong> We utilize secure third-party payment gateways (such as Razorpay) to process transactions safely.</li>
                                <li><strong>Refund Policy:</strong> Due to the customizable nature of digital products, professional consulting, and legal/government filing services, all sales are generally final once work has commenced or filings have been submitted. Refund requests for unrendered work will be evaluated on a case-by-case basis.</li>
                            </ul>

                            <h2 className="text-slate-900 dark:text-white">4. Intellectual Property Rights</h2>
                            <p>
                                Unless otherwise specified in a formal written contract:
                            </p>
                            <ul>
                                <li><strong>Our Property:</strong> All content, source code, UI designs, brand logos, patents, trademarks, and educational materials displayed on AJPR World are the exclusive property of AJPR World.</li>
                                <li><strong>Client Deliverables:</strong> Upon full and final payment of all outstanding invoices, ownership of custom software, custom graphic assets, or specific legal documents drafted exclusively for you will be transferred to you, subject to AJPR World retaining a non-exclusive license to use generic libraries or patterns.</li>
                            </ul>

                            <h2 className="text-slate-900 dark:text-white">5. Acceptable Use and Restrictions</h2>
                            <p>
                                You agree not to use our platform or services to:
                            </p>
                            <ul>
                                <li>Violate any local, state, national, or international laws, including tax and intellectual property laws.</li>
                                <li>Upload or distribute malware, spyware, or other malicious software code.</li>
                                <li>Attempt to gain unauthorized access to our servers, user accounts, database systems, or networks.</li>
                                <li>Re-sell, distribute, or sub-license AJPR World services without prior written permission.</li>
                            </ul>

                            <h2 className="text-slate-900 dark:text-white">6. Disclaimer of Warranties</h2>
                            <p>
                                Our platform, software, and consulting services are provided on an <strong>"as is"</strong> and <strong>"as available"</strong> basis 
                                without warranty of any kind, whether express or implied. While we strive to maintain high accuracy in tax computations 
                                and legal filings, you acknowledge that government regulations are subject to change and we are not liable for external regulatory changes.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">7. Limitation of Liability</h2>
                            <p>
                                To the maximum extent permitted by applicable law, AJPR World, its directors, employees, or partners shall 
                                not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits, 
                                revenue, data, or business opportunities, arising out of or related to your use of our services.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">8. Governing Law and Jurisdiction</h2>
                            <p>
                                These Terms shall be governed by and construed in accordance with the laws of **India**. Any disputes arising under 
                                or in connection with these Terms shall be subject to the exclusive jurisdiction of the competent courts in 
                                **New Delhi, India**.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">9. Termination</h2>
                            <p>
                                We reserve the right to suspend or terminate your account or refuse service at our sole discretion, with or 
                                without notice, if we believe you have breached these Terms or engaged in behavior that threatens the security 
                                or integrity of our platform.
                            </p>

                            <h2 className="text-slate-900 dark:text-white">10. Contact Information</h2>
                            <p>
                                If you have any questions or require clarification regarding these Terms of Service, please contact us:
                                <a href="mailto:admin@ajprworld.com" className="text-blue-600 hover:underline"> admin@ajprworld.com</a>
                            </p>

                            <p className="text-sm text-gray-500 mt-8">Last updated: May 26, 2026</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
