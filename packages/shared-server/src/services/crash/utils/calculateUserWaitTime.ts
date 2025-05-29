import { getUserLatency } from "./getUserLatency";

/**
 * Calculate the wait time for emitting an event based on user latency and round status.
 * Get the user latency from the database and calculate the difference between the current time and the round event date.
 * return the latency plus the difference.
 * @param userId User ID
 * @param roundEventDate Event date (startDate or completedDate)
 * @returns Wait time in milliseconds
 */
export async function calculateUserWaitTime(userId: string, roundEventDate: Date): Promise<number> {
 
  const latencyForRound = await getUserLatency(userId);

  const difference = Date.now() - roundEventDate.getTime();
  return Math.max(latencyForRound + difference, 0);
}
