// https://vpnapi.io/api-documentation

export interface IpInfoDocument {
  _id: string;
  ip: string;
  timestamp: Date;
  security: {
    vpn: boolean;
    proxy: boolean;
    tor: boolean;
    relay: boolean;
  };
  location: {
    city: string;
    region: string;
    country: string;
    country_code: string;
    continent: string;
    continent_code: string;
    time_zone: string;
  };
}
