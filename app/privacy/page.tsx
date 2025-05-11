export default function Privacy() {
    return (
        <div className="relative min-h-screen bg-black text-white pt-24 pb-8 px-8">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#4F6BFF10_1px,transparent_1px),linear-gradient(to_bottom,#4F6BFF10_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="fixed top-0 -left-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse" />
            <div className="fixed bottom-0 -right-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse delay-700" />

            <div className="relative max-w-4xl mx-auto">
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-8">
                    <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
                            <p className="text-gray-300 leading-relaxed">
                                At SummarizeAI, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service. Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the application.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
                            <div className="space-y-4">
                                <h3 className="text-xl font-medium">Personal Information</h3>
                                <ul className="list-disc list-inside text-gray-300 space-y-2">
                                    <li>Name and email address when you create an account</li>
                                    <li>Billing information when you subscribe to our service</li>
                                    <li>Information you provide in support requests</li>
                                    <li>Usage data and analytics</li>
                                </ul>

                                <h3 className="text-xl font-medium">Document Information</h3>
                                <ul className="list-disc list-inside text-gray-300 space-y-2">
                                    <li>Content of PDF documents you upload for summarization</li>
                                    <li>Generated summaries and analysis</li>
                                    <li>Document metadata</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                <li>To provide and maintain our service</li>
                                <li>To notify you about changes to our service</li>
                                <li>To provide customer support</li>
                                <li>To gather analysis or valuable information to improve our service</li>
                                <li>To detect, prevent and address technical issues</li>
                                <li>To fulfill any other purpose for which you provide it</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We implement appropriate technical and organizational security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. However, please note that no method of transmission over the internet or electronic storage is 100% secure.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We will retain your personal information only for as long as is necessary for the purposes set out in this privacy policy. We will retain and use your information to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our policies.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
                            <ul className="list-disc list-inside text-gray-300 space-y-2">
                                <li>Right to access your personal data</li>
                                <li>Right to correct inaccurate personal data</li>
                                <li>Right to request deletion of your personal data</li>
                                <li>Right to restrict processing of your personal data</li>
                                <li>Right to data portability</li>
                                <li>Right to object to processing of your personal data</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                            <p className="text-gray-300 leading-relaxed">
                                If you have any questions about this Privacy Policy, please contact us at{" "}
                                <a
                                    href="mailto:privacy@summarizeai.com"
                                    className="text-[#4F6BFF] hover:text-[#4F6BFF]/80"
                                >
                                    privacy@summarizeai.com
                                </a>
                            </p>
                        </section>

                        <div className="text-gray-400 text-sm">
                            Last Updated: {new Date().toLocaleDateString()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 