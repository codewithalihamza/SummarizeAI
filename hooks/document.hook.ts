import { getPdfSummaryById, getUserPdfSummaries } from "@/app/actions/pdf";
import { PRIVATE_ROUTES } from "@/constants/routes";
import type { PdfSummary } from "@/lib/services/pdf";
import { cookies } from "@/lib/session/userSession";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface UseDocumentDetailReturn {
    document: PdfSummary | null;
    isLoading: boolean;
    refetch: () => Promise<void>;
}

interface UseDocumentsReturn {
    documents: PdfSummary[];
    isLoading: boolean;
    refetch: () => Promise<void>;
}

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
            const errorMsg = "User not authenticated";
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
 * Hook to manage document search and filtering
 */
export function useDocumentSearch(documents: PdfSummary[], searchQuery: string) {
    const filteredDocuments = documents.filter((doc) =>
        doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return { filteredDocuments };
}
