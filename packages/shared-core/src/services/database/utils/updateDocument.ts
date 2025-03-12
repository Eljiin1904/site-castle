export function updateDocument({
  document,
  updatedFields,
  removedFields,
}: {
  document: Record<string, any>;
  updatedFields: Record<string, any>;
  removedFields: string[];
}) {
  for (const x of Object.keys(updatedFields)) {
    const keys = x.split(".");
    if (keys.length === 1) {
      document[x] = updatedFields[x];
    } else if (keys.length === 2) {
      document[keys[0]][keys[1]] = updatedFields[x];
    } else if (keys.length === 3) {
      document[keys[0]][keys[1]][keys[2]] = updatedFields[x];
    } else if (keys.length === 4) {
      document[keys[0]][keys[1]][keys[2]][keys[3]] = updatedFields[x];
    } else {
      throw new Error(`Maximum depth reached, length: ${keys.length}`);
    }
  }

  for (const x of removedFields) {
    const keys = x.split(".");
    if (keys.length === 1) {
      delete document[x];
    } else if (keys.length === 2) {
      delete document[keys[0]][keys[1]];
    } else if (keys.length === 3) {
      delete document[keys[0]][keys[1]][keys[2]];
    } else if (keys.length === 4) {
      delete document[keys[0]][keys[1]][keys[2]][keys[3]];
    } else {
      throw new Error(`Maximum depth reached, length: ${keys.length}`);
    }
  }

  return document;
}
