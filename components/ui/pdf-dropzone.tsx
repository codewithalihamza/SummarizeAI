"use client";
import { Button } from "@/components/ui/button";
import { FileText, Upload, X } from "lucide-react";
import { useRef, useState } from "react";

interface PdfDropzoneProps {
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  onFileRemove: () => void;
  disabled?: boolean;
  disabledMessage?: string;
}

const PdfDropzone = ({
  selectedFile,
  onFileSelect,
  onFileRemove,
  disabled = false,
  disabledMessage,
}: PdfDropzoneProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "application/pdf") {
      onFileSelect(file);
    } else if (file) {
      alert("Please select a PDF file only.");
    }
  };

  const triggerFileInput = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (disabled) return;

    const files = Array.from(e.dataTransfer.files);
    const pdfFile = files.find((file) => file.type === "application/pdf");

    if (pdfFile) {
      onFileSelect(pdfFile);
    } else if (files.length > 0) {
      alert("Please drop a PDF file only.");
    }
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(2);
  };

  return (
    <div className="max-w-md mx-auto">
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="hidden"
        id="pdf-file-upload"
        name="pdf-file-upload"
        ref={fileInputRef}
        disabled={disabled}
      />

      {!selectedFile ? (
        <div className="space-y-4">
          <div
            className={`border-2 border-dashed rounded-xl p-8 transition-all cursor-pointer ${
              isDragOver
                ? "border-[#4F6BFF] bg-[#4F6BFF]/10 scale-105"
                : "border-[#4F6BFF]/30 hover:border-[#4F6BFF]/50"
            } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={triggerFileInput}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Upload
              className={`w-12 h-12 mx-auto mb-4 transition-colors ${
                isDragOver ? "text-[#4F6BFF] scale-110" : "text-[#4F6BFF]"
              }`}
            />
            <p className="text-gray-300 mb-2 font-medium">
              {disabled && disabledMessage
                ? disabledMessage
                : isDragOver
                  ? "Drop your PDF here!"
                  : "Click to browse or drag & drop"}
            </p>
            <p className="text-gray-500 text-sm">
              {disabled && disabledMessage ? "" : "PDF files up to 16MB"}
            </p>
            {isDragOver && (
              <div className="mt-3">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#4F6BFF]/20 text-[#4F6BFF] text-xs font-medium">
                  Ready to upload!
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-black/20 border border-[#4F6BFF]/20 rounded-xl">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#4F6BFF]/20 rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#4F6BFF]" />
              </div>
              <div className="truncate">
                <p className="font-medium text-white text-sm">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-400">
                  {formatFileSize(selectedFile.size)} MB • PDF
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onFileRemove}
              disabled={disabled}
              className="hover:bg-red-500/20 hover:text-red-400 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfDropzone;
