import { DatabaseManager } from "../classes/DatabaseManager";

export const manager = new DatabaseManager();

manager.setMaxListeners(32);
