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
            <div className="absolute inset-0 bg-black/90 border-b border-[#4F6BFF]/20 backdrop-blur-sm" />

            {/* Decorative elements */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4F6BFF10_1px,transparent_1px),linear-gradient(to_bottom,#4F6BFF10_1px,transparent_1px)] bg-[size:14px_24px]" />
            <div className="absolute left-0 top-0 h-[120%] w-[20%] bg-[#4F6BFF]/10 blur-[100px] rounded-full" />
            <div className="absolute right-0 top-0 h-[120%] w-[20%] bg-[#4F6BFF]/10 blur-[100px] rounded-full" />

            <div className="container relative flex h-14 max-w-screen-2xl items-center justify-between">
                {/* Left side - Logo */}
                <div className="flex items-center">
                    <Link href="/">
                        <div className="flex items-center space-x-2">
                            <Image src={logo} alt="SummarizeAI Logo" width={27} height={27} />
                            <span className="font-medium text-lg text-gray-300 transition-colors hover:text-[#4F6BFF]">
                                SummarizeAI
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Middle - Navigation */}
                <nav className="flex items-center space-x-6">
                    <Link
                        href="/"
                        className="font-medium text-sm text-gray-300 transition-colors hover:text-[#4F6BFF]"
                    >
                        Home
                    </Link>
                    <Link
                        href="/pricing"
                        className="font-medium text-sm text-gray-300 transition-colors hover:text-[#4F6BFF]"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="/"
                        className="font-medium text-sm text-gray-300 transition-colors hover:text-[#4F6BFF]"
                    >
                        Contact Us
                    </Link>
                    <Link
                        href="/"
                        className="font-medium text-sm text-gray-300 transition-colors hover:text-[#4F6BFF]"
                    >
                        Privacy and Policy
                    </Link>
                </nav>

                {/* Right side - Auth */}
                <div className="flex items-center space-x-4">
                    <Link href="/sign-in" className="inline-block">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-white"
                        >
                            Sign In
                        </Button>
                    </Link>
                </div>
            </div>
        </header>
    );
};

export default Header;
