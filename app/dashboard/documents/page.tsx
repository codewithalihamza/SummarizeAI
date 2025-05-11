"use client";

import { Button } from "@/components/ui/button";
import {
    FileText,
    Filter,
    Grid,
    List,
    MoreVertical,
    Search,
    Upload,
} from "lucide-react";
import { useState } from "react";

const documents = [
    {
        id: 1,
        name: "Q4 Financial Report.pdf",
        date: "2024-03-20",
        status: "Completed",
        pages: 15,
        size: "2.4 MB",
    },
    {
        id: 2,
        name: "Product Roadmap 2024.pdf",
        date: "2024-03-19",
        status: "Completed",
        pages: 8,
        size: "1.8 MB",
    },
    {
        id: 3,
        name: "Market Analysis.pdf",
        date: "2024-03-18",
        status: "Processing",
        pages: 25,
        size: "4.2 MB",
    },
    {
        id: 4,
        name: "Team Guidelines.pdf",
        date: "2024-03-17",
        status: "Completed",
        pages: 12,
        size: "1.5 MB",
    },
    {
        id: 5,
        name: "Project Proposal.pdf",
        date: "2024-03-16",
        status: "Completed",
        pages: 18,
        size: "3.1 MB",
    },
    {
        id: 6,
        name: "Research Paper.pdf",
        date: "2024-03-15",
        status: "Failed",
        pages: 45,
        size: "8.2 MB",
    },
];

export default function Documents() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredDocuments = documents.filter((doc) =>
        doc.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                <Button className="bg-[#4F6BFF] hover:bg-[#4F6BFF]/90">
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
                    <Button
                        variant="outline"
                        className="border-[#4F6BFF]/20 hover:bg-[#4F6BFF]/10"
                    >
                        <Filter className="h-5 w-5 mr-2" />
                        Filter
                    </Button>
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

            {/* Documents Grid/List */}
            {viewMode === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredDocuments.map((doc) => (
                        <div
                            key={doc.id}
                            className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-6 hover:border-[#4F6BFF]/40 transition-colors"
                        >
                            <div className="flex items-start justify-between">
                                <div className="bg-[#4F6BFF]/10 p-3 rounded-lg">
                                    <FileText className="h-8 w-8 text-[#4F6BFF]" />
                                </div>
                                <button className="p-1 hover:bg-[#4F6BFF]/10 rounded-lg transition-colors">
                                    <MoreVertical className="h-5 w-5" />
                                </button>
                            </div>
                            <div className="mt-4">
                                <h3 className="font-medium truncate" title={doc.name}>
                                    {doc.name}
                                </h3>
                                <p className="text-sm text-gray-400 mt-1">
                                    {doc.pages} pages • {doc.size}
                                </p>
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                                <span
                                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${doc.status === "Completed"
                                        ? "bg-green-500/10 text-green-500"
                                        : doc.status === "Processing"
                                            ? "bg-yellow-500/10 text-yellow-500"
                                            : "bg-red-500/10 text-red-500"
                                        }`}
                                >
                                    {doc.status}
                                </span>
                                <span className="text-sm text-gray-400">{doc.date}</span>
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
                                <th className="p-4 font-medium text-gray-400">Size</th>
                                <th className="p-4 font-medium text-gray-400">Pages</th>
                                <th className="p-4 font-medium text-gray-400">Status</th>
                                <th className="p-4 font-medium text-gray-400">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredDocuments.map((doc) => (
                                <tr key={doc.id} className="border-b border-[#4F6BFF]/10">
                                    <td className="p-4">
                                        <div className="flex items-center">
                                            <FileText className="h-5 w-5 text-[#4F6BFF] mr-2" />
                                            {doc.name}
                                        </div>
                                    </td>
                                    <td className="p-4 text-gray-400">{doc.date}</td>
                                    <td className="p-4 text-gray-400">{doc.size}</td>
                                    <td className="p-4 text-gray-400">{doc.pages} pages</td>
                                    <td className="p-4">
                                        <span
                                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${doc.status === "Completed"
                                                ? "bg-green-500/10 text-green-500"
                                                : doc.status === "Processing"
                                                    ? "bg-yellow-500/10 text-yellow-500"
                                                    : "bg-red-500/10 text-red-500"
                                                }`}
                                        >
                                            {doc.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="border-[#4F6BFF]/20 hover:bg-[#4F6BFF]/10"
                                        >
                                            View Summary
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
} 