"use client";

import { signUp } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function SignUp() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const result = await signUp(formData);

      if (result.success) {
        toast.success("Account created successfully!");
        router.push("/sign-in");
      } else {
        toast.error(result.error || "Failed to create account");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4F6BFF10_1px,transparent_1px),linear-gradient(to_bottom,#4F6BFF10_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="absolute top-0 -left-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 -right-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse delay-700" />

      {/* Sign Up Container */}
      <div className="relative w-full max-w-md">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4F6BFF]/30 to-[#6B7FFF]/30 rounded-2xl blur-xl" />
        <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">Create an Account</h2>
            <p className="text-gray-400">Join SummarizeAI today</p>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Full Name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-black/50 border-[#4F6BFF]/30 text-white placeholder:text-gray-500 focus:border-[#4F6BFF] focus:ring-1 focus:ring-[#4F6BFF] transition-all duration-300"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
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
                name="password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-black/50 border-[#4F6BFF]/30 text-white placeholder:text-gray-500 focus:border-[#4F6BFF] focus:ring-1 focus:ring-[#4F6BFF] transition-all duration-300"
                required
                disabled={isLoading}
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Confirm Password
              </label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-black/50 border-[#4F6BFF]/30 text-white placeholder:text-gray-500 focus:border-[#4F6BFF] focus:ring-1 focus:ring-[#4F6BFF] transition-all duration-300"
                required
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center text-sm">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-[#4F6BFF]/30 bg-black/50 text-[#4F6BFF] focus:ring-[#4F6BFF] focus:ring-offset-0"
                required
              />
              <label htmlFor="terms" className="ml-2 text-gray-300">
                I agree to the{" "}
                <Link
                  href="/terms"
                  className="text-[#4F6BFF] hover:text-[#4F6BFF]/80 transition-colors"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#4F6BFF] hover:text-[#4F6BFF]/80 transition-colors"
                >
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#4F6BFF] text-white hover:bg-[#4F6BFF]/90 transition-all duration-300 mt-6"
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="text-[#4F6BFF] hover:text-[#4F6BFF]/80 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}
