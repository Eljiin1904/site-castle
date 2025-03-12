import { xpTable } from "./xpTable";

export const maxLevel = xpTable.length;
export const minLevel = xpTable[0] === 0 ? 1 : 0;
