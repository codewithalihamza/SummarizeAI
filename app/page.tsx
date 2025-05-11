import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 pt-20">
      <div className="flex flex-col items-center justify-center gap-7">
        <div className="group relative flex items-center gap-2 rounded-full border border-[#4F6BFF]/20 bg-white/50 px-6 py-3 transition-all duration-300 hover:border-[#4F6BFF] hover:bg-white/80 hover:shadow-lg hover:shadow-[#4F6BFF]/20">
          <Sparkles className="w-6 h-6 text-[#4F6BFF] animate-pulse" />
          <p className="text-sm font-medium">Powered by AI</p>
          <div className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-[#4F6BFF]/0 via-[#4F6BFF]/50 to-[#4F6BFF]/0 opacity-0 blur transition-opacity duration-500 group-hover:opacity-100" />
        </div>

        <h1 className="text-4xl font-bold text-center">
          Transform PDF to Summary
        </h1>
        <div>
          <Button className="bg-[#4F6BFF] text-white hover:bg-[#4F6BFF]/90" size="lg">
            Try SummarizeAI
          </Button>
        </div>
      </div>
    </main>
  );
}
