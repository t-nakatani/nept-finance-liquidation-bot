import { MsgExecuteContract } from "@injectivelabs/sdk-ts"
import { BigNumberInBase } from "@injectivelabs/utils"
import { InjectiveClient } from "./client"

export class TxGenerator {
    private client: any

    constructor() {
        this.client = new InjectiveClient();
    }

    generateTxParams(tokenIn: string, amountIn: string, contractAddress: string, action: string, actionMsg: object) {
        const msg = MsgExecuteContract.fromJSON({
          contractAddress,
          sender: this.client.getMyAddress(),
          exec: {
            action: action,
            msg: actionMsg,
            funds: [
              {
                denom: tokenIn,
                amount: new BigNumberInBase(amountIn).toFixed(),
              },
            ],
          },
        })
        console.dir(msg, {depth: null})
        return msg
      }

    async generateTx(denom: string, amountIn: string, contractAddress: string, action: string, actionMsg: any) {
        const txParam = this.generateTxParams(denom, amountIn, contractAddress, action, actionMsg)
        await this.client.sendTx(txParam)
    }
}
