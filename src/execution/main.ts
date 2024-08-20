import { InjectiveClient } from "./client"
import { LiquidatorEngine } from "./liquidator"
import { marketContract } from "../constants/address"
import { AssetInfo } from "./types"

async function main() {
    const client = new InjectiveClient()
    const liquidator = new LiquidatorEngine()

    const target_account_addr = 'inj...'
    const account_index = 0
    const tokenIn: AssetInfo = { native_token: { denom: 'inj' } }
    const amountIn = '1'
    const token_out: AssetInfo = { native_token: { denom: 'inj' } }
    const amount_out = '1'
    const min_discount = '10'

    const action = 'liquidate'
    const actionMsg = liquidator.createLiquidateOperation(
        target_account_addr,
        account_index,
        tokenIn,
        amountIn,
        token_out,
        amount_out,
        min_discount
    )
    const txParam = client.createTxParams(tokenIn.native_token.denom, amountIn, marketContract, action, actionMsg)
    await client.sendTx(txParam)
}

main().catch(console.error)
