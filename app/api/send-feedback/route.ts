import { EmailService } from "@/lib/services/email";
import { FeedbackData } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body: FeedbackData = await request.json();

    // Validate input
    const { name, email, category, description } = body;

    if (!name || !email || !category || !description) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Validate description length
    if (description.trim().length < 10) {
      return NextResponse.json(
        { error: "Description must be at least 10 characters long" },
        { status: 400 },
      );
    }

    // Send email using EmailService
    const emailResult = await EmailService.sendFeedbackEmail({
      name,
      email,
      category,
      description,
    });

    if (!emailResult.success) {
      return NextResponse.json(
        { error: emailResult.error || "Failed to send feedback email" },
        { status: 500 },
      );
    }
    return NextResponse.json({
      success: true,
      message: "Feedback sent successfully! We will get back to you soon.",
    });
  } catch (error) {
    console.error("❌ Feedback submission error:", error);
    return NextResponse.json(
      { error: "Failed to send feedback. Please try again later." },
      { status: 500 },
    );
  }
}
