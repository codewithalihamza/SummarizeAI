"use client";

import { getPdfSummaryById } from "@/app/actions/pdf";
import { DocumentDetailSkeleton } from "@/components/loading/document-detail-skeleton";
import { Button } from "@/components/ui/button";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { getStatusText } from "@/lib/schema/pdf";
import type { PdfSummary } from "@/lib/services/pdf";
import { cookies } from "@/lib/session/userSession";
import { ArrowLeft, FileText, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { toast } from "sonner";

const getStatusColor = (status: "completed" | "failed" | "pending") => {
    switch (status) {
        case "completed":
            return "bg-green-500/10 text-green-500";
        case "pending":
            return "bg-yellow-500/10 text-yellow-500";
        case "failed":
            return "bg-red-500/10 text-red-500";
        default:
            return "bg-gray-500/10 text-gray-500";
    }
};

export default function DocumentDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const [document, setDocument] = useState<PdfSummary | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const userId = cookies.get("id");
    const { id: documentId } = use(params);

    useEffect(() => {
        const fetchDocument = async () => {
            if (!userId) {
                toast.error("User not authenticated");
                router.push(PRIVATE_ROUTES.DOCUMENTS);
                return;
            }

            if (!documentId) {
                toast.error("Invalid document ID");
                router.push(PRIVATE_ROUTES.DOCUMENTS);
                return;
            }

            try {
                const result = await getPdfSummaryById(documentId, userId);
                if (result.success && result.pdf) {
                    setDocument(result.pdf);
                } else {
                    toast.error(result.error || "Failed to fetch document");
                    router.push(PRIVATE_ROUTES.DOCUMENTS);
                }
            } catch (error) {
                console.error("Error fetching document:", error);
                toast.error("Failed to fetch document");
                router.push(PRIVATE_ROUTES.DOCUMENTS);
            } finally {
                setIsLoading(false);
            }
        };

        fetchDocument();
    }, [documentId, userId, router]);

    const formatDate = (date: Date | null) => {
        if (!date) return "Unknown date";
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(new Date(date));
    };

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