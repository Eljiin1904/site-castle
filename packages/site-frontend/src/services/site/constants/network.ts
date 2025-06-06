export const network = {
  latencyThreshold: 250, // ms
  slowThreshold: 150, // ms
  status: "online" as NetworkStatus,
  getStatus: function (latency: number): "online" | "offline" | "slow" {
    if (latency > this.latencyThreshold) {
      return "offline";
    } else if (latency > this.slowThreshold) {
      return "slow";
    }
    return "online";
  },
  getColor: function (status: NetworkStatus): Color {
    switch (status) {
      case "online":
        return "bright-green";
      case "offline":
        return "double-red";
      case "slow":
        return "yellow";
      default:
        return "gray"; // Fallback color
    }
  }
};

export type NetworkStatus = "online" | "offline" | "slow";