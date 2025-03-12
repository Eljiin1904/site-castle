import { capitalize } from "./capitalize";

/**
 * Converts "kebab-text" to "Kebab Text".
 */
export function kebabToTitle(str: string) {
  if (!str) {
    return "";
  }
  return capitalize(str.replace(/-/g, " "));
}
