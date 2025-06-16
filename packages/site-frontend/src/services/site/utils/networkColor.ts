import { NetworkStatus } from "../Site";

export function getNetworkColor(status: NetworkStatus) : Color {
  switch (status) {
    case "online":
      return "bright-green";
    case "offline":
      return "double-red";
    case "slow":
      return "yellow";
    default:
      return "gray"
  }
};