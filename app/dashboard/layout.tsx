import { DashboardSidebar } from "@/components/header/dashboard-sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative min-h-screen bg-black text-white">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-[linear-gradient(to_right,#4F6BFF10_1px,transparent_1px),linear-gradient(to_bottom,#4F6BFF10_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="fixed top-0 -left-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse" />
            <div className="fixed bottom-0 -right-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse delay-700" />

            <DashboardSidebar />

            {/* Main Content */}
            <main className="min-h-screen transition-all duration-300 md:pl-64">
                <div className="p-8">{children}</div>
            </main>
        </div>
    );
} 