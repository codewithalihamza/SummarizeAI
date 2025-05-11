"use client";

import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Clock,
  FileText,
  TrendingUp,
  Upload,
  Zap,
} from "lucide-react";

const stats = [
  {
    name: "Total Documents",
    value: "128",
    icon: FileText,
    change: "+12.3%",
    changeType: "increase",
  },
  {
    name: "Processing Time",
    value: "1.2s",
    icon: Clock,
    change: "-0.3s",
    changeType: "decrease",
  },
  {
    name: "AI Accuracy",
    value: "98.5%",
    icon: Zap,
    change: "+1.2%",
    changeType: "increase",
  },
  {
    name: "Words Processed",
    value: "1.2M",
    icon: BarChart3,
    change: "+15.3%",
    changeType: "increase",
  },
];

const recentDocuments = [
  {
    id: 1,
    name: "Q4 Financial Report.pdf",
    date: "2024-03-20",
    status: "Completed",
    pages: 15,
  },
  {
    id: 2,
    name: "Product Roadmap 2024.pdf",
    date: "2024-03-19",
    status: "Completed",
    pages: 8,
  },
  {
    id: 3,
    name: "Market Analysis.pdf",
    date: "2024-03-18",
    status: "Processing",
    pages: 25,
  },
  {
    id: 4,
    name: "Team Guidelines.pdf",
    date: "2024-03-17",
    status: "Completed",
    pages: 12,
  },
];

export default function Dashboard() {
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
        <Button className="bg-[#4F6BFF] hover:bg-[#4F6BFF]/90">
          <Upload className="h-5 w-5 mr-2" />
          Upload Document
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-6"
          >
            <div className="flex items-center justify-between">
              <stat.icon className="h-8 w-8 text-[#4F6BFF]" />
              <span
                className={`flex items-center text-sm ${
                  stat.changeType === "increase"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                <TrendingUp className="h-4 w-4 mr-1" />
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <h3 className="text-gray-400 text-sm">{stat.name}</h3>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Documents */}
      <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Recent Documents</h2>
          <Button
            variant="outline"
            className="border-[#4F6BFF]/20 hover:bg-[#4F6BFF]/10"
          >
            View All
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-[#4F6BFF]/20">
                <th className="pb-4 font-medium text-gray-400">Name</th>
                <th className="pb-4 font-medium text-gray-400">Date</th>
                <th className="pb-4 font-medium text-gray-400">Pages</th>
                <th className="pb-4 font-medium text-gray-400">Status</th>
                <th className="pb-4 font-medium text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentDocuments.map((doc) => (
                <tr key={doc.id} className="border-b border-[#4F6BFF]/10">
                  <td className="py-4">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-[#4F6BFF] mr-2" />
                      {doc.name}
                    </div>
                  </td>
                  <td className="py-4 text-gray-400">{doc.date}</td>
                  <td className="py-4 text-gray-400">{doc.pages} pages</td>
                  <td className="py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        doc.status === "Completed"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-4">
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
      </div>
    </div>
  );
}
