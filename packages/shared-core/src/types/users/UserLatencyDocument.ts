export interface UserLatencyRecording {
  latency: number;
  timestamp: Date;
}

export interface UserLatencyDocument {
  userId: string;
  authenticated: boolean; // Optional socket ID if needed for additional logic
  latencyLastMin: number;
  latencyLast5Min: number;
  latencyLast10Min: number;
  timestamp: Date;
  recordings: UserLatencyRecording[];
  lastUpdated: Date;
}