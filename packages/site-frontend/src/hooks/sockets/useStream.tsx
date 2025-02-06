import { useEffect, useMemo, useState } from "react";
import { Database } from "@core/services/database";
import { SiteServerEvents } from "@core/types/sockets/SiteServerEvents";
import { DatabaseCollections } from "@core/types/database/DatabaseCollections";
import { DatabaseStreamEvent } from "@core/types/database/DatabaseStreamEvent";
import { Sockets } from "#app/services/sockets";

export function useStream<
  K extends keyof SiteServerEvents,
  T extends SiteServerEvents[K] extends (e: DatabaseStreamEvent<any>) => void
    ? Parameters<SiteServerEvents[K]>[0] extends DatabaseStreamEvent<infer T>
      ? T extends keyof DatabaseCollections
        ? DatabaseCollections[T]
        : unknown
      : unknown
    : unknown,
>({
  key,
  maxLogSize,
  onInitialize,
  onInsert,
  onChange,
}: {
  key: K;
  maxLogSize: number;
  onInitialize?: (documents: T[]) => void;
  onInsert?: (document: T) => void;
  onChange?: (log: T[], initial: boolean) => void;
}) {
  const [initialized, setInitialized] = useState(false);
  const [inserted, setInserted] = useState(false);
  const [log, setLog] = useState<T[]>([]);

  useEffect(() => {
    const onEvent = (e: DatabaseStreamEvent) => {
      const newLog = Database.updateStreamLog({
        e,
        current: log,
        maxSize: maxLogSize,
      });

      setLog(newLog);

      if (e.type === "initialize") {
        setInitialized(true);
        setInserted(false);
        onInitialize && onInitialize(e.documents as T[]);
      }

      if (e.type === "insert") {
        setInserted(true);
        onInsert && onInsert(e.document as T);
      }

      onChange && onChange(newLog, e.type === "initialize");
    };

    Sockets.client.on<keyof SiteServerEvents>(key, onEvent);

    return () => {
      Sockets.client.off<keyof SiteServerEvents>(key, onEvent);
    };
  });

  const stream = useMemo(
    () => ({ log, initialized, inserted }),
    [log, initialized, inserted],
  );

  return stream;
}
