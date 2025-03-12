import axios from "axios";
import config from "#server/config";
import { Utility } from "@core/services/utility";

interface BlockInfo {
  id: string;
}

export async function getEosBlock(blockNum: number) {
  const { eosApiKey } = config;
  const data = { block_num_or_id: blockNum };

  try {
    const res = await axios.post<BlockInfo>(
      `https://eos.nownodes.io/${eosApiKey}/v1/chain/get_block`,
      data,
    );
    return res.data;
  } catch {
    try {
      const res = await axios.post<BlockInfo>(
        "https://eos.greymass.com/v1/chain/get_block",
        data,
      );
      return res.data;
    } catch {
      await Utility.wait(1000);
      return await getEosBlock(blockNum);
    }
  }
}
