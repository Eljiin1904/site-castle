/**
 * Represents a document for a crash multiplier in the crash game database.
 * Contains information about the round, round's multiplier, round time, and server seed details.
 * This document is used to track the multiplier for each crash round. 
 * For each round, a new document is created with the multiplier value at the time of the crash, then 
 * through sockets and setInterval, the round time is updated in the client until the round is completed.
 */
export interface CrashMultiplierDocument {
  _id: string;
  timestamp: Date;
  roundId: string;
  multiplier: number;
  serverHash: string;
  clientHash: string;
  roundTime: number;
}