import { InjectiveClient } from "./client"
import { LiquidatorEngine } from "./liquidator"
import { marketContract } from "../constants/address"
import { AssetInfo } from "./types"

async function main() {
    const client = new InjectiveClient()
    const liquidator = new LiquidatorEngine()

    const target_account_addr = 'inj...'
    const account_index = 0
    const tokenIn: AssetInfo = { NativeToken: { denom: 'inj' } }
    const amountIn = '1'
    const token_out: AssetInfo = { NativeToken: { denom: 'inj' } }
    const amount_out = '1'
    const min_discount = '10'

    const action = 'liquidate'
    const actionMsg = liquidator.parepareSingleLiquidationMsg(
        target_account_addr,
        account_index,
        tokenIn,
        amountIn,
        token_out,
        amount_out,
        min_discount
    )

    // console.log(actionMsg.liquidation_operations)
    // const txParam = client.createTxParams(tokenIn.NativeToken.denom, amountIn, marketContract, action, actionMsg.liquidation_operations)
    console.log(actionMsg)
    const txParam = client.createTxParams(tokenIn.NativeToken.denom, amountIn, marketContract, action, actionMsg)
    await client.sendTx(txParam)
}

main().catch(console.error)
