"use client";

import {
    FileText,
    LayoutDashboard,
    LogOut,
    Menu,
    Settings,
    X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const sidebarItems = [
    {
        name: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Documents",
        href: "/dashboard/documents",
        icon: FileText,
    },
    {
        name: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();

    return (
        <div className="relative min-h-screen bg-black text-white">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#4F6BFF10_1px,transparent_1px),linear-gradient(to_bottom,#4F6BFF10_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="fixed top-0 -left-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse" />
            <div className="fixed bottom-0 -right-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse delay-700" />

            {/* Mobile Sidebar Toggle */}
            <button
                className="fixed top-4 left-4 z-50 p-2 bg-black/50 backdrop-blur-xl rounded-lg border border-[#4F6BFF]/20 md:hidden"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? (
                    <X className="h-6 w-6 text-white" />
                ) : (
                    <Menu className="h-6 w-6 text-white" />
                )}
            </button>

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 z-40 h-full w-64 bg-black/50 backdrop-blur-xl border-r border-[#4F6BFF]/20 transition-transform duration-300 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } md:translate-x-0`}
            >
                <div className="flex flex-col h-full">
                    {/* Logo */}
                    <div className="p-6">
                        <h1 className="text-2xl font-bold text-white">SummarizeAI</h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 px-4">
                        <ul className="space-y-2">
                            {sidebarItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <li key={item.name}>
                                        <Link
                                            href={item.href}
                                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                                ? "bg-[#4F6BFF] text-white"
                                                : "hover:bg-[#4F6BFF]/10"
                                                }`}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* User Section */}
                    <div className="p-4 border-t border-[#4F6BFF]/20">
                        <button className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg hover:bg-[#4F6BFF]/10 transition-colors">
                            <LogOut className="h-5 w-5" />
                            <span>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main
                className={`min-h-screen transition-all duration-300 ${isSidebarOpen ? "md:pl-64" : ""
                    }`}
            >
                <div className="p-8">{children}</div>
            </main>
        </div>
    );
} 