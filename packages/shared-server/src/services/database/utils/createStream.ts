import { StreamKey } from "@core/types/database/DatabaseStreamEvent";
import { DatabaseStream, StreamOptions } from "../classes/DatabaseStream";

export function createStream<K extends StreamKey>(options: StreamOptions<K>) {
  return new DatabaseStream(options);
}
