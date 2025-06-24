"use client";
import { Button } from "@/components/ui/button";
import { PUBLIC_ROUTES } from "@/constants/routes";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Download,
  FileText,
  Lightbulb,
  Shield,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Enhanced background elements */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#4F6BFF08_1px,transparent_1px),linear-gradient(to_bottom,#4F6BFF08_1px,transparent_1px)] bg-[size:32px_32px]" />
      <div className="fixed top-0 -left-48 h-96 w-96 bg-[#4F6BFF]/15 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-0 -right-48 h-96 w-96 bg-[#6B7FFF]/15 rounded-full blur-3xl animate-pulse delay-700" />
      <div className="fixed top-1/2 -right-24 h-64 w-64 bg-[#8B5FFF]/10 rounded-full blur-2xl animate-pulse delay-1000" />

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center p-8 pt-32 pb-20 max-w-7xl mx-auto text-center">
        {/* AI Badge */}
        <div className="group relative flex items-center gap-3 rounded-full border border-[#4F6BFF]/30 bg-black/60 px-8 py-4 transition-all duration-500 hover:border-[#4F6BFF] hover:bg-black/80 hover:shadow-xl hover:shadow-[#4F6BFF]/25 backdrop-blur-md mb-8">
          <Sparkles className="w-5 h-5 text-[#4F6BFF] animate-pulse" />
          <p className="text-sm font-semibold text-gray-200">
            Powered by Advanced AI Technology
          </p>
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#4F6BFF]/0 via-[#4F6BFF]/40 to-[#4F6BFF]/0 opacity-0 blur-sm transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* Main Heading */}
        <div className="space-y-6 mb-12">
          <h1 className="text-6xl md:text-7xl font-bold leading-tight max-w-5xl">
            Transform PDFs into{" "}
            <span className="relative">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F6BFF] via-[#6B7FFF] to-[#8B5FFF] animate-gradient">
                intelligent summaries
              </span>
              <div className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-[#4F6BFF] via-[#6B7FFF] to-[#8B5FFF] animate-gradient blur-sm opacity-50" />
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Save hours of reading time with our AI-powered summarization. Upload
            any PDF and get instant, accurate summaries with key insights
            highlighted.
          </p>
        </div>

        {/* CTA Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#4F6BFF] to-[#6B7FFF] rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
            <Button
              size="lg"
              className="relative px-10 py-6 bg-black text-white hover:bg-black/90 border border-[#4F6BFF]/50 group-hover:border-[#4F6BFF] text-lg font-semibold flex items-center gap-2"
              onClick={() => router.push(PUBLIC_ROUTES.LOGIN)}
            >
              Start Summarizing Now
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {[
            { icon: FileText, value: "10K+", label: "Documents Processed" },
            { icon: Users, value: "2K+", label: "Happy Users" },
            { icon: Clock, value: "95%", label: "Time Saved" },
            { icon: Star, value: "4.9", label: "User Rating" },
          ].map((stat, index) => (
            <div
              key={index}
              className="group relative p-6 rounded-2xl border border-[#4F6BFF]/10 bg-black/30 backdrop-blur-sm hover:border-[#4F6BFF]/30 hover:bg-black/50 transition-all duration-500"
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4F6BFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <stat.icon className="w-8 h-8 text-[#4F6BFF] mb-3 mx-auto group-hover:scale-110 transition-transform duration-300" />
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F6BFF] to-[#6B7FFF]">
                SummarizeAI
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Experience the power of AI-driven document analysis with features
              designed for efficiency and accuracy.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "Get summaries in seconds, not hours. Our AI processes documents instantly.",
                color: "from-yellow-400 to-orange-500",
              },
              {
                icon: Shield,
                title: "100% Secure",
                description:
                  "Your documents are encrypted and automatically deleted after processing.",
                color: "from-green-400 to-emerald-500",
              },
              {
                icon: Download,
                title: "Export Options",
                description:
                  "Download summaries in multiple formats: PDF, Word, or Markdown.",
                color: "from-blue-400 to-indigo-500",
              },
              {
                icon: Lightbulb,
                title: "Smart Insights",
                description:
                  "AI identifies key themes, important points, and actionable insights.",
                color: "from-purple-400 to-pink-500",
              },
              {
                icon: TrendingUp,
                title: "Accuracy Focused",
                description:
                  "Advanced language models ensure precise and contextual summaries.",
                color: "from-cyan-400 to-blue-500",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description:
                  "Share summaries with your team and collaborate on insights.",
                color: "from-rose-400 to-red-500",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="group relative p-8 rounded-2xl border border-[#4F6BFF]/10 bg-black/30 backdrop-blur-sm hover:border-[#4F6BFF]/30 hover:bg-black/50 transition-all duration-500 hover:scale-105"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#4F6BFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div
                  className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} p-3 mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <feature.icon className="w-full h-full text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative py-20 px-8 bg-gradient-to-b from-black to-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Simple. Fast.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F6BFF] to-[#6B7FFF]">
                Effective.
              </span>
            </h2>
            <p className="text-xl text-gray-300">
              Get started in just three easy steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Upload Your PDF",
                description:
                  "Drag and drop your document or click to upload. We support all PDF formats.",
                icon: FileText,
              },
              {
                step: "02",
                title: "AI Processing",
                description:
                  "Our advanced AI analyzes your document and extracts key information.",
                icon: Sparkles,
              },
              {
                step: "03",
                title: "Get Your Summary",
                description:
                  "Receive a comprehensive summary with insights and export options.",
                icon: CheckCircle,
              },
            ].map((step, index) => (
              <div key={index} className="relative text-center group">
                <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-[#4F6BFF] to-[#6B7FFF] mb-6 group-hover:scale-110 transition-transform duration-300">
                  <step.icon className="w-10 h-10 text-white" />
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-black border-2 border-[#4F6BFF] flex items-center justify-center">
                    <span className="text-xs font-bold text-[#4F6BFF]">
                      {step.step}
                    </span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  {step.description}
                </p>

                {index < 2 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-[#4F6BFF]/50 to-transparent transform -translate-x-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-20 px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative p-12 rounded-3xl border border-[#4F6BFF]/20 bg-black/40 backdrop-blur-xl">
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#4F6BFF]/10 via-transparent to-[#6B7FFF]/10" />
            <h2 className="relative text-4xl md:text-5xl font-bold mb-6">
              Ready to transform your workflow?
            </h2>
            <p className="relative text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of professionals who save time every day with
              SummarizeAI.
            </p>
            <div className="relative group inline-block">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#4F6BFF] to-[#6B7FFF] rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300" />
              <Button
                size="lg"
                className="relative px-12 py-6 bg-black text-white hover:bg-black/90 border border-[#4F6BFF]/50 group-hover:border-[#4F6BFF] text-xl font-semibold"
                onClick={() => router.push(PUBLIC_ROUTES.LOGIN)}
              >
                Get Started for Free
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
