"use client";

import { DocumentDetailSkeleton } from "@/components/loading/document-detail-skeleton";
import { Button } from "@/components/ui/button";
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";
import { SummaryReelComponent } from "@/components/ui/summary-reel";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { getStatusColor, getStatusText } from "@/constants/text.constant";
import {
  useDocumentDetail,
  useExtractPdfText,
  useSummaryReel,
} from "@/hooks/document.hook";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, FileText, Play, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function DocumentDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id: documentId } = use(params);
  const { document, isLoading, refetch } = useDocumentDetail(documentId);
  const { handleGenerateSummary, isExtracting } = useExtractPdfText();
  const {
    summaryReel,
    isVisible,
    isGenerating,
    generateSummaryReel,
    hideReel,
  } = useSummaryReel();
  if (isLoading) {
    return <DocumentDetailSkeleton />;
  }

  if (!document) {
    return (
      <div className="text-center py-12">
        <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-200">
          Document not found
        </h3>
        <p className="text-gray-400 mt-1">
          The document you are looking for does not exist or you do not have
          permission to view it.
        </p>
        <Button
          onClick={() => router.push(PRIVATE_ROUTES.DOCUMENTS)}
          className="mt-4 bg-[#4F6BFF] hover:bg-[#4F6BFF]/90"
        >
          Back to Documents
        </Button>
      </div>
    );
  }

  const handleGenerateAISummary = async () => {
    const result = await handleGenerateSummary(
      document.originalFileUrl,
      documentId,
    );
    if (result) {
      await refetch();
    }
  };

  const handleShowSummaryReel = async () => {
    await generateSummaryReel(document.originalFileUrl, documentId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push(PRIVATE_ROUTES.DOCUMENTS)}
          className="h-8 w-8 sm:h-10 sm:w-10 self-start"
        >
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold break-words">
            {document.fileName}
          </h1>
          <p className="text-gray-400 mt-1 text-sm sm:text-base">
            Uploaded on {formatDate(document.createdAt)}
          </p>
        </div>
      </div>

      {/* Document Details */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-4 sm:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Document Information</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-400">File Name</p>
                <p className="font-medium">{document.fileName}</p>
              </div>
              <div>
                <p className="text-gray-400">Title</p>
                <p className="font-medium">{document.title}</p>
              </div>
              <div>
                <p className="text-gray-400">Status</p>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                    document.status,
                  )}`}
                >
                  {getStatusText(document.status)}
                </span>
              </div>
              <div>
                <p className="text-gray-400">Uploaded</p>
                <p className="font-medium">{formatDate(document.createdAt)}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Actions</h2>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <Button
                className="w-full sm:w-auto bg-gradient-to-r text-white from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 flex-shrink-0"
                onClick={() => window.open(document.originalFileUrl, "_blank")}
              >
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                <span className="text-sm sm:text-base">View PDF</span>
              </Button>

              <Button
                className="w-full sm:w-auto bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 flex-shrink-0"
                onClick={handleGenerateAISummary}
                disabled={isExtracting || !!document?.summaryText}
              >
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                <span className="text-sm sm:text-base">
                  {isExtracting ? "Generating..." : "Generate Summary"}
                </span>
              </Button>

              {document.status === "completed" && document.summaryText && (
                <Button
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 flex-shrink-0"
                  onClick={handleShowSummaryReel}
                  disabled={isGenerating}
                >
                  <Play className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                  <span className="text-sm sm:text-base">
                    {isGenerating ? "Creating..." : "Show Reel"}
                  </span>
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Summary Section */}
        {document.status === "completed" && document.summaryText && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">AI-Generated Summary</h2>
            <div className="bg-black/20 p-6 rounded-xl border border-[#4F6BFF]/10">
              <MarkdownRenderer content={document.summaryText} />
            </div>
          </div>
        )}

        {/* Pending or Failed Status Message */}
        {document.status !== "completed" && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Document Summary</h2>
            <div className="bg-black/20 p-6 rounded-xl border border-[#4F6BFF]/10 text-center">
              {document.status === "pending" ? (
                <div>
                  <p>
                    There is no summary for this document. Please generate one
                    by clicking the generate summary button.
                  </p>
                </div>
              ) : (
                <p>
                  There was an error processing your document. Please try
                  generating the AI summary again.
                </p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Summary Reel Modal */}
      {isVisible && summaryReel && (
        <SummaryReelComponent summaryReel={summaryReel} onClose={hideReel} />
      )}
    </div>
  );
}
