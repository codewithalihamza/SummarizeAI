import { db } from '../db';
import { pdfSummaries } from '../schema/pdf';

type UploadPdfData = {
    userId: string;
    originalFileUrl: string;
    fileName: string;
    title: string;
};

export class PdfService {
    static async createPdfSummary(data: UploadPdfData) {
        try {
            const [pdf] = await db.insert(pdfSummaries).values({
                userId: data.userId,
                originalFileUrl: data.originalFileUrl,
                fileName: data.fileName,
                title: data.title,
                status: 'pending',
            }).returning();

            return { success: true, pdf };
        } catch (error) {
            console.error('PDF upload error:', error);
            return { success: false, error: 'Failed to save PDF details' };
        }
    }
} 