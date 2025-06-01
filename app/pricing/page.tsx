"use client";

import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const pricingPlans = [
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
  },
];

export default function Pricing() {
  return (
    <div className="relative min-h-screen bg-black text-white pt-24 pb-8 px-8">
      {/* Background Effects */}
      <div className="fixed bg-[linear-gradient(to_right,#4F6BFF10_1px,transparent_1px),linear-gradient(to_bottom,#4F6BFF10_1px,transparent_1px)] bg-[size:24px_24px]" />
      <div className="fixed top-0 -left-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-0 -right-48 h-96 w-96 bg-[#4F6BFF]/20 rounded-full blur-3xl animate-pulse delay-700" />

      <div className="relative max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-400">
            Choose the plan that's right for you
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingPlans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl p-8 ${
                plan.popular
                  ? "border-2 border-[#4F6BFF]"
                  : "border border-[#4F6BFF]/20"
              } bg-black/40 backdrop-blur-xl`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-[#4F6BFF] text-white px-4 py-1 rounded-full text-sm">
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold mb-2">{plan.price}</div>
                <div className="text-gray-400">{plan.period}</div>
                <p className="mt-4 text-gray-300">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-[#4F6BFF] mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  plan.popular
                    ? "bg-[#4F6BFF] hover:bg-[#4F6BFF]/90"
                    : "bg-white/10 hover:bg-white/20"
                } transition-colors duration-300`}
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-24 text-center">
          <h2 className="text-2xl font-bold mb-4">Have questions?</h2>
          <p className="text-gray-400">
            Contact our support team at{" "}
            <a
              href="mailto:support@summarizeai.com"
              className="text-[#4F6BFF] hover:text-[#4F6BFF]/80"
            >
              support@summarizeai.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
