import { generateAISummary, generateSummaryReel } from "@/lib/services/ai-summary";
import { extractPdfText } from "@/lib/services/extract-pdf-text";
import { updatePdfSummary } from "@/lib/services/pdf";
import { SummaryReel } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { pdfUrl, documentId, userId, isReel } = await request.json();

        if (!pdfUrl || !documentId || !userId) {
            return NextResponse.json(
                { success: false, error: "PDF URL, document ID, and user ID are required" },
                { status: 400 },
            );
        }

        // Validate URL format
        try {
            new URL(pdfUrl);
        } catch (error) {
            return NextResponse.json(
                { success: false, error: "Invalid PDF URL format" },
                { status: 400 },
            );
        }

        console.log("Starting AI-powered summary generation for URL:", pdfUrl);

        try {
            // Step 1: Extract text from PDF
            console.log("Extracting text from PDF...");
            const extractedText = await extractPdfText(pdfUrl);

            if (!extractedText || extractedText.trim().length === 0) {
                throw new Error("No text content could be extracted from the PDF");
            }
            let aiSummary: string | null = null;
            let summaryReel: SummaryReel | null = null;
            if (isReel) {
                summaryReel = await generateSummaryReel(extractedText);
            } else {
                aiSummary = await generateAISummary(extractedText);
                const updateResult = await updatePdfSummary(documentId, userId, {
                    summaryText: aiSummary,
                    status: "completed" as const,
                });

                if (!updateResult.success) {
                    throw new Error(updateResult.error || "Failed to update database");
                }
            }

            return NextResponse.json({
                success: true,
                summary: aiSummary,
                summaryReel: summaryReel,
                textLength: extractedText.length,
            });

        } catch (error) {
            console.error("Error in summary generation process:", error);

            // Update database status to failed
            try {
                await updatePdfSummary(documentId, userId, {
                    status: "failed" as const,
                });
            } catch (dbError) {
                console.error("Failed to update database status to failed:", dbError);
            }

            throw error;
        }

    } catch (error) {
        console.error("Error in AI summary generation API:", error);

        // Provide more specific error messages
        let errorMessage = "Failed to generate AI summary";

        if (error instanceof Error) {
            if (error.message.includes("Failed to fetch PDF")) {
                errorMessage = "Could not download the PDF file. Please check if the URL is accessible.";
            } else if (error.message.includes("No text content")) {
                errorMessage = "The PDF appears to be empty or contains no extractable text.";
            } else if (error.message.includes("API key")) {
                errorMessage = "AI service configuration error. Please contact support.";
            } else {
                errorMessage = error.message;
            }
        }

        return NextResponse.json(
            {
                success: false,
                error: errorMessage,
            },
            { status: 500 },
        );
    }
} 