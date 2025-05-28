"use client";
import { createPdfSummary } from "@/app/actions/pdf";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUploadPdfHook } from "@/hooks/upload-pdf.hook";
import { cookies } from "@/lib/session/userSession";
import { Upload, X } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

const Dashboard = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSaving, setIsSaving] = useState(false);
    const {
        selectedFile,
        isUploading,
        clearSelectedFile,
        uploadFile,
        handleFileChange,
    } = useUploadPdfHook();
    const userId = cookies.get('id');

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

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
                toast.error(result.error || 'Failed to save PDF details');
                return;
            }

            toast.success('PDF uploaded and saved successfully!');
        } catch (error) {
            console.error('Error in handleUpload:', error);
            toast.error('Failed to process PDF');
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

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <p className="text-gray-400 mt-1">
                        Welcome back! Here's your overview.
                    </p>
                </div>
            </div>

            {/* Upload Section */}
            <div className="p-8 text-center">
                <h2 className="text-2xl font-bold mb-2">Start uploading PDFs</h2>
                <p className="text-gray-400 mb-6">Upload your PDF – let AI do the magic!</p>

                <div className="max-w-md mx-auto">
                    <Input
                        type="file"
                        accept=".pdf"
                        onChange={handleFileChange}
                        className="hidden"
                        id="pdf-file-upload"
                        name="pdf-file-upload"
                        ref={fileInputRef}
                    />

                    {!selectedFile ? (
                        <Button
                            className="w-full bg-[#4F6BFF] hover:bg-[#4F6BFF]/90"
                            onClick={triggerFileInput}
                        >
                            <Upload className="h-5 w-5 mr-2" />
                            Select your file
                        </Button>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="truncate">
                                    <p className="font-medium">{selectedFile.name}</p>
                                    <p className="text-sm text-gray-500">
                                        {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={clearSelectedFile}
                                    disabled={isProcessing}
                                >
                                    <X className="h-5 w-5" />
                                </Button>
                            </div>

                            <Button
                                className="w-full bg-[#4F6BFF] hover:bg-[#4F6BFF]/90"
                                onClick={handleUpload}
                                disabled={isProcessing}
                            >
                                {buttonText}
                            </Button>
                        </div>
                    )}

                    <p className="text-gray-400 text-sm mt-4">
                        Max file size: 16 MB. Only PDF files are allowed.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
