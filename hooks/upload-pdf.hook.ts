import { useUploadThing } from "@/lib/uploadthing";
import { useState } from "react";
import { toast } from "sonner";

interface UploadedFile {
  url: string;
  name: string;
  key: string;
}

interface UseUploadPdfReturn {
  selectedFile: File | null;
  uploadedFile: UploadedFile | null;
  isUploading: boolean;
  clearSelectedFile: () => void;
  uploadFile: () => Promise<UploadedFile | null>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const useUploadPdfHook = (): UseUploadPdfReturn => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { startUpload } = useUploadThing("pdfUploader");

  const handleFileSelect = (file: File) => {
    if (!file.type.includes("pdf")) {
      toast.error("Please select a PDF file");
      return;
    }

    if (file.size > 16 * 1024 * 1024) {
      // 16MB limit
      toast.error("File size must be less than 16MB");
      return;
    }

    setSelectedFile(file);
  };

  const clearSelectedFile = () => {
    setSelectedFile(null);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    // Reset input value to allow selecting the same file again
    if (event.target) {
      event.target.value = "";
    }
  };
  const uploadFile = async (): Promise<UploadedFile | null> => {
    if (!selectedFile) {
      toast.error("No file selected");
      return null;
    }

    try {
      setIsUploading(true);
      const result = await startUpload([selectedFile]);
      const uploadedFile = result?.[0];

      if (!uploadedFile) {
        throw new Error("Upload failed");
      }

      const fileDetails: UploadedFile = {
        url: uploadedFile.url,
        name: selectedFile.name,
        key: uploadedFile.key,
      };

      setUploadedFile(fileDetails);
      toast.success("File uploaded successfully!");
      setSelectedFile(null);
      return fileDetails;
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload file");
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    selectedFile,
    uploadedFile,
    isUploading,
    clearSelectedFile,
    uploadFile,
    handleFileChange,
  };
};
