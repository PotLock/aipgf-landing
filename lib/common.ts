export const timeAgo = (blockTimestamp:number): string => {
    const now = Date.now(); // Current timestamp in milliseconds
    const blockTimestampMs = Math.floor(blockTimestamp / 1000000); // Convert nanoseconds to milliseconds
    const diffMs = now - blockTimestampMs;

    const date = new Date(blockTimestampMs)
    const dateNow = new Date()

    return diffMs < 60000
        ? `${(diffMs / 1000) | 0}s ago`
        : diffMs < 3600000
            ? `${(diffMs / 60000) | 0}m ago`
            : diffMs < 86400000
            ? `${(diffMs / 3600000) | 0}h ago`
            : date.getFullYear() === dateNow.getFullYear()
                ? date.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                })
                : date.toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                });
};

export const readableDate = (timestamp: number) => {
    var a = new Date(timestamp);
    var options = {
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "UTC",
    } as const;
    return a.toLocaleString("en-US", options) + " UTC";
}
