import { DatabaseStreamEvent } from "#core/types/database/DatabaseStreamEvent";
import { updateDocument } from "./updateDocument";

export function updateStreamLog({
  e,
  current,
  maxSize,
}: {
  e: DatabaseStreamEvent;
  current: any[];
  maxSize: number;
}) {
  if (e.type === "initialize") {
    const log = e.documents;
    if (log.length > maxSize) {
      log.length = maxSize;
    }
    return log;
  } else if (e.type === "insert") {
    const log = [e.document, ...current];
    if (log.length > maxSize) {
      log.length = maxSize;
    }
    return log;
  } else {
    const log = current.slice();
    const documentIndex = log.findIndex(
      (saved) => saved._id === e.update.documentId,
    );

    if (documentIndex !== -1) {
      if ("hidden" in e.update.updatedFields) {
        log.splice(documentIndex, 1);
      } else {
        updateDocument({
          document: log[documentIndex],
          updatedFields: e.update.updatedFields,
          removedFields: e.update.removedFields,
        });
      }
    }

    return log;
  }
}
