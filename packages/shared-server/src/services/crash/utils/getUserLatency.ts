import { Database } from "#server/services/database";

/**
 * Fetch the user latency from the database.
 * @param userId User ID
 * @returns User latency in milliseconds
 */
export async function getUserLatency(userId: string): Promise<number> {
  let latencyForRound = 0;
  try {
    const userLatency = await Database.collection("user-latency").findOne({ userId });
    if (userLatency) latencyForRound = userLatency.latencyLastMin;
  } catch (error) {
    console.error(`Failed to fetch latency for user ${userId}`);
  }

  return latencyForRound;
}
