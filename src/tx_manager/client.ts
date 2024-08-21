import { config } from "dotenv"
import { Network } from "@injectivelabs/networks"
import { PrivateKey, MsgBroadcasterWithPk, Msgs } from "@injectivelabs/sdk-ts"

config()

export class InjectiveClient {
  private myAddress: string
  private msgBroadcaster: MsgBroadcasterWithPk

  constructor() {
    const privateKeyHash = process.env.PRIVATE_KEY
    if (!privateKeyHash) {
      throw new Error("PRIVATE_KEY not set in environment variables")
    }

    const privateKey: PrivateKey = PrivateKey.fromHex(privateKeyHash) as PrivateKey
    this.myAddress = privateKey.toBech32()
    this.msgBroadcaster = new MsgBroadcasterWithPk({
      network: Network.MainnetSentry,
      privateKey: privateKeyHash,
    })
  }

  getMyAddress() {
    return this.myAddress
  }

  async sendTx(msg: Msgs) {
    try {
      const txHash = await this.msgBroadcaster.broadcast({ msgs: msg })
      console.log(txHash)
    } catch (error) {
      console.error("Error sending tx:", error)
      throw error
    }
  }
}
