import { PUBLIC_ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function Privacy() {
  return (
    <div className="relative min-h-screen bg-black text-white pt-24 pb-8 px-8">
      {/* Background Effects */}
      <div className="fixed bg-[linear-gradient(to_right,#4F6BFF10_1px,transparent_1px),linear-gradient(to_bottom,#4F6BFF10_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="fixed top-0 -left-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-0 -right-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="relative max-w-4xl mx-auto">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-8">
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
              <p className="text-gray-300 leading-relaxed">
                At SummarizeAI, we understand that your documents often contain
                sensitive and confidential information. This Privacy Policy
                explains how we collect, use, protect, and handle your
                information when you use our AI-powered PDF summarization
                service. We are committed to protecting your privacy and
                ensuring the security of your documents. By using SummarizeAI,
                you agree to the terms outlined in this policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Information We Collect
              </h2>
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Account Information</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>
                    Email address and password for account creation and
                    authentication
                  </li>
                  <li>
                    Profile information you choose to provide (name,
                    preferences)
                  </li>
                  <li>
                    Subscription and billing information for premium features
                  </li>
                  <li>Account settings and customization preferences</li>
                </ul>

                <h3 className="text-xl font-medium">
                  Document and Content Information
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>PDF documents you upload for summarization</li>
                  <li>Extracted text content from your PDF files</li>
                  <li>AI-generated summaries and key insights</li>
                  <li>
                    Document metadata (file size, upload date, processing time)
                  </li>
                  <li>User feedback on summary quality and accuracy</li>
                </ul>

                <h3 className="text-xl font-medium">
                  Usage and Technical Data
                </h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  <li>Service usage patterns and feature interactions</li>
                  <li>Device information and browser details</li>
                  <li>IP address and general location data</li>
                  <li>Performance metrics and error logs</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                How We Use Your Information
              </h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  Process and summarize your PDF documents using AI technology
                </li>
                <li>
                  Provide, maintain, and improve our summarization service
                </li>
                <li>Manage your account and subscription</li>
                <li>Send important service updates and notifications</li>
                <li>Provide customer support and respond to your inquiries</li>
                <li>
                  Analyze usage patterns to enhance our AI models and user
                  experience
                </li>
                <li>
                  Detect and prevent fraudulent activities and security threats
                </li>
                <li>Comply with legal obligations and protect our rights</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Document Processing and AI
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                When you upload a PDF document, we temporarily process it to
                extract text and generate summaries using advanced AI models. We
                implement strict security measures during this process:
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>
                  Documents are processed in secure, encrypted environments
                </li>
                <li>
                  Original PDFs are automatically deleted after processing
                  (within 24 hours)
                </li>
                <li>
                  Generated summaries are stored securely and associated with
                  your account
                </li>
                <li>
                  We do not use your document content to train our AI models
                  without explicit consent
                </li>
                <li>
                  All data transmission is encrypted using industry-standard
                  protocols
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
              <p className="text-gray-300 leading-relaxed">
                We implement enterprise-grade security measures to protect your
                information and documents. This includes end-to-end encryption,
                secure cloud storage, regular security audits, and access
                controls. Your documents are processed in isolated environments
                and are never shared with third parties. However, no system is
                100% secure, and we cannot guarantee absolute security against
                all threats.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Data Retention</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We retain your information based on the following schedule:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <strong>Original PDF files:</strong> Deleted within 24 hours
                    after processing
                  </li>
                  <li>
                    <strong>Generated summaries:</strong> Stored as long as your
                    account is active
                  </li>
                  <li>
                    <strong>Account information:</strong> Retained until account
                    deletion
                  </li>
                  <li>
                    <strong>Usage data:</strong> Aggregated and anonymized for
                    analytical purposes
                  </li>
                </ul>
                <p>
                  You can delete your summaries and account data at any time
                  through your dashboard settings.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Access and download your account data and summaries</li>
                <li>Correct or update your account information</li>
                <li>Delete your account and all associated data</li>
                <li>Export your summaries in various formats</li>
                <li>Opt out of non-essential communications</li>
                <li>Request information about how your data is processed</li>
                <li>
                  Withdraw consent for optional data processing activities
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                Changes to This Privacy Policy
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We may update this Privacy Policy to reflect changes in our
                practices or legal requirements. We will notify you of
                significant changes via email or through our service. We
                encourage you to review this policy periodically. Your continued
                use of SummarizeAI after changes constitutes acceptance of the
                updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about this Privacy Policy or how we
                handle your data, please{" "}
                <Link
                  href={PUBLIC_ROUTES.CONTACT}
                  className="text-[#4F6BFF] hover:text-[#4F6BFF]/80 underline"
                >
                  contact us
                </Link>
                . We are committed to addressing your privacy concerns promptly
                and transparently.
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
