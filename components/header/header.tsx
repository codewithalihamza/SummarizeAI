"use client";

import { PUBLIC_ROUTES } from "@/constants/routes";
import logo from "@/public/logo.png";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

const navigationItems = [
  { name: "Home", href: "/" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact Us", href: "/contact" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
];

const Header = () => {
  const [mounted, setMounted] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Hide header on dashboard routes
  if (!mounted || pathname?.startsWith("/dashboard")) {
    return null;
  }

  return (
    <header className="fixed top-0 w-full z-50">
      {/* Dark background with blur effect */}
      <div className="absolute inset-0 bg-black/80 border-b border-[#4F6BFF]/20 backdrop-blur-md" />

      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4F6BFF10_1px,transparent_1px),linear-gradient(to_bottom,#4F6BFF10_1px,transparent_1px)] bg-[size:14px_24px] opacity-50" />

      <div className="container relative flex h-16 max-w-screen-2xl items-center justify-between px-4">
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden relative z-10 p-2 hover:bg-[#4F6BFF]/10 rounded-lg transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <Menu className="h-6 w-6 text-white" />
          )}
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="nav-link font-medium text-sm text-gray-400 transition-all duration-300 hover:text-white relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#4F6BFF] after:transition-all after:duration-300 hover:after:w-full"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Auth Button */}
        <div className="hidden md:block">
          <Link href={PUBLIC_ROUTES.LOGIN}
            className="nav-link font-medium text-sm text-gray-400 transition-all duration-300 hover:text-white relative after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-[#4F6BFF] after:transition-all after:duration-300 hover:after:w-full"
          >Sign In</Link>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-[#4F6BFF]/20 p-4 md:hidden">
            <nav className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-[#4F6BFF]/10"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="h-px bg-[#4F6BFF]/20 mx-4" />
              <Link
                href="/sign-in"
                className="bg-[#4F6BFF] text-white px-4 py-2 rounded-lg hover:bg-[#4F6BFF]/90 transition-colors text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
