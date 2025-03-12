import config from "#server/config";
import { web } from "./web";

export async function ping(text: string) {
  await web().chat.postMessage({
    text,
    channel: config.env === "production" ? "C0785GAT0TY" : "C078MKJCER0",
  });
}
