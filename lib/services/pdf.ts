import { desc, eq } from "drizzle-orm";
import { db } from "../db";
import { pdfSummaries } from "../schema/pdf";

type UploadPdfData = {
  userId: string;
  originalFileUrl: string;
  fileName: string;
  title: string;
};

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
}
