import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-24 pt-20 bg-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4F6BFF10_1px,transparent_1px),linear-gradient(to_bottom,#4F6BFF10_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-0 -left-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 -right-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="relative flex flex-col items-center justify-center gap-8 max-w-4xl mx-auto text-center">
        {/* AI Badge */}
        <div className="group relative flex items-center gap-2 rounded-full border border-[#4F6BFF]/20 bg-black/50 px-6 py-3 transition-all duration-300 hover:border-[#4F6BFF] hover:bg-black/80 hover:shadow-lg hover:shadow-[#4F6BFF]/20 backdrop-blur-sm">
          <Sparkles className="w-6 h-6 text-[#4F6BFF] animate-pulse" />
          <p className="text-sm font-medium text-gray-300">Powered by AI</p>
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#4F6BFF]/0 via-[#4F6BFF]/50 to-[#4F6BFF]/0 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-5xl font-bold leading-tight">
            Transform lengthy PDF documents into{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F6BFF] to-[#6B7FFF] animate-gradient">
              clear, concise summaries
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Save time and extract key insights effortlessly with our advanced AI-powered summarization tool
          </p>
        </div>

        {/* CTA Button */}
        <div className="relative mt-4 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#4F6BFF] to-[#6B7FFF] rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
          <Button
            size="lg"
            className="relative px-8 py-6 bg-black text-white hover:bg-black/90 border border-[#4F6BFF]/50 group-hover:border-[#4F6BFF]"
          >
            Try SummarizeAI for Free
          </Button>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-12">
          {["Fast & Accurate", "100% Secure", "Export to Markdown", "Multiple Formats", "AI-Powered", "24/7 Support"].map((feature) => (
            <div key={feature} className="px-4 py-3 rounded-lg border border-[#4F6BFF]/10 bg-black/30 backdrop-blur-sm text-gray-300 text-sm hover:border-[#4F6BFF]/30 hover:bg-black/50 transition-all duration-300">
              {feature}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
