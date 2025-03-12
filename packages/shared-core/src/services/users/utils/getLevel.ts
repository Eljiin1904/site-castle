import { xpTable } from "../constants/xpTable";

export function getLevel(xp: number) {
  for (let i = 0; i < xpTable.length; i++) {
    if (xp < xpTable[i]) {
      return i - 1;
    }
  }
  return xpTable.length - 1;
}
