import axios from "axios";
import config from "#server/config";

interface ResponseData {
  head_block_id: string;
  head_block_num: number;
  head_block_time: string;
}

interface BlockInfo {
  eosBlockId: string;
  eosBlockNum: number;
  eosBlockDate: Date;
}

let lastBlock: BlockInfo | undefined;

export async function getEosBlockNow() {
  if (!lastBlock || Date.now() - lastBlock.eosBlockDate.getTime() >= 500) {
    const { eosApiKey } = config;

    try {
      const res = await axios.get<ResponseData>(
        `https://eos.nownodes.io/${eosApiKey}/v1/chain/get_info`,
      );
      setLastBlock(res.data);
    } catch (e) {
      const res = await axios.get<ResponseData>("https://eos.greymass.com/v1/chain/get_info");
      setLastBlock(res.data);
    }
  }

  if (!lastBlock) {
    throw new Error("Failed to EOS block.");
  }

  return lastBlock;
}

function setLastBlock(res: ResponseData) {
  lastBlock = {
    eosBlockId: res.head_block_id,
    eosBlockNum: res.head_block_num,
    eosBlockDate: new Date(res.head_block_time + "Z"),
  };
}
