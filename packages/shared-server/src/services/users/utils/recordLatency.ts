import { Database } from "#server/services/database";
import { UserLatencyDocument, UserLatencyRecording } from "@core/types/users/UserLatencyDocument";

const RECORDINGS_PER_MINUTE = 12;
const MAX_RECORDINGS = 120;

/**
 * Store a new user latency recording in the database and calculate the median latency for the last minute, 5 minutes, and 10 minutes.
 * @param userId Current User ID
 * @param latency Latency recording, should be an object with a timestamp and latency value
 * @returns Updated user latency document
 */
export async function recordLatency(
  userId: string,
  latency: UserLatencyRecording,
  socketId?: string, // Optional socket ID if needed for additional logic
): Promise<UserLatencyDocument | null> {
  try {
    
    if (!userId && !socketId) {
      throw new Error("Invalid parameters for recordLatency");
    }
    let userIdToUse = userId;
    const authenticated = !!userId; // Assuming userId is provided when authenticated
    if (!userIdToUse) {
      userIdToUse = socketId ?? "anonymous";
    }
    
    const userLatency =  await Database.collection("user-latency").findOne({ userId:userIdToUse, authenticated: false });
    const recordingDate = new Date();

    // If no user latency document exists, create one
    if (!userLatency) {
      const newUserLatency: UserLatencyDocument = {
        userId: userIdToUse,
        lastUpdated: recordingDate,
        latencyLastMin: latency.latency,
        latencyLast5Min: latency.latency,
        latencyLast10Min: latency.latency,
        timestamp: recordingDate,
        recordings: [latency],
        authenticated, // Store the socket ID if provided
      };

      await Database.collection("user-latency").insertOne(newUserLatency);
      return newUserLatency;
    }

    // Update existing user latency document
    const recordings = [...userLatency.recordings, latency];
    if (recordings.length > MAX_RECORDINGS) {
      recordings.shift(); // Remove the oldest recording
    }

    const calculateMedian = (values: number[]): number => {
      const sorted = [...values].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 === 0
        ? (sorted[mid - 1] + sorted[mid]) / 2
        : sorted[mid];
    };

    const latencyValues = recordings.map((r) => r.latency);
    const medianLastMinute = calculateMedian(latencyValues.slice(-RECORDINGS_PER_MINUTE));
    const medianLast5Minutes = calculateMedian(latencyValues.slice(-RECORDINGS_PER_MINUTE * 5));
    const medianLast10Minutes = calculateMedian(latencyValues.slice(-RECORDINGS_PER_MINUTE * 10));

    const updatedUserLatency: UserLatencyDocument = {
      ...userLatency,
      lastUpdated: recordingDate,
      latencyLastMin: medianLastMinute,
      latencyLast5Min: medianLast5Minutes,
      latencyLast10Min: medianLast10Minutes,
      recordings,
    };

    await Database.collection("user-latency").updateOne(
      { userId: userIdToUse, authenticated },
      { $set: updatedUserLatency }
    );

    return updatedUserLatency;
  } catch (error) {
    console.error(`errors.latency.recording`);
    return null;
  }
}
