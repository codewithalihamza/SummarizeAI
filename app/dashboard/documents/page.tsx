"use client";

import { DocumentSkeleton } from "@/components/loading/document-skeleton";
import { Button } from "@/components/ui/button";
import { PRIVATE_ROUTES } from "@/constants/routes";
import { getStatusColor, getStatusText } from "@/constants/text.constant";
import { useDocuments, useDocumentSearch } from "@/hooks/document.hook";
import { formatDate } from "@/lib/utils";
import {
  ExternalLink,
  Eye,
  FileText,
  Grid,
  List,
  MoreVertical,
  Search,
  Upload
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function Documents() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { documents, isLoading } = useDocuments();
  const { filteredDocuments } = useDocumentSearch(documents, searchQuery);

  const handleDocumentClick = (documentId: string) => {
    router.push(PRIVATE_ROUTES.DOCUMENT_DETAIL(documentId));
  };

  const toggleDropdown = (docId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown(openDropdown === docId ? null : docId);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };

    if (openDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const handleViewPdf = (pdfUrl: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown(null);
    window.open(pdfUrl, "_blank");
  };

  const handleViewSummary = (docId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setOpenDropdown(null);
    handleDocumentClick(docId);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-gray-400 mt-1">
            Manage and organize your documents
          </p>
        </div>
        <Button
          onClick={() => router.push(PRIVATE_ROUTES.DASHBOARD)}
          className="bg-[#4F6BFF] hover:bg-[#4F6BFF]/90"
        >
          <Upload className="h-5 w-5 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-black/40 backdrop-blur-xl rounded-lg border border-[#4F6BFF]/20 focus:outline-none focus:border-[#4F6BFF] transition-colors"
          />
        </div>
        <div className="flex gap-2">
          <div className="flex rounded-lg border border-[#4F6BFF]/20 overflow-hidden">
            <button
              className={`p-2 ${viewMode === "grid"
                ? "bg-[#4F6BFF] text-white"
                : "hover:bg-[#4F6BFF]/10"
                }`}
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-5 w-5" />
            </button>
            <button
              className={`p-2 ${viewMode === "list"
                ? "bg-[#4F6BFF] text-white"
                : "hover:bg-[#4F6BFF]/10"
                }`}
              onClick={() => setViewMode("list")}
            >
              <List className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <DocumentSkeleton viewMode={viewMode} />
      ) : (
        <>
          {/* Empty State */}
          {filteredDocuments.length === 0 && (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-200">
                No documents found
              </h3>
              <p className="text-gray-400 mt-1">
                {searchQuery
                  ? "Try adjusting your search terms"
                  : "Upload your first document to get started"}
              </p>
            </div>
          )}

          {/* Documents Grid/List */}
          {filteredDocuments.length > 0 &&
            (viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredDocuments.map((doc) => (
                  <div
                    key={doc.id}
                    className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-6 hover:border-[#4F6BFF]/40 transition-colors relative group cursor-pointer"
                    onClick={() => handleDocumentClick(doc.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="bg-[#4F6BFF]/10 p-3 rounded-lg">
                        <FileText className="h-8 w-8 text-[#4F6BFF]" />
                      </div>
                      <div className="relative" ref={openDropdown === doc.id ? dropdownRef : null}>
                        <button
                          className="p-2 hover:bg-[#4F6BFF]/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          onClick={(e) => toggleDropdown(doc.id, e)}
                        >
                          <MoreVertical className="h-4 w-4 text-gray-400" />
                        </button>

                        {/* Dropdown Menu */}
                        {openDropdown === doc.id && (
                          <div className="absolute right-0 top-10 bg-black/95 backdrop-blur-xl border border-[#4F6BFF]/30 rounded-xl shadow-2xl z-50 min-w-[160px] py-2">
                            <button
                              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#4F6BFF]/20 transition-colors text-sm font-medium"
                              onClick={(e) => handleViewPdf(doc.originalFileUrl, e)}
                            >
                              <ExternalLink className="h-4 w-4 text-[#4F6BFF]" />
                              <span>View PDF</span>
                            </button>
                            <div className="w-full h-px bg-[#4F6BFF]/10 my-1" />
                            <button
                              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[#4F6BFF]/20 transition-colors text-sm font-medium"
                              onClick={(e) => handleViewSummary(doc.id, e)}
                            >
                              <Eye className="h-4 w-4 text-[#4F6BFF]" />
                              <span>View Summary</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="mt-4">
                      <h3 className="font-medium truncate text-white" title={doc.fileName}>
                        {doc.fileName}
                      </h3>
                      <p className="text-sm text-gray-400 mt-1 truncate" title={doc.title}>
                        {doc.title}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}
                      >
                        {getStatusText(doc.status)}
                      </span>
                      <span className="text-sm text-gray-400">
                        {formatDate(doc.createdAt)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20">
                <table className="w-full">
                  <thead>
                    <tr className="text-left border-b border-[#4F6BFF]/20">
                      <th className="p-4 font-medium text-gray-400">Name</th>
                      <th className="p-4 font-medium text-gray-400">Date</th>
                      <th className="p-4 font-medium text-gray-400">Status</th>
                      <th className="p-4 font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map((doc) => (
                      <tr
                        key={doc.id}
                        className="border-b border-[#4F6BFF]/10 hover:bg-[#4F6BFF]/5 cursor-pointer"
                        onClick={() => handleDocumentClick(doc.id)}
                      >
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="bg-[#4F6BFF]/10 p-2 rounded-lg">
                              <FileText className="h-5 w-5 text-[#4F6BFF]" />
                            </div>
                            <div>
                              <p className="font-medium">{doc.fileName}</p>
                              <p className="text-sm text-gray-400">{doc.title}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-gray-400">
                          {formatDate(doc.createdAt)}
                        </td>
                        <td className="p-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}
                          >
                            {getStatusText(doc.status)}
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-[#4F6BFF] text-white hover:bg-[#4F6BFF]/90 border-[#4F6BFF]"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.open(doc.originalFileUrl, "_blank");
                              }}
                            >
                              <ExternalLink className="h-4 w-4 mr-1" />
                              View PDF
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-green-600 text-white hover:bg-green-700 border-green-600"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDocumentClick(doc.id);
                              }}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View Summary
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
        </>
      )}
    </div>
  );
}
