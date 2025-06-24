"use client";

import { PUBLIC_ROUTES } from "@/constants/routes";
import logo from "@/public/logo.png";
import { ChevronDown, Menu, X } from "lucide-react";
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
  const [isScrolled, setIsScrolled] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    setMounted(true);

    // Handle scroll effect
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Hide header on dashboard routes
  if (!mounted || pathname?.startsWith("/dashboard")) {
    return null;
  }

  const isActiveLink = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-xl bg-black/90 border-b border-[#4F6BFF]/30 shadow-lg shadow-[#4F6BFF]/5"
            : "backdrop-blur-md bg-black/70 border-b border-[#4F6BFF]/20"
        }`}
      >
        {/* Animated background pattern */}
        <div
          className={`absolute inset-0 bg-[linear-gradient(to_right,#4F6BFF08_1px,transparent_1px),linear-gradient(to_bottom,#4F6BFF08_1px,transparent_1px)] bg-[size:20px_20px] transition-opacity duration-500 ${
            isScrolled ? "opacity-30" : "opacity-50"
          }`}
        />

        {/* Animated glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#4F6BFF]/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-1000" />

        <div className="container relative flex h-16 max-w-screen-2xl items-center justify-between px-4">
          {/* Logo with enhanced animation */}
          <div className="flex items-center">
            <Link href="/" className="group relative">
              <div className="flex items-center space-x-3 relative p-2 -m-2 rounded-xl transition-all duration-300 group-hover:bg-[#4F6BFF]/10">
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#4F6BFF]/0 via-[#4F6BFF]/20 to-[#4F6BFF]/0 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-xl" />

                {/* Logo with bounce animation */}
                <div className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                  <Image
                    src={logo}
                    alt="SummarizeAI Logo"
                    width={28}
                    height={28}
                    className="drop-shadow-lg"
                  />
                </div>

                {/* Text with gradient animation */}
                <span className="relative z-10 font-semibold text-lg bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent transition-all duration-300 group-hover:from-[#4F6BFF] group-hover:to-[#6B7FFF]">
                  SummarizeAI
                </span>
              </div>
            </Link>
          </div>

          {/* Enhanced Mobile Menu Button */}
          <button
            className="md:hidden relative z-50 p-3 hover:bg-[#4F6BFF]/20 rounded-xl transition-all duration-300 group"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <div className="relative w-6 h-6">
              <Menu
                className={`absolute inset-0 h-6 w-6 text-white transition-all duration-300 ${
                  isMenuOpen
                    ? "opacity-0 rotate-90 scale-75"
                    : "opacity-100 rotate-0 scale-100"
                }`}
              />
              <X
                className={`absolute inset-0 h-6 w-6 text-white transition-all duration-300 ${
                  isMenuOpen
                    ? "opacity-100 rotate-0 scale-100"
                    : "opacity-0 -rotate-90 scale-75"
                }`}
              />
            </div>
          </button>

          {/* Enhanced Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-4 py-2 font-medium text-sm rounded-lg transition-all duration-300 group ${
                  isActiveLink(item.href)
                    ? "text-[#4F6BFF] bg-[#4F6BFF]/10"
                    : "text-gray-400 hover:text-white hover:bg-[#4F6BFF]/5"
                }`}
              >
                {/* Animated underline */}
                <span className="relative z-10">{item.name}</span>
                <div
                  className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#4F6BFF] to-[#6B7FFF] transition-all duration-300 ${
                    isActiveLink(item.href)
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }`}
                />

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#4F6BFF]/0 via-[#4F6BFF]/10 to-[#4F6BFF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg blur-sm" />
              </Link>
            ))}
          </nav>

          {/* Enhanced Auth Button */}
          <div className="hidden md:block">
            <Link
              href={PUBLIC_ROUTES.LOGIN}
              className="group relative inline-flex items-center px-6 py-2.5 font-semibold text-sm text-white bg-gradient-to-r from-[#4F6BFF] to-[#6B7FFF] rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#4F6BFF]/25 hover:scale-105 active:scale-95"
            >
              {/* Animated background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#6B7FFF] to-[#4F6BFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

              {/* Button text */}
              <span className="relative z-10">Sign In</span>

              {/* Animated border glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4F6BFF] to-[#6B7FFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl blur" />
            </Link>
          </div>
        </div>

        {/* Enhanced Mobile Menu with smooth animations */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 transition-all duration-500 ease-in-out ${
            isMenuOpen
              ? "opacity-100 translate-y-0 pointer-events-auto"
              : "opacity-0 -translate-y-4 pointer-events-none"
          }`}
        >
          <div className="bg-black/95 backdrop-blur-xl border-b border-[#4F6BFF]/20 mx-4 mt-2 rounded-2xl overflow-hidden shadow-2xl shadow-[#4F6BFF]/10">
            {/* Mobile navigation items */}
            <nav className="p-6 space-y-2">
              {navigationItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 ${
                    isActiveLink(item.href)
                      ? "text-[#4F6BFF] bg-[#4F6BFF]/10"
                      : "text-gray-400 hover:text-white hover:bg-[#4F6BFF]/5"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMenuOpen
                      ? "slideInUp 0.3s ease-out forwards"
                      : undefined,
                  }}
                >
                  <span className="font-medium">{item.name}</span>
                  <ChevronDown className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                </Link>
              ))}

              {/* Divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-[#4F6BFF]/30 to-transparent my-4" />

              {/* Mobile Auth Button */}
              <Link
                href="/sign-in"
                className="group relative flex items-center justify-center w-full px-4 py-3 font-semibold text-white bg-gradient-to-r from-[#4F6BFF] to-[#6B7FFF] rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#4F6BFF]/25 active:scale-95"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-[#6B7FFF] to-[#4F6BFF] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                <span className="relative z-10">Sign In</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Add keyframes for mobile menu animations */}
      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default Header;
