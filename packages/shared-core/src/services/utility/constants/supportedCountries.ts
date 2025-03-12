import { blockedCountries } from "./blockedCountries";
import { countries } from "./countries";

export const supportedCountries = countries.filter(
  (x) => !blockedCountries.includes(x.code),
);
