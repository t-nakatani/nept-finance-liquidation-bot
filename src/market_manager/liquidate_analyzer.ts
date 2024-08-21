import { PriceFetcher } from "./price_fetcher";
import { CollateralFetcher } from "./collateral_fetcher";
import { PoolAccount, PoolAccountKey, AccountTuple, LiquidationChance } from "./types";

export class LiquidationAnalyzer {
    private priceFetcher: PriceFetcher;
    private collateralFetcher: CollateralFetcher;

    constructor(priceFetcher: PriceFetcher, collateralFetcher: CollateralFetcher) {
        this.priceFetcher = priceFetcher;
        this.collateralFetcher = collateralFetcher;
    }

    analyzeAccounts(accounts: AccountTuple[]): LiquidationChance[] {
        const liquidationChances: LiquidationChance[] = [];
        accounts.forEach((accountTuple) => {
            const address: string = accountTuple[0][0];
            const collaterals: [PoolAccountKey, PoolAccount][] = accountTuple[1].collateral_pool_accounts;
            const collateralSummary = this.summerizeCollaterals(collaterals);

            const debts: [PoolAccountKey, PoolAccount][] = accountTuple[1].debt_pool_accounts;
            let debtsSummary = debts ? this.summerizeDebts(debts) : 0;

            if (collateralSummary < debtsSummary) {
                // console.log(`\n===== liquidation chance (address: ${address}, ${parseInt(debtsSummary.toString())}USD, ratio: ${debtsSummary / collateralSummary}) =====\n`);
                liquidationChances.push({
                    address: address,
                    collaterals: collaterals,
                    debts: debts,
                    ratio: debtsSummary / collateralSummary,
                    usd_value: debtsSummary
                });
            }
            // else {
            //     console.log(`No liquidation chance (address: ${address}, ${parseInt(debtsSummary.toString())}USD, ratio: ${debtsSummary / collateralSummary})`);
            // }
        });
        return liquidationChances;
    }

    private summerizeCollaterals(assets: [PoolAccountKey, PoolAccount][]): number {
        let sumValueUSD = 0;
        assets.forEach((poolAccountKeyPair) => {
            const token = poolAccountKeyPair[0].native_token ? poolAccountKeyPair[0].native_token.denom : poolAccountKeyPair[0].token.contract_addr;
            const amount = poolAccountKeyPair[1].shares;

            const valueUSD = this.priceFetcher.priceTable[token].price * parseInt(amount) * 10 ** -this.priceFetcher.priceTable[token].decimals;
            const scaledValueUSD = valueUSD * parseFloat(this.collateralFetcher.collateralTable[token]);
            sumValueUSD += scaledValueUSD;
        });
        return sumValueUSD;
    }

    private summerizeDebts(assets: [PoolAccountKey, PoolAccount][]): number {
        let sumValueUSD = 0;
        assets.forEach((poolAccountKeyPair) => {
            const token = poolAccountKeyPair[0].native_token ? poolAccountKeyPair[0].native_token.denom : poolAccountKeyPair[0].token.contract_addr;
            const amount = poolAccountKeyPair[1].shares;

            const valueUSD = this.priceFetcher.priceTable[token].price * parseInt(amount) * 10 ** -this.priceFetcher.priceTable[token].decimals;
            sumValueUSD += valueUSD;
        });
        return sumValueUSD;
    }
}
