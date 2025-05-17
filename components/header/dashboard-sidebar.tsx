"use client";

import { signOut } from "@/app/actions/auth";
import { PUBLIC_ROUTES } from "@/constants/routes";
import { clearSession } from "@/lib/session/userSession";
import {
  ChevronDown,
  ChevronUp,
  CreditCard,
  FileText,
  Key,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
];

const settingsDropdownItems = [
  {
    name: "Profile Details",
    href: "/dashboard/settings/profile",
    icon: User,
  },
  {
    name: "Change Password",
    href: "/dashboard/settings/password",
    icon: Key,
  },
  {
    name: "Subscription",
    href: "/dashboard/settings/subscription",
    icon: CreditCard,
  },
];

export function DashboardSidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isSettingsActive = pathname?.startsWith("/dashboard/settings");

  return (
    <>
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
          <div className="p-6 text-center">
            <Link href="/dashboard">
              <h1 className="text-2xl font-bold text-white cursor-pointer">
                SummarizeAI
              </h1>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4">
            <ul className="space-y-2">
              {/* Regular menu items */}
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

              {/* Settings Dropdown */}
              <li>
                <button
                  onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-lg transition-colors ${isSettingsActive
                    ? "bg-[#4F6BFF] text-white"
                    : "hover:bg-[#4F6BFF]/10"
                    }`}
                >
                  <div className="flex items-center space-x-3">
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </div>
                  {isSettingsOpen ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {/* Settings Dropdown Items */}
                {isSettingsOpen && (
                  <ul className="mt-2 ml-4 space-y-2">
                    {settingsDropdownItems.map((item) => {
                      const isActive = pathname === item.href;
                      return (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className={`flex items-center px-4 py-2 rounded-lg transition-colors ${isActive
                              ? "bg-[#4F6BFF]/20 text-white"
                              : "text-gray-400 hover:bg-[#4F6BFF]/10 hover:text-white"
                              }`}
                          >
                            <item.icon className="h-4 w-4 mr-2" />
                            <div>
                              <div className="text-sm">{item.name}</div>
                            </div>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            </ul>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-[#4F6BFF]/20">
            <button
              onClick={async () => {
                await signOut();
                await clearSession();
                router.push(PUBLIC_ROUTES.LOGIN);
                router.refresh();
              }}
              className="flex items-center space-x-3 px-4 py-3 w-full rounded-lg hover:bg-[#4F6BFF]/10 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
