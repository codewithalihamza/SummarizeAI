"use client";
import { createPdfSummary } from "@/app/actions/pdf";
import { Button } from "@/components/ui/button";
import PdfDropzone from "@/components/ui/pdf-dropzone";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { useDocuments } from "@/hooks/document.hook";
import { useUploadPdfHook } from "@/hooks/upload-pdf.hook";
import { cookies } from "@/lib/session/userSession";
import { formatDate } from "@/lib/utils";
import {
  ArrowRight,
  BarChart3,
  Brain,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Rocket,
  Sparkles,
  Star,
  TrendingUp,
  Upload,
  Zap,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
  const [isSaving, setIsSaving] = useState(false);
  const {
    selectedFile,
    isUploading,
    clearSelectedFile,
    uploadFile,
    handleFileSelect,
  } = useUploadPdfHook();

  const handleFileSelectForDropzone = (file: File | null) => {
    if (file) {
      // Check upload limit before allowing file selection
      if (totalDocuments >= 5) {
        toast.error(
          "Upload limit reached! You can only upload 5 documents maximum.",
        );
        return;
      }
      handleFileSelect(file);
    }
  };

  const triggerFileUpload = () => {
    // Check upload limit before triggering file input
    if (totalDocuments >= 5) {
      toast.error(
        "Upload limit reached! You can only upload 5 documents maximum.",
      );
      return;
    }

    // Trigger the file upload by clicking a hidden file input
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = ".pdf";
    fileInput.style.display = "none";
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        handleFileSelect(file);
      }
    };
    document.body.appendChild(fileInput);
    fileInput.click();
    document.body.removeChild(fileInput);
  };

  const { documents, isLoading } = useDocuments();
  const userId = cookies.get("id");
  const router = useRouter();

  const handleUpload = async () => {
    try {
      const uploadedFile = await uploadFile();
      if (!uploadedFile) {
        return;
      }

      setIsSaving(true);
      const result = await createPdfSummary({
        userId: userId,
        originalFileUrl: uploadedFile.url,
        fileName: uploadedFile.name,
        title: uploadedFile.name,
      });

      if (!result.success) {
        toast.error(result.error || "Failed to save PDF details");
        return;
      }

      toast.success("PDF uploaded and saved successfully!");
      router.push(PRIVATE_ROUTES.DOCUMENT_DETAIL(result.pdf?.id || ""));
    } catch (error) {
      console.error("Error in handleUpload:", error);
      toast.error("Failed to process PDF");
    } finally {
      setIsSaving(false);
    }
  };

  const isProcessing = isUploading || isSaving;
  const buttonText = isUploading
    ? "Uploading..."
    : isSaving
      ? "Saving..."
      : "Confirm Upload";

  // Calculate stats
  const totalDocuments = documents.length;
  const isUploadLimitReached = totalDocuments >= 5;
  const completedSummaries = documents.filter(
    (doc) => doc.status === "completed",
  ).length;
  const pendingSummaries = documents.filter(
    (doc) => doc.status === "pending",
  ).length;
  const recentDocuments = documents.slice(0, 3);

  return (
    <div className="space-y-8">
      {/* Header with Welcome Message */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#4F6BFF] via-purple-600 to-pink-600 p-8 text-white">
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-2">Welcome Back! 👋</h1>
              <p className="text-blue-100 text-lg">
                Ready to transform your documents with AI-powered summaries?
              </p>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                  <Brain className="w-10 h-10 text-white" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-yellow-800" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-green-500/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-400 text-sm font-medium">
                Total Documents
              </p>
              <p className="text-3xl font-bold text-white mt-1">
                {totalDocuments}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
            <span className="text-green-400">+12% from last month</span>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-400 text-sm font-medium">
                Completed Summaries
              </p>
              <p className="text-3xl font-bold text-white mt-1">
                {completedSummaries}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <Zap className="w-4 h-4 text-blue-400 mr-1" />
            <span className="text-blue-400">AI-powered processing</span>
          </div>
        </div>

        <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-yellow-500/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-400 text-sm font-medium">In Progress</p>
              <p className="text-3xl font-bold text-white mt-1">
                {pendingSummaries}
              </p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
          <div className="flex items-center mt-4 text-sm">
            <Sparkles className="w-4 h-4 text-yellow-400 mr-1" />
            <span className="text-yellow-400">Processing with Gemini AI</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload Section - Takes 2 columns */}
        <div className="lg:col-span-2">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-[#4F6BFF] to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Upload className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Upload Your PDF</h2>
              <p className="text-gray-400 mb-2">
                Drop your document here and let our AI create amazing summaries
                ✨
              </p>
              <div className="mb-6">
                <div
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    isUploadLimitReached
                      ? "bg-red-500/20 text-red-400 border border-red-500/30"
                      : "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  }`}
                >
                  {isUploadLimitReached ? (
                    <>🚫 Upload limit reached ({totalDocuments}/5)</>
                  ) : (
                    <>📄 {totalDocuments}/5 uploads used</>
                  )}
                </div>
              </div>

              <PdfDropzone
                selectedFile={selectedFile}
                onFileSelect={handleFileSelectForDropzone}
                onFileRemove={clearSelectedFile}
                disabled={isProcessing || isUploadLimitReached}
                disabledMessage={
                  isUploadLimitReached
                    ? "Upload limit reached (5/5)"
                    : undefined
                }
              />

              {selectedFile && (
                <div className="mt-6 max-w-md mx-auto">
                  <Button
                    className="w-full bg-gradient-to-r from-[#4F6BFF] to-purple-600 hover:from-[#4F6BFF]/90 hover:to-purple-600/90 text-white font-medium py-3"
                    onClick={handleUpload}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <div className="flex items-center">
                        <div className="animate-spin w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                        {buttonText}
                      </div>
                    ) : (
                      <>
                        <Rocket className="w-4 h-4 mr-2" />
                        {buttonText}
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recent Documents Sidebar */}
        <div className="space-y-6">
          {/* Recent Documents */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Documents</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push(PRIVATE_ROUTES.DOCUMENTS)}
                className="text-[#4F6BFF] hover:text-[#4F6BFF]/80"
              >
                View All
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>

            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : recentDocuments.length > 0 ? (
              <div className="space-y-3">
                {recentDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 bg-black/20 rounded-lg hover:bg-black/30 transition-colors cursor-pointer border border-gray-800/50"
                    onClick={() =>
                      router.push(PRIVATE_ROUTES.DOCUMENT_DETAIL(doc.id))
                    }
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white truncate">
                          {doc.fileName}
                        </p>
                        <p className="text-xs text-gray-400">
                          {formatDate(doc.createdAt)}
                        </p>
                      </div>
                      <div
                        className={`w-2 h-2 rounded-full ml-2 ${
                          doc.status === "completed"
                            ? "bg-green-400"
                            : doc.status === "pending"
                              ? "bg-yellow-400"
                              : "bg-red-400"
                        }`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <FileText className="w-8 h-8 text-gray-500 mx-auto mb-2" />
                <p className="text-gray-400 text-sm">No documents yet</p>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-6">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-[#4F6BFF]/10 hover:text-[#4F6BFF]"
                onClick={() => router.push(PRIVATE_ROUTES.DOCUMENTS)}
              >
                <Eye className="w-4 h-4 mr-3" />
                View All Documents
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-[#4F6BFF]/10 hover:text-[#4F6BFF]"
                onClick={triggerFileUpload}
                disabled={isUploadLimitReached}
              >
                <Upload className="w-4 h-4 mr-3" />
                {isUploadLimitReached
                  ? "Upload Limit Reached"
                  : "Upload New PDF"}
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start hover:bg-[#4F6BFF]/10 hover:text-[#4F6BFF]"
              >
                <BarChart3 className="w-4 h-4 mr-3" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-8">
        <h3 className="text-2xl font-bold text-center mb-8">
          Why Choose SummarizeAI?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold mb-2">AI-Powered</h4>
            <p className="text-gray-400 text-sm">
              Advanced Gemini Flash 2.0 technology for accurate, context-aware
              summaries
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold mb-2">Lightning Fast</h4>
            <p className="text-gray-400 text-sm">
              Get comprehensive summaries in seconds, not minutes
            </p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h4 className="font-semibold mb-2">Visual Summaries</h4>
            <p className="text-gray-400 text-sm">
              Beautiful Instagram-style reels with emojis and engaging formats
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
