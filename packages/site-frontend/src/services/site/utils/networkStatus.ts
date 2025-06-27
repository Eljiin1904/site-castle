import { networkThreshold, NetworkStatus } from "../Site";

export function getNetworkStatus(latency: number): NetworkStatus {
  if (latency > networkThreshold.veryPoor) {
    return "offline";
  } else if (latency > networkThreshold.fair) {
    return "slow";
  }
  return "online";
};
