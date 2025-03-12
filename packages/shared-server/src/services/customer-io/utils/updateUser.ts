import { track } from "./track";

export async function updateUser(userId: string, updates: Record<string, any>) {
  return await track().identify(userId, updates);
}
