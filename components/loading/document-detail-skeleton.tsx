export const DocumentDetailSkeleton = () => {
    return (
        <div className="space-y-8">
            {/* Header Skeleton */}
            <div className="flex items-center gap-4">
                <div className="h-10 w-10 bg-[#4F6BFF]/10 rounded-lg animate-pulse" />
                <div>
                    <div className="h-8 w-64 bg-[#4F6BFF]/10 rounded animate-pulse" />
                    <div className="h-5 w-40 bg-[#4F6BFF]/10 rounded animate-pulse mt-1" />
                </div>
            </div>

            {/* Document Details Skeleton */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-[#4F6BFF]/20 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <div className="h-7 w-48 bg-[#4F6BFF]/10 rounded animate-pulse mb-4" />
                        <div className="space-y-4">
                            {/* File Name */}
                            <div>
                                <div className="h-5 w-24 bg-[#4F6BFF]/10 rounded animate-pulse" />
                                <div className="h-6 w-full bg-[#4F6BFF]/10 rounded animate-pulse mt-1" />
                            </div>
                            {/* Title */}
                            <div>
                                <div className="h-5 w-24 bg-[#4F6BFF]/10 rounded animate-pulse" />
                                <div className="h-6 w-full bg-[#4F6BFF]/10 rounded animate-pulse mt-1" />
                            </div>
                            {/* Status */}
                            <div>
                                <div className="h-5 w-24 bg-[#4F6BFF]/10 rounded animate-pulse" />
                                <div className="h-6 w-24 bg-[#4F6BFF]/10 rounded-full animate-pulse mt-1" />
                            </div>
                            {/* Uploaded */}
                            <div>
                                <div className="h-5 w-24 bg-[#4F6BFF]/10 rounded animate-pulse" />
                                <div className="h-6 w-48 bg-[#4F6BFF]/10 rounded animate-pulse mt-1" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className="h-7 w-24 bg-[#4F6BFF]/10 rounded animate-pulse mb-4" />
                        <div className="space-y-4">
                            <div className="h-10 w-full bg-[#4F6BFF]/10 rounded animate-pulse" />
                            <div className="h-10 w-full bg-[#4F6BFF]/10 rounded animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Summary Section Skeleton */}
                <div className="mt-8">
                    <div className="h-7 w-40 bg-[#4F6BFF]/10 rounded animate-pulse mb-4" />
                    <div className="bg-black/20 p-6 rounded-xl border border-[#4F6BFF]/10">
                        <div className="space-y-2">
                            <div className="h-5 w-full bg-[#4F6BFF]/10 rounded animate-pulse" />
                            <div className="h-5 w-full bg-[#4F6BFF]/10 rounded animate-pulse" />
                            <div className="h-5 w-3/4 bg-[#4F6BFF]/10 rounded animate-pulse" />
                            <div className="h-5 w-full bg-[#4F6BFF]/10 rounded animate-pulse" />
                            <div className="h-5 w-5/6 bg-[#4F6BFF]/10 rounded animate-pulse" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}; 