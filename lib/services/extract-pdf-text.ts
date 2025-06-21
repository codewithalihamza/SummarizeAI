import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

/**
 * Extracts text content from a PDF file using LangChain PDFLoader
 * @param pdfUrl - The URL/link to the PDF file
 * @returns Promise<string> - The extracted text content
 */
export async function extractPdfText(pdfUrl: string): Promise<string> {
    try {
        // Fetch the PDF file from the URL
        const response = await fetch(pdfUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
        }

        // Get the PDF as an ArrayBuffer
        const pdfBuffer = await response.arrayBuffer();

        // Convert ArrayBuffer to Blob
        const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

        // Create a PDFLoader instance with the PDF Blob
        const loader = new PDFLoader(pdfBlob, {
            // Split pages for better text extraction
            splitPages: false,
        });

        // Load and extract the documents
        const docs = await loader.load();

        // Combine all page contents into a single text string
        const extractedText = docs
            .map((doc: any) => doc.pageContent)
            .join("\n\n")
            .trim();

        if (!extractedText) {
            throw new Error("No text content could be extracted from the PDF");
        }

        return extractedText;
    } catch (error) {
        console.error("Error extracting text from PDF:", error);
        throw new Error(
            `Failed to extract text from PDF: ${error instanceof Error ? error.message : "Unknown error"}`
        );
    }
}

/**
 * Extracts text content from a PDF file with page separation
 * @param pdfUrl - The URL/link to the PDF file
 * @returns Promise<Array<{pageNumber: number, content: string}>> - Array of page contents
 */
export async function extractPdfTextByPages(
    pdfUrl: string
): Promise<Array<{ pageNumber: number; content: string }>> {
    try {
        // Fetch the PDF file from the URL
        const response = await fetch(pdfUrl);

        if (!response.ok) {
            throw new Error(`Failed to fetch PDF: ${response.status} ${response.statusText}`);
        }

        // Get the PDF as an ArrayBuffer
        const pdfBuffer = await response.arrayBuffer();

        // Convert ArrayBuffer to Blob
        const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });

        // Create a PDFLoader instance with page splitting enabled
        const loader = new PDFLoader(pdfBlob, {
            splitPages: true,
        });

        // Load and extract the documents
        const docs = await loader.load();

        // Map documents to page objects
        const pages = docs.map((doc: any, index: number) => ({
            pageNumber: index + 1,
            content: doc.pageContent.trim(),
        }));

        return pages;
    } catch (error) {
        console.error("Error extracting text from PDF by pages:", error);
        throw new Error(
            `Failed to extract text from PDF by pages: ${error instanceof Error ? error.message : "Unknown error"}`
        );
    }
}
