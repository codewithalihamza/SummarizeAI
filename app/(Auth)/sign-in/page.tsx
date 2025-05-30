"use client";

import { signIn } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes";
import { saveUserSession } from "@/lib/session/userSession";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { toast } from "sonner";

function SignInForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = searchParams.get("callbackUrl") || DEFAULT_LOGIN_REDIRECT;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signIn({ email, password });
      if (result.success && result.user) {
        saveUserSession({
          id: result.user.id,
          email: result.user.email,
          name: result.user.name,
        });
        toast.success("Signed in successfully!");
        router.push(callbackUrl);
      } else if (!result.success) {
        toast.error(result.error || "Failed to sign in");
      }
    } catch (error) {
      console.log("error", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-black/50 border-[#4F6BFF]/30 text-white placeholder:text-gray-500 focus:border-[#4F6BFF] focus:ring-1 focus:ring-[#4F6BFF] transition-all duration-300"
          required
          disabled={isLoading}
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-gray-300 mb-1"
        >
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-black/50 border-[#4F6BFF]/30 text-white placeholder:text-gray-500 focus:border-[#4F6BFF] focus:ring-1 focus:ring-[#4F6BFF] transition-all duration-300"
          required
          disabled={isLoading}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <Link
          href="/forgot-password"
          className="text-[#4F6BFF] hover:text-[#4F6BFF]/80 transition-colors"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        className="w-full bg-[#4F6BFF] text-white hover:bg-[#4F6BFF]/90 transition-all duration-300"
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Sign In"}
      </Button>
    </form>
  );
}

export default function SignIn() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute bg-[linear-gradient(to_right,#4F6BFF10_1px,transparent_1px),linear-gradient(to_bottom,#4F6BFF10_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-0 -left-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 -right-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse delay-700" />

      {/* Sign In Container */}
      <div className="relative w-full max-w-md">
        <div className="absolute bg-gradient-to-r from-[#4F6BFF]/30 to-[#6B7FFF]/30 rounded-2xl blur-xl" />
        <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
            <p className="text-gray-400">Sign in to continue to SummarizeAI</p>
          </div>

          {/* Sign In Form */}
          <Suspense fallback={<div>Loading...</div>}>
            <SignInForm />
          </Suspense>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              href="/sign-up"
              className="text-[#4F6BFF] hover:text-[#4F6BFF]/80 transition-colors"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
