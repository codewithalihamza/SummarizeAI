"use client";

import { Button } from "@/components/ui/button";
import logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import * as React from "react";

const Header = () => {
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <header className="h-14" />;
    }

    return (
        <header className="fixed top-0 w-full z-50">
            {/* Dark background with blur effect */}
            <div className="absolute inset-0 bg-black/80 border-b border-[#4F6BFF]/20 backdrop-blur-md" />

            {/* Decorative elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4F6BFF10_1px,transparent_1px),linear-gradient(to_bottom,#4F6BFF10_1px,transparent_1px)] bg-[size:14px_24px] opacity-50" />

            <div className="container relative flex h-16 max-w-screen-2xl items-center justify-between">
                {/* Left side - Logo */}
                <div className="flex items-center">
                    <Link href="/" className="group">
                        <div className="flex items-center space-x-3 relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#4F6BFF]/0 to-[#4F6BFF]/10 blur-xl group-hover:blur-2xl transition-all duration-300" />
                            <Image
                                src={logo}
                                alt="SummarizeAI Logo"
                                width={27}
                                height={27}
                                className="relative z-10"
                            />
                            <span className="relative z-10 font-medium text-lg text-gray-300 transition-colors group-hover:text-[#4F6BFF]">
                                SummarizeAI
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Middle - Navigation */}
                <nav className="flex items-center space-x-8">
                    <Link
                        href="/pricing"
                        className="nav-link font-medium text-sm text-gray-400 transition-all duration-300 hover:text-white relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#4F6BFF] after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/contact"
                        className="nav-link font-medium text-sm text-gray-400 transition-all duration-300 hover:text-white relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#4F6BFF] after:transition-all after:duration-300 hover:after:w-full"
                    >
                        Contact Us
                    </Link>
                </nav>

                {/* Right side - Auth */}
                <div className="flex items-center space-x-4">
                    <Link href="/sign-in" className="inline-block group">
                        <Button
                            variant="outline"
                            size="sm"
                            className="relative overflow-hidden bg-transparent border border-[#4F6BFF]/50 text-white transition-all duration-300 hover:border-[#4F6BFF] hover:bg-[#4F6BFF]/10 group-hover:shadow-[0_0_20px_rgba(79,107,255,0.3)]"
                        >
                            <span className="relative z-10">Sign In</span>
                            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#4F6BFF]/0 via-[#4F6BFF]/30 to-[#4F6BFF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
