"use server";

import { PdfService } from "@/lib/services/pdf";

type CreatePdfSummaryInput = {
  originalFileUrl: string;
  fileName: string;
  title: string;
  userId: string;
};

export async function createPdfSummary(data: CreatePdfSummaryInput) {
  try {
    const result = await PdfService.createPdfSummary({
      userId: data.userId,
      originalFileUrl: data.originalFileUrl,
      fileName: data.fileName,
      title: data.title,
    });

    return result;
  } catch (error) {
    console.error("Error creating PDF summary:", error);
    return { success: false, error: "Failed to save PDF details" };
  }
}

export async function getUserPdfSummaries(userId: string) {
  try {
    return await PdfService.getAllPdfSummaries(userId);
  } catch (error) {
    console.error("Error fetching PDF summaries:", error);
    return { success: false, error: "Failed to fetch PDFs" };
  }
}
