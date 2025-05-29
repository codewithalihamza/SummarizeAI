interface DocumentSkeletonProps {
  viewMode: "grid" | "list";
}

export const DocumentSkeleton = ({ viewMode }: DocumentSkeletonProps) => {
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
          <div
            key={index}
            className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-6"
          >
            <div className="flex items-start justify-between">
              <div className="bg-[#4F6BFF]/10 p-3 rounded-lg animate-pulse">
                <div className="w-8 h-8 bg-[#4F6BFF]/20 rounded" />
              </div>
              <div className="w-8 h-8 bg-[#4F6BFF]/10 rounded-lg animate-pulse" />
            </div>
            <div className="mt-4 space-y-2">
              <div className="h-5 bg-[#4F6BFF]/10 rounded animate-pulse" />
              <div className="h-4 bg-[#4F6BFF]/10 rounded animate-pulse w-2/3" />
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div className="w-20 h-5 bg-[#4F6BFF]/10 rounded-full animate-pulse" />
              <div className="w-24 h-5 bg-[#4F6BFF]/10 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
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
          {[...Array(5)].map((_, index) => (
            <tr key={index} className="border-b border-[#4F6BFF]/10">
              <td className="p-4">
                <div className="flex items-center">
                  <div className="w-5 h-5 bg-[#4F6BFF]/10 rounded mr-2 animate-pulse" />
                  <div className="w-48 h-5 bg-[#4F6BFF]/10 rounded animate-pulse" />
                </div>
              </td>
              <td className="p-4">
                <div className="w-32 h-5 bg-[#4F6BFF]/10 rounded animate-pulse" />
              </td>
              <td className="p-4">
                <div className="w-20 h-5 bg-[#4F6BFF]/10 rounded-full animate-pulse" />
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <div className="w-24 h-8 bg-[#4F6BFF]/10 rounded animate-pulse" />
                  <div className="w-24 h-8 bg-[#4F6BFF]/10 rounded animate-pulse" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
