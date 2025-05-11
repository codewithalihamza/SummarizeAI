export default function Terms() {
    return (
        <div className="relative min-h-screen bg-black text-white pt-24 pb-8 px-8">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#4F6BFF10_1px,transparent_1px),linear-gradient(to_bottom,#4F6BFF10_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="fixed top-0 -left-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse" />
            <div className="fixed bottom-0 -right-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse delay-700" />

            <div className="relative max-w-4xl mx-auto">
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-8">
                    <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
                    <div className="space-y-8">
                        <section>
                            <h2 className="text-2xl font-semibold mb-4">1. Agreement to Terms</h2>
                            <p className="text-gray-300 leading-relaxed">
                                By accessing and using SummarizeAI, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">2. Use License</h2>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    Permission is granted to temporarily access and use SummarizeAI for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
                                </p>
                                <ul className="list-disc list-inside space-y-2">
                                    <li>Modify or copy the materials</li>
                                    <li>Use the materials for any commercial purpose</li>
                                    <li>Attempt to decompile or reverse engineer any software contained in SummarizeAI</li>
                                    <li>Remove any copyright or other proprietary notations from the materials</li>
                                    <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                                </ul>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    When you create an account with us, you must provide accurate, complete, and current information. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.
                                </p>
                                <p>
                                    You are responsible for safeguarding the password and for all activities that occur under your account.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">4. Service Description</h2>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    SummarizeAI provides AI-powered document summarization services. While we strive for accuracy, we do not guarantee that the summaries will be error-free or meet your specific requirements.
                                </p>
                                <p>
                                    We reserve the right to modify, suspend, or discontinue the service at any time without notice.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">5. Payment Terms</h2>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    Some aspects of the Service are provided for a fee. You agree to pay all fees in accordance with the pricing and payment terms presented to you for the Service.
                                </p>
                                <p>
                                    You will be billed in advance on a recurring basis. Billing cycles are set on a monthly basis.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
                            <p className="text-gray-300 leading-relaxed">
                                The Service and its original content, features, and functionality are owned by SummarizeAI and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
                            <p className="text-gray-300 leading-relaxed">
                                In no event shall SummarizeAI, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">8. Termination</h2>
                            <div className="space-y-4 text-gray-300">
                                <p>
                                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                                </p>
                                <p>
                                    Upon termination, your right to use the Service will immediately cease.
                                </p>
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
                            <p className="text-gray-300 leading-relaxed">
                                These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">10. Changes to Terms</h2>
                            <p className="text-gray-300 leading-relaxed">
                                We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on this page. You are advised to review these Terms periodically for any changes.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold mb-4">11. Contact Us</h2>
                            <p className="text-gray-300 leading-relaxed">
                                If you have any questions about these Terms, please contact us at{" "}
                                <a
                                    href="mailto:legal@summarizeai.com"
                                    className="text-[#4F6BFF] hover:text-[#4F6BFF]/80"
                                >
                                    legal@summarizeai.com
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