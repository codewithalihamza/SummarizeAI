export const getStatusColor = (status: "completed" | "failed" | "pending") => {
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

export const getStatusText = (status: "completed" | "failed" | "pending") => {
  switch (status) {
    case "completed":
      return "Completed";
    case "pending":
      return "Pending";
    case "failed":
      return "Failed";
    default:
      return "Unknown";
  }
};
