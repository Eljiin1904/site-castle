import { xpTable } from "../constants/xpTable";

export function getXP(level: number) {
  if (level >= xpTable.length) {
    return xpTable[xpTable.length - 1];
  }
  return xpTable[level];
}
