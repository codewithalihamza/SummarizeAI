"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle sign in logic here
    };

    return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center p-4">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4F6BFF10_1px,transparent_1px),linear-gradient(to_bottom,#4F6BFF10_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="absolute top-0 -left-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-0 -right-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse delay-700" />

            {/* Sign In Container */}
            <div className="relative w-full max-w-md">
                <div className="absolute inset-0 bg-gradient-to-r from-[#4F6BFF]/30 to-[#6B7FFF]/30 rounded-2xl blur-xl" />
                <div className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-8 shadow-xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                        <p className="text-gray-400">Sign in to continue to SummarizeAI</p>
                    </div>

                    {/* Sign In Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
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
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
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
                            />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center">
                                <input
                                    id="remember"
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-[#4F6BFF]/30 bg-black/50 text-[#4F6BFF] focus:ring-[#4F6BFF] focus:ring-offset-0"
                                />
                                <label htmlFor="remember" className="ml-2 text-gray-300">
                                    Remember me
                                </label>
                            </div>
                            <Link href="/forgot-password" className="text-[#4F6BFF] hover:text-[#4F6BFF]/80 transition-colors">
                                Forgot password?
                            </Link>
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-[#4F6BFF] text-white hover:bg-[#4F6BFF]/90 transition-all duration-300"
                        >
                            Sign In
                        </Button>
                    </form>

                    {/* Sign Up Link */}
                    <p className="mt-6 text-center text-sm text-gray-400">
                        Don't have an account?{" "}
                        <Link href="/sign-up" className="text-[#4F6BFF] hover:text-[#4F6BFF]/80 transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
} 