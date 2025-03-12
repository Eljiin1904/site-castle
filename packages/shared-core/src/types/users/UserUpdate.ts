export interface UserUpdate {
  updatedFields: Record<string, unknown>;
  removedFields: Array<string>;
}
