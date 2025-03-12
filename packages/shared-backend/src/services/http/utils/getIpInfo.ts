import axios from "axios";
import { IpInfoDocument } from "@core/types/http/IpInfoDocument";
import { Database } from "@server/services/database";
import { Ids } from "@server/services/ids";
import config from "#app/config";

export async function getIpInfo(ip: string | undefined) {
  const { env, vpnApiKey } = config;

  if (!ip || env === "development" || env === "devcloud") {
    return { ip, security: undefined, location: undefined };
  }

  const document = await Database.collection("ip-info").findOne({ ip });

  if (document) {
    return document;
  }

  const { data } = await axios.get(`https://vpnapi.io/api/${ip}`, {
    params: {
      key: vpnApiKey,
    },
  });

  const insert: IpInfoDocument = {
    _id: Ids.object(),
    ...data,
    ip,
  };

  await Database.collection("ip-info").insertOne(insert);

  return insert;
}
