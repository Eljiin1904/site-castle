import { UserLocation } from "#core/types/users/UserLocation";

export function getLocationString(location: UserLocation) {
  const { ip, city, country } = location;

  if (city && country) {
    return `${city}, ${country} (${ip})`;
  } else if (country) {
    return `${country} (${ip})`;
  } else {
    return `(${ip})`;
  }
}
