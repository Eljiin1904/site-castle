import { Http } from "@client/services/http";
interface ProgressResponse {
  current: number;
  total: number;
  percent: string;
}
export function syncStatus(): Promise<ProgressResponse> {
  return Http.get("/hub-eight/games/sync/status");
}
