"use client";

import { DocumentDetailSkeleton } from "@/components/loading/document-detail-skeleton";
import { Button } from "@/components/ui/button";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { getStatusColor, getStatusText } from "@/constants/text.constant";
import { useDocumentDetail } from "@/hooks/document.hook";
import { formatDate } from "@/lib/utils";
import { ArrowLeft, FileText, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function DocumentDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const router = useRouter();
    const { id: documentId } = use(params);
    const { document, isLoading } = useDocumentDetail(documentId);

    if (isLoading) {
        return <DocumentDetailSkeleton />;
    }

    if (!document) {
        return (
            <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-200">Document not found</h3>
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

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => router.push(PRIVATE_ROUTES.DOCUMENTS)}
                    className="h-10 w-10"
                >
                    <ArrowLeft className="h-5 w-5 text-white" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold">{document.fileName}</h1>
                    <p className="text-gray-400 mt-1">
                        Uploaded on {formatDate(document.createdAt)}
                    </p>
                </div>
            </div>

            {/* Document Details */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                        document.status
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
                        <div className="flex gap-5 items-center">
                            <Button
                                className="bg-[#4F6BFF] hover:bg-[#4F6BFF]/90"
                                onClick={() => window.open(document.originalFileUrl, "_blank")}
                            >
                                <FileText className="h-5 w-5 mr-2" />
                                View Original PDF
                            </Button>
                            <Button
                                className="bg-[#4F6BFF] hover:bg-[#4F6BFF]/90"
                                onClick={() => {
                                    console.log("Generating summary");
                                }}
                            >
                                <Sparkles className="h-5 w-5 mr-2" />
                                Generate Summary
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Summary Section */}
                {document.status === "completed" && document.summaryText && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Document Summary</h2>
                        <div className="bg-black/20 p-6 rounded-xl border border-[#4F6BFF]/10">
                            <p className="whitespace-pre-line">{document.summaryText}</p>
                        </div>
                    </div>
                )}

                {/* Pending or Failed Status Message */}
                {document.status !== "completed" && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Document Summary</h2>
                        <div className="bg-black/20 p-6 rounded-xl border border-[#4F6BFF]/10 text-center">
                            {document.status === "pending" ? (
                                <p>
                                    Your document is being processed. Please check back later for
                                    the summary.
                                </p>
                            ) : (
                                <p>
                                    There was an error processing your document. Please try
                                    uploading it again.
                                </p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
} 