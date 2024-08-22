import { Uint256, Decimal256, NeptuneMap, AssetInfo, AssetMap, LiquidationAmounts, LiquidationOperation, ExecuteMsg } from "./types"

export class LiquidateEngine {
    searchBestAssets(
        collaterals: AssetInfo[],
        debts: AssetInfo[]
    ) {
        // 仮簡易実装
        const collateralTokenInfo: AssetInfo = collaterals[0];
        const collateralToken = collateralTokenInfo[0];
        const collateralAmount = collateralTokenInfo[1].shares;
  
        const debtTokenInfo: AssetInfo = debts[0];
        const debtToken = debtTokenInfo[0];
        const debtAmount = debtTokenInfo[1].shares;

        const offerAsset = {token: debtToken, amount: debtAmount}
        const askAsset = {token: collateralToken, amount: collateralAmount}
        return [offerAsset, askAsset]
    }

    createLiquidateOperation(
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
        const offer_assets: AssetMap<Uint256> = [[token_in, amount_in]];
        const ask_assets: AssetMap<LiquidationAmounts> = [[token_out, amount_liq]];
    
        return {
            account_addr: target_account_addr,
            account_index: account_index,
            ask_assets: ask_assets,
            offer_assets: offer_assets
        }
    }
}
