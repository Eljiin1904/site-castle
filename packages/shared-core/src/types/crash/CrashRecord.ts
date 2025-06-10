export interface CrashRecordDocument {
  _id: string;
  hash: string;
  index: number;
  timestamp: Date;
  used: boolean;
}