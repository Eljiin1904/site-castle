import { Database } from "#server/services/database";

export async function getLatency(
  userId: string | undefined,
  socketId: string | undefined,
): Promise<number> {
  
   if (!userId && !socketId) {
        throw new Error("Invalid parameters for recordLatency");
      }
      
      let userIdToUse = userId;
      if (!userIdToUse) {
        userIdToUse = socketId ?? "anonymous";
      }
      
      const userLatency =  await Database.collection("user-latency").findOne({userId:userIdToUse});
      if (!userLatency) {
        return 0; // No latency recorded for this user
      }
      return userLatency.latencyLastMin; // Return the latest recorded latency
}
