import axios from "axios";
import config from "#server/config";
import { Utility } from "@core/services/utility";

type ResponseData = {
  timestamp: string;
  confirmed: number;
  previous: string;
} & (
  | {
      id?: undefined;
      block_num?: undefined;
    }
  | {
      id: string;
      block_num: number;
    }
);

interface BlockInfo {
  eosBlockNum: number;
  eosBlockId: string;
}

export async function getEosBlock(eosBlockNum: number): Promise<BlockInfo> {
  const { eosApiKey } = config;

  const nownodes = `https://eos.nownodes.io/${eosApiKey}/v1/chain/get_block`;
  const greymass = "https://eos.greymass.com/v1/chain/get_block";
  const data = { block_num_or_id: eosBlockNum };

  let eosBlockId;

  try {
    const res = await axios.post<ResponseData>(nownodes, data);
    eosBlockId = res.data.id;
  } catch (err) {
    console.error("Eos Error ", err);
    try {
      const res = await axios.post<ResponseData>(greymass, data);
      eosBlockId = res.data.id;
    } catch {
      await Utility.wait(1000);
    }
  }

  if (!eosBlockId) {
    return await getEosBlock(eosBlockNum);
  }

  return {
    eosBlockNum,
    eosBlockId,
  };
}
