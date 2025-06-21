import { getPdfSummaryById, getUserPdfSummaries } from "@/app/actions/pdf";
import { PRIVATE_ROUTES } from "@/constants/routes";
import type { PdfSummary } from "@/lib/services/pdf";
import { cookies } from "@/lib/session/userSession";
import {
  SummaryReel,
  UseDocumentDetailReturn,
  UseDocumentsReturn,
  UseExtractPdfTextReturn,
} from "@/types";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

/**
 * Hook to manage fetching a single document by ID
 */
export function useDocumentDetail(documentId: string): UseDocumentDetailReturn {
  const [document, setDocument] = useState<PdfSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const userId = cookies.get("id");

  const fetchDocument = useCallback(async () => {
    if (!userId) {
      const errorMsg = "User not authenticated";
      toast.error(errorMsg);
      router.push(PRIVATE_ROUTES.DOCUMENTS);
      return;
    }

    if (!documentId) {
      const errorMsg = "Invalid document ID";
      toast.error(errorMsg);
      router.push(PRIVATE_ROUTES.DOCUMENTS);
      return;
    }

    try {
      setIsLoading(true);
      const result = await getPdfSummaryById(documentId, userId);
      if (result.success && result.pdf) {
        setDocument(result.pdf);
      } else {
        const errorMsg = result.error || "Failed to fetch document";
        toast.error(errorMsg);
        router.push(PRIVATE_ROUTES.DOCUMENTS);
      }
    } catch (error) {
      console.error("Error fetching document:", error);
      const errorMsg = "Failed to fetch document";
      toast.error(errorMsg);
      router.push(PRIVATE_ROUTES.DOCUMENTS);
    } finally {
      setIsLoading(false);
    }
  }, [documentId, userId, router]);

  useEffect(() => {
    fetchDocument();
  }, [fetchDocument]);

  return {
    document,
    isLoading,
    refetch: fetchDocument,
  };
}

/**
 * Hook to manage fetching all documents for the current user
 */
export function useDocuments(): UseDocumentsReturn {
  const [documents, setDocuments] = useState<PdfSummary[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const userId = cookies.get("id");

  const fetchDocuments = useCallback(async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const result = await getUserPdfSummaries(userId);

      if (result.success && result.pdfs) {
        setDocuments(result.pdfs);
      } else {
        const errorMsg = result.error || "Failed to fetch documents";
        toast.error(errorMsg);
      }
    } catch (error) {
      console.error("Error fetching documents:", error);
      const errorMsg = "Failed to fetch documents";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  return {
    documents,
    isLoading,
    refetch: fetchDocuments,
  };
}

/**
 * Hook to manage AI-powered PDF summary generation
 */
export function useExtractPdfText(): UseExtractPdfTextReturn {
  const [isExtracting, setIsExtracting] = useState(false);

  const handleGenerateSummary = useCallback(
    async (pdfUrl: string, documentId?: string): Promise<string | null> => {
      if (!pdfUrl) {
        toast.error("No PDF file URL available");
        return null;
      }

      if (!documentId) {
        toast.error("Document ID is required for AI summary generation");
        return null;
      }

      const userId = cookies.get("id");
      if (!userId) {
        toast.error("User not authenticated");
        return null;
      }

      try {
        setIsExtracting(true);
        toast.info("🧠 Generating AI-powered summary...");

        const response = await fetch("/api/generate-summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pdfUrl: pdfUrl,
            documentId: documentId,
            userId: userId,
            isReel: false,
          }),
        });

        const result = await response.json();

        if (result.success) {
          console.log("AI Summary generated:", result.summary);
          toast.success("🎉 AI summary generated successfully!");
          return result.summary;
        } else {
          console.error("API error:", result.error);
          toast.error(result.error || "Failed to generate AI summary");
          return null;
        }
      } catch (error) {
        console.error("Error calling AI summary generation API:", error);
        toast.error("Failed to generate AI summary");
        return null;
      } finally {
        setIsExtracting(false);
      }
    },
    [],
  );

  return {
    handleGenerateSummary,
    isExtracting,
  };
}

/**
 * Hook to manage document search and filtering
 */
export function useDocumentSearch(
  documents: PdfSummary[],
  searchQuery: string,
) {
  const filteredDocuments = documents.filter(
    (doc) =>
      doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return { filteredDocuments };
}

/**
 * Hook to manage summary reel display and functionality
 */
export function useSummaryReel() {
  const [summaryReel, setSummaryReel] = useState<SummaryReel | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const generateSummaryReel = useCallback(
    async (pdfUrl: string, documentId: string): Promise<void> => {
      const userId = cookies.get("id");
      if (!userId) {
        toast.error("User not authenticated");
        return;
      }

      try {
        setIsGenerating(true);
        toast.info("🎨 Creating visual summary reel...");

        const response = await fetch("/api/generate-summary", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pdfUrl: pdfUrl,
            documentId: documentId,
            userId: userId,
            isReel: true,
          }),
        });

        const result = await response.json();

        if (result.success && result.summaryReel) {
          setSummaryReel(result.summaryReel);
          setIsVisible(true);
          toast.success("🎉 Visual summary reel created!");
        } else {
          toast.error(result.error || "Failed to create summary reel");
        }
      } catch (error) {
        console.error("Error generating summary reel:", error);
        toast.error("Failed to create summary reel");
      } finally {
        setIsGenerating(false);
      }
    },
    [],
  );

  const showReel = useCallback((reel: SummaryReel) => {
    setSummaryReel(reel);
    setIsVisible(true);
  }, []);

  const hideReel = useCallback(() => {
    setIsVisible(false);
    // Keep the reel data but hide it
  }, []);

  const clearReel = useCallback(() => {
    setSummaryReel(null);
    setIsVisible(false);
  }, []);

  return {
    summaryReel,
    isVisible,
    isGenerating,
    generateSummaryReel,
    showReel,
    hideReel,
    clearReel,
  };
}
