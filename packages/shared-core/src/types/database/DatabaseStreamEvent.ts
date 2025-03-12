import type { DatabaseCollections } from "./DatabaseCollections";

export type StreamKey = keyof DatabaseCollections;

export type StreamSchema<K extends StreamKey> = DatabaseCollections[K] & {
  _id: string;
  hidden?: boolean;
};

export type StreamEventType = "initialize" | "insert" | "update";

export interface StreamUpdate {
  documentId: string;
  updatedFields: Record<string, unknown>;
  removedFields: Array<string>;
}

export type DatabaseStreamEvent<K extends StreamKey = StreamKey> = {
  type: StreamEventType;
} & (
  | {
      type: "initialize";
      documents: Array<StreamSchema<K>>;
    }
  | {
      type: "insert";
      document: StreamSchema<K>;
    }
  | {
      type: "update";
      update: StreamUpdate;
    }
);
