import { extractPdfText } from "@/lib/services/extract-pdf-text";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { pdfUrl } = await request.json();

        if (!pdfUrl) {
            return NextResponse.json(
                { success: false, error: "PDF URL is required" },
                { status: 400 }
            );
        }

        // Validate URL format
        try {
            new URL(pdfUrl);
        } catch (error) {
            return NextResponse.json(
                { success: false, error: "Invalid PDF URL format" },
                { status: 400 }
            );
        }

        console.log("Starting PDF text extraction for URL:", pdfUrl);

        // Extract text from PDF
        const extractedText = await extractPdfText(pdfUrl);

        console.log("PDF text extraction successful. Text length:", extractedText.length);

        return NextResponse.json({
            success: true,
            text: extractedText,
            length: extractedText.length,
        });
    } catch (error) {
        console.error("Error in PDF extraction API:", error);

        // Provide more specific error messages
        let errorMessage = "Failed to extract PDF text";

        if (error instanceof Error) {
            if (error.message.includes("Failed to fetch PDF")) {
                errorMessage = "Could not download the PDF file. Please check if the URL is accessible.";
            } else if (error.message.includes("No text content")) {
                errorMessage = "The PDF appears to be empty or contains no extractable text.";
            } else {
                errorMessage = error.message;
            }
        }

        return NextResponse.json(
            {
                success: false,
                error: errorMessage,
            },
            { status: 500 }
        );
    }
} 