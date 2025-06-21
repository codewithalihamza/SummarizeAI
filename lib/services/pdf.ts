import { UploadPdfData } from "@/types";
import { and, desc, eq } from "drizzle-orm";
import { db } from "../db";
import { pdfSummaries } from "../schema/pdf";

export type PdfSummary = typeof pdfSummaries.$inferSelect;

export class PdfService {
  static async createPdfSummary(data: UploadPdfData) {
    try {
      const [pdf] = await db
        .insert(pdfSummaries)
        .values({
          userId: data.userId,
          originalFileUrl: data.originalFileUrl,
          fileName: data.fileName,
          title: data.title,
          status: "pending",
        })
        .returning();

      return { success: true, pdf };
    } catch (error) {
      console.error("PDF upload error:", error);
      return { success: false, error: "Failed to save PDF details" };
    }
  }

  static async getAllPdfSummaries(userId: string) {
    try {
      const pdfs = await db
        .select()
        .from(pdfSummaries)
        .where(eq(pdfSummaries.userId, userId))
        .orderBy(desc(pdfSummaries.createdAt));

      return { success: true, pdfs };
    } catch (error) {
      console.error("Error fetching PDFs:", error);
      return { success: false, error: "Failed to fetch PDFs" };
    }
  }

  static async getPdfSummaryById(id: string, userId: string) {
    try {
      const pdf = await db
        .select()
        .from(pdfSummaries)
        .where(and(eq(pdfSummaries.id, id), eq(pdfSummaries.userId, userId)))
        .then((results: PdfSummary[]) => results[0] || null);

      if (!pdf) {
        return { success: false, error: "PDF not found" };
      }

      return { success: true, pdf };
    } catch (error) {
      console.error("Error fetching PDF:", error);
      return { success: false, error: "Failed to fetch PDF" };
    }
  }

  static async updatePdfSummary(
    id: string,
    userId: string,
    data: { summaryText?: string; status?: "pending" | "completed" | "failed" }
  ) {
    try {
      const [pdf] = await db
        .update(pdfSummaries)
        .set({
          ...data,
          updatedAt: new Date(),
        })
        .where(and(eq(pdfSummaries.id, id), eq(pdfSummaries.userId, userId)))
        .returning();

      if (!pdf) {
        return { success: false, error: "PDF not found" };
      }

      return { success: true, pdf };
    } catch (error) {
      console.error("Error updating PDF summary:", error);
      return { success: false, error: "Failed to update PDF summary" };
    }
  }
}

// Export the updatePdfSummary function for direct use
export const updatePdfSummary = PdfService.updatePdfSummary;
