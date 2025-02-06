import { badWords } from "../constants/badWords";

export function containsBadWord(text: string) {
  if (badWords.some((x) => text.toLowerCase().includes(x))) {
    return true;
  }
  if (/[\u0400-\u04FF]+/.test(text)) {
    return true;
  }
}
