"use client";

import { Button } from "@/components/ui/button";
import { CreditCard, Download } from "lucide-react";

const plans = [
    {
        name: "Basic",
        price: "$9.99",
        period: "per month",
        description: "Perfect for individuals and small projects",
        features: [
            "10 PDF summaries per month",
            "Basic AI summarization",
            "Export to PDF/Word",
            "Email support",
        ],
        popular: false,
    },
    {
        name: "Pro",
        price: "$24.99",
        period: "per month",
        description: "Ideal for professionals and teams",
        features: [
            "50 PDF summaries per month",
            "Advanced AI summarization",
            "Priority processing",
            "Custom export formats",
            "Priority support",
            "Team sharing",
        ],
        popular: true,
    },
    {
        name: "Enterprise",
        price: "$99.99",
        period: "per month",
        description: "For large organizations with custom needs",
        features: [
            "Unlimited PDF summaries",
            "Custom AI model training",
            "API access",
            "Advanced analytics",
            "24/7 dedicated support",
            "Custom integration",
            "SSO & advanced security",
        ],
        popular: false,
    },
];

export default function Subscription() {
    return (
        <div className="space-y-8 pt-12">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Subscription</h1>
                <p className="text-gray-400 mt-1">Manage your subscription and billing</p>
            </div>

            {/* Current Plan */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">Current Plan</h2>
                        <div className="mt-2">
                            <div className="text-2xl font-bold text-[#4F6BFF]">Pro Plan</div>
                            <div className="text-gray-400">$24.99/month</div>
                        </div>
                    </div>
                    <Button variant="outline" className="border-[#4F6BFF]/20 hover:bg-[#4F6BFF]/10">
                        <Download className="h-4 w-4 mr-2" />
                        Download Invoice
                    </Button>
                </div>

                <div className="mt-6 space-y-4">
                    <div className="flex items-center text-green-500">
                        <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                        Active until April 23, 2024
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <span>50 Documents/month</span>
                        <span>•</span>
                        <span>42 Documents used</span>
                        <span>•</span>
                        <span>8 Documents remaining</span>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-[#4F6BFF]/20">
                    <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                    <div className="flex items-center justify-between bg-black/30 rounded-lg p-4 border border-[#4F6BFF]/10">
                        <div className="flex items-center">
                            <CreditCard className="h-6 w-6 text-[#4F6BFF] mr-3" />
                            <div>
                                <div className="font-medium">•••• •••• •••• 4242</div>
                                <div className="text-sm text-gray-400">Expires 12/24</div>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="border-[#4F6BFF]/20 hover:bg-[#4F6BFF]/10">
                            Update
                        </Button>
                    </div>
                </div>
            </div>

            {/* Need Help */}
            <div className="text-center">
                <p className="text-gray-400">
                    Need help with your subscription?{" "}
                    <a href="mailto:support@summarizeai.com" className="text-[#4F6BFF] hover:text-[#4F6BFF]/80">
                        Contact support
                    </a>
                </p>
            </div>
        </div>
    );
} 