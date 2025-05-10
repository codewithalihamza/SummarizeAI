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
        <header className="fixed top-0 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
                {/* Left side - Logo */}
                <div className="flex items-center">
                    <Link href="/">
                        <div className="flex items-center space-x-2">
                            <Image src={logo} alt="SummarizeAI Logo" width={32} height={32} />
                            <span className="font-bold text-xl text-[#4F6BFF]">
                                SummarizeAI
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Middle - Navigation */}
                <nav className="flex items-center space-x-6">
                    <Link
                        href="/pricing"
                        className="font-medium text-sm transition-colors hover:text-[#4F6BFF] text-foreground"
                    >
                        Pricing
                    </Link>
                </nav>

                {/* Right side - Auth */}
                <div className="flex items-center space-x-4">
                    <Link href="/sign-in" className="inline-block">
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-sm"
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
