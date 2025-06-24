import { PUBLIC_ROUTES } from "@/constants/routes";
import Link from "next/link";

export default function Terms() {
  return (
    <div className="relative min-h-screen bg-black text-white pt-24 pb-8 px-8">
      {/* Background Effects */}
      <div className="fixed bg-[linear-gradient(to_right,#4F6BFF10_1px,transparent_1px),linear-gradient(to_bottom,#4F6BFF10_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="fixed top-0 -left-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-0 -right-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="relative max-w-4xl mx-auto">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-8">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-gray-300 leading-relaxed">
                By accessing and using SummarizeAI's AI-powered PDF
                summarization service, you agree to be bound by these Terms of
                Service and all applicable laws and regulations. These terms
                govern your use of our platform, including document upload,
                processing, and summary generation features. If you do not agree
                with any of these terms, you are prohibited from using or
                accessing this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                2. Service Description
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  SummarizeAI provides an AI-powered platform that allows users
                  to upload PDF documents and receive intelligent summaries, key
                  insights, and analysis. Our service includes:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>PDF document upload and text extraction</li>
                  <li>AI-generated summaries and key point identification</li>
                  <li>Document management and organization tools</li>
                  <li>
                    Premium features including advanced analysis and export
                    options
                  </li>
                  <li>User dashboard for managing documents and summaries</li>
                </ul>
                <p>
                  While we strive to provide accurate and useful summaries,
                  AI-generated content may contain errors or omissions. Users
                  should review and verify important information independently.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  To access SummarizeAI's features, you must create an account
                  with accurate, complete, and current information. You are
                  responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    Maintaining the confidentiality of your account credentials
                  </li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Ensuring your contact information remains current</li>
                </ul>
                <p>
                  Failure to maintain accurate account information or misuse of
                  the service may result in account suspension or termination.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
              <div className="space-y-4 text-gray-300">
                <p>When using SummarizeAI, you agree not to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    Upload documents containing illegal, harmful, or malicious
                    content
                  </li>
                  <li>
                    Upload copyrighted material without proper authorization
                  </li>
                  <li>Attempt to reverse engineer or extract our AI models</li>
                  <li>Use automated systems to overwhelm our servers</li>
                  <li>Share account credentials with unauthorized parties</li>
                  <li>
                    Upload documents containing personal information of others
                    without consent
                  </li>
                  <li>
                    Use the service for any unlawful or fraudulent purposes
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                5. Subscription and Payment
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  SummarizeAI offers both free and premium subscription tiers:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    Free accounts include basic summarization with usage limits
                  </li>
                  <li>
                    Premium subscriptions provide unlimited processing and
                    advanced features
                  </li>
                  <li>
                    Billing occurs monthly or annually based on your selected
                    plan
                  </li>
                  <li>
                    All fees are charged in advance and are non-refundable
                  </li>
                  <li>
                    You may cancel your subscription at any time through your
                    account settings
                  </li>
                </ul>
                <p>
                  We reserve the right to modify pricing with 30 days notice to
                  existing subscribers.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                6. Document Processing and Data
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>By uploading documents to SummarizeAI:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    You grant us permission to process and analyze your
                    documents
                  </li>
                  <li>
                    You confirm you have the right to upload and process the
                    content
                  </li>
                  <li>
                    You understand that original PDFs are deleted within 24
                    hours
                  </li>
                  <li>
                    Generated summaries remain associated with your account
                  </li>
                  <li>
                    You retain ownership of your original content and generated
                    summaries
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                7. Intellectual Property
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  The SummarizeAI platform, including its AI models, algorithms,
                  design, and functionality, is owned by SummarizeAI and
                  protected by intellectual property laws. You retain ownership
                  of your uploaded documents and generated summaries.
                </p>
                <p>
                  We grant you a limited, non-exclusive license to use our
                  service according to these terms.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibent mb-4">
                8. Limitation of Liability
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  SummarizeAI provides AI-generated content "as is" without
                  warranties of accuracy, completeness, or reliability. We are
                  not liable for:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Errors or inaccuracies in AI-generated summaries</li>
                  <li>Decisions made based on our summaries</li>
                  <li>Technical interruptions or service unavailability</li>
                  <li>Loss of data or documents (beyond our control)</li>
                  <li>Indirect, incidental, or consequential damages</li>
                </ul>
                <p>
                  Our total liability shall not exceed the amount paid by you in
                  the 12 months preceding the claim.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">
                9. Service Availability
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  We strive to maintain high service availability but do not
                  guarantee uninterrupted access. We may temporarily suspend
                  service for:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Scheduled maintenance and updates</li>
                  <li>Emergency security measures</li>
                  <li>Technical issues beyond our control</li>
                  <li>Compliance with legal requirements</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Termination</h2>
              <div className="space-y-4 text-gray-300">
                <p>Either party may terminate this agreement:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    You may cancel your account at any time through your
                    dashboard
                  </li>
                  <li>
                    We may suspend or terminate accounts for terms violations
                  </li>
                  <li>We may discontinue the service with 30 days notice</li>
                  <li>
                    Upon termination, your access to summaries will be removed
                  </li>
                </ul>
                <p>
                  You may export your data before termination through your
                  account settings.
                </p>
              </div>
            </section>
            <section>
              <h2 className="text-2xl font-semibold mb-4">
                11. Changes to Terms
              </h2>
              <p className="text-gray-300 leading-relaxed">
                We reserve the right to modify these Terms at any time. We will
                notify users of significant changes via email or service
                notifications. Continued use of SummarizeAI after changes
                constitutes acceptance of the updated terms. We encourage you to
                review these terms periodically.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Contact Us</h2>
              <p className="text-gray-300 leading-relaxed">
                If you have any questions about these Terms of Service or need
                clarification on any provisions, please{" "}
                <Link
                  href={PUBLIC_ROUTES.CONTACT}
                  className="text-[#4F6BFF] hover:text-[#4F6BFF]/80 underline"
                >
                  contact us
                </Link>
                . We are here to help and ensure you understand your rights and
                obligations when using our service.
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
