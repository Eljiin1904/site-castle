import { Birthday } from "#core/types/utility/Birthday";

export function getBirthDate(dob: Birthday) {
  return new Date(dob.year, dob.month - 1, dob.day, 8);
}
