"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FeedbackData } from "@/types";
import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const feedbackCategories = [
  { value: "bug", label: "🐛 Bug Report" },
  { value: "improvement", label: "💡 Improvement Suggestion" },
  { value: "feature", label: "✨ Feature Request" },
  { value: "contact", label: "📞 General Contact" },
  { value: "other", label: "📝 Other" },
];

export default function FeedbackPage() {
  const [formData, setFormData] = useState<FeedbackData>({
    name: "",
    email: "",
    category: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<FeedbackData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FeedbackData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.trim().length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof FeedbackData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Feedback sent successfully! Thank you for your input.");
        setFormData({
          name: "",
          email: "",
          category: "",
          description: "",
        });
      } else {
        throw new Error(result.error || "Failed to send feedback");
      }
    } catch (error) {
      console.error("Feedback submission error:", error);
      toast.error("Failed to send feedback. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Send Feedback 💬</h1>
        <p className="text-gray-400 mt-1">
          Help us improve SummarizeAI with your valuable feedback
        </p>
      </div>
      {/* Feedback Form */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Name *
              </label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`bg-black/50 border-[#4F6BFF]/30 ${
                  errors.name ? "border-red-500" : ""
                }`}
                placeholder="Enter your full name"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Your Email *
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`bg-black/50 border-[#4F6BFF]/30 ${
                  errors.email ? "border-red-500" : ""
                }`}
                placeholder="Enter your email address"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Category Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className={`w-full px-3 py-2 bg-black/50 border border-[#4F6BFF]/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4F6BFF] ${
                  errors.category ? "border-red-500" : ""
                }`}
                disabled={isSubmitting}
              >
                <option value="">Select a category</option>
                {feedbackCategories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={6}
                className={`w-full px-3 py-2 bg-black/50 border border-[#4F6BFF]/30 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#4F6BFF] resize-none ${
                  errors.description ? "border-red-500" : ""
                }`}
                placeholder="Please describe your feedback in detail. The more information you provide, the better we can help you."
                disabled={isSubmitting}
              />
              <div className="flex justify-between items-center mt-1">
                {errors.description && (
                  <p className="text-red-500 text-sm">{errors.description}</p>
                )}
                <p className="text-gray-500 text-xs ml-auto">
                  {formData.description.length}/500 characters
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#4F6BFF] to-purple-600 hover:from-[#4F6BFF]/90 hover:to-purple-600/90 text-white font-medium py-3 disabled:opacity-50"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Sending Feedback...
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Feedback
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Your feedback helps us make SummarizeAI better for everyone. We
            typically respond within 24-48 hours.
          </p>
        </div>
      </div>
    </div>
  );
}
