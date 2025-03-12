import { UserLocation } from "@core/types/users/UserLocation";
import { HandledError } from "@server/services/errors";
import { Http } from "#app/services/http";

export async function validateVpn(
  ip: string | undefined,
  error?: string,
): Promise<UserLocation> {
  const { security, location } = await Http.getIpInfo(ip);

  if (!security) {
    return { ip };
  }

  const { vpn, proxy, tor, relay } = security;

  if (vpn || proxy || tor || relay) {
    throw new HandledError(
      error ||
        "We detected a VPN or proxy. Please turn off these services and try again.",
    );
  }

  return {
    ip,
    city: location?.city,
    region: location?.region,
    country: location?.country,
    countryCode: location?.country_code,
  };
}
