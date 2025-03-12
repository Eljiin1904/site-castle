import { UserLocation } from "@core/types/users/UserLocation";
import { getIpInfo } from "./getIpInfo";

export async function getLocation(
  ip: string | undefined,
): Promise<UserLocation> {
  const { location } = await getIpInfo(ip);

  return {
    ip,
    city: location?.city,
    region: location?.region,
    country: location?.country,
    countryCode: location?.country_code,
  };
}
