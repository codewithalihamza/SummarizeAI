import { PdfSummary } from "@/lib/services/pdf";

export interface UseDocumentDetailReturn {
  document: PdfSummary | null;
  isLoading: boolean;
  refetch: () => Promise<void>;
}
export interface UseDocumentsReturn {
  documents: PdfSummary[];
  isLoading: boolean;
  refetch: () => Promise<void>;
}
export interface UseExtractPdfTextReturn {
  handleGenerateSummary: (
    pdfUrl: string,
    documentId?: string,
  ) => Promise<string | null>;
  isExtracting: boolean;
}

export interface SummaryReel {
  title: string;
  subtitle: string;
  keyPoints: string[];
  callToAction: string;
  hashtags: string[];
  emoji: string;
}

export type UploadPdfData = {
  userId: string;
  originalFileUrl: string;
  fileName: string;
  title: string;
};

export type SignUpData = {
  name: string;
  email: string;
  password: string;
};

export type SignInData = {
  email: string;
  password: string;
};
