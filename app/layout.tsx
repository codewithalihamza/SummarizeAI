import { Toaster } from "@/components/providers/toaster";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Source_Sans_3 as Font } from "next/font/google";
import "./globals.css";

const Header = dynamic(() => import("@/components/header/header"), {
  ssr: true,
});

const geistSans = Font({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "SummarizeAI",
  description:
    "SummarizeAI is a powerful AI-driven SaaS tool that converts lengthy PDF documents into clear, concise summaries in seconds.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} font-sans antialiased min-h-screen`}
      >
        <Header />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
