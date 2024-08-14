import { Uint256, Decimal256, NeptuneMap, AssetInfo, AssetMap, LiquidationAmounts, LiquidationOperation, ExecuteMsg } from "./types"

export class LiquidatorEngine {
    // func-1: parepareSingleLiquidationMsg
    parepareSingleLiquidationMsg(
        target_account_addr: string,
        account_index: number,
        token_in: AssetInfo,
        amount_in: Uint256,
        token_out: AssetInfo,
        amount_out: Uint256,
        min_discount: Decimal256,
        // recipient: string,
    ): ExecuteMsg {
        const liquidation_operation: LiquidationOperation = this._createLiquidateOperation(
            target_account_addr,
            account_index,
            token_in,
            amount_in,
            token_out,
            amount_out,
            min_discount
        )
        return {
                liquidation_operations: [liquidation_operation],
                // recipient: recipient,
                tokens_sent: liquidation_operation.offer_assets
        }
    }

    // func-2: createLiquidateOperation
    _createLiquidateOperation(
        target_account_addr: string,
        account_index: number,
        token_in: AssetInfo,
        amount_in: Uint256,
        token_out: AssetInfo,
        amount_out: Uint256,
        min_discount: Decimal256
    ): LiquidationOperation {
        const amount_liq: LiquidationAmounts = {
            amount: amount_out,
            min_discount: min_discount
        }
    
        const offer_assets: AssetMap<Uint256> = new NeptuneMap([[token_in, amount_in]])
        const ask_assets: AssetMap<LiquidationAmounts> = new NeptuneMap([[token_out, amount_liq]])
    
        return {
            account_addr: target_account_addr,
            account_index: account_index,
            ask_assets: ask_assets,
            offer_assets: offer_assets
        }
    }
}
