import { Socket, io } from "socket.io-client";
import { Dates } from "@core/services/dates";
import { SiteClientEvents } from "@core/types/sockets/SiteClientEvents";
import { SiteServerEvents } from "@core/types/sockets/SiteServerEvents";
import config from "#app/config";

// CRITICAL DEBUGGING: Dump the entire config object to see what's going on
console.log("SOCKET CONFIG DEBUG:", {
  apiURL: config.apiURL,
  siteAPI: config.siteAPI,
  siteURL: config.siteURL,
  env: config.env,
});

// DIRECT APPROACH: Get the API URL directly from window.runtimeConfig if available
// This bypasses any potential issues with the config object
let socketUrl = "";
if (window.runtimeConfig && window.runtimeConfig.siteAPI) {
  // Use siteAPI directly from window.runtimeConfig
  socketUrl = window.runtimeConfig.siteAPI;
  console.log(`[Socket] Using API URL directly from window.runtimeConfig: ${socketUrl}`);
} else {
  // Fallback to config.siteAPI
  socketUrl = config.siteAPI || "";
  console.log(`[Socket] Using API URL from config object: ${socketUrl}`);
}

// Ensure URL has protocol
if (!socketUrl.startsWith('http://') && !socketUrl.startsWith('https://')) {
  socketUrl = `https://${socketUrl}`;
}

console.log(`[Socket] FINAL Connection URL: ${socketUrl}`);

// Create the Socket.io client with explicit URL
export const client: Socket<SiteServerEvents, SiteClientEvents> = io(
  socketUrl,
  {
    transports: ["websocket"],
    autoConnect: true, // Explicitly enable auto-connect
    forceNew: true,    // Force a new connection
  },
);

// Configure event handling
client.onAny((event, ...args) => {
  for (const arg of args) {
    if (typeof arg === "object") {
      Dates.parseDates(arg);
    }
  }
});
