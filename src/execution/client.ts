import { config } from "dotenv";
import { Network } from "@injectivelabs/networks";
import { PrivateKey, MsgSend, MsgExecuteContract, MsgBroadcasterWithPk, Msgs } from "@injectivelabs/sdk-ts";
import { BigNumberInBase } from "@injectivelabs/utils";
import { TxParams } from "./types"

config();

export class InjectiveClient {
  private privateKey: PrivateKey;
  private myAddress: string;
  private msgBroadcaster: MsgBroadcasterWithPk;

  constructor() {
    const privateKeyHash = process.env.PRIVATE_KEY;
    if (!privateKeyHash) {
      throw new Error("PRIVATE_KEY not set in environment variables");
    }

    this.privateKey = PrivateKey.fromHex(privateKeyHash) as PrivateKey
    this.myAddress = this.privateKey.toBech32();
    this.msgBroadcaster = new MsgBroadcasterWithPk({
      network: Network.MainnetSentry,
      privateKey: privateKeyHash,
    });
  }

  createTxParams(tokenIn: string, amountIn: string, contractAddress: string, action: string, actionMsg: object) {
    const msg = MsgExecuteContract.fromJSON({
      contractAddress,
      sender: this.myAddress,
      exec: {
        action: action,
        msg: actionMsg,
        funds: [
          {
            denom: 'inj',
            amount: new BigNumberInBase(1).toWei().toFixed(),
          },
        ],
      },
    })
    console.dir(msg, {depth: null});
    return msg
  }

  async sendTx(msg: Msgs) {
    try {
      const txHash = await this.msgBroadcaster.broadcast({ msgs: msg })
      console.log(txHash)
    } catch (error) {
      console.error("Error sending tx:", error);
      throw error;
    }
  }
}
