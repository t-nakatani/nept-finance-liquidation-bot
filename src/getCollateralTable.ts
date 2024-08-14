import { PoolAccount, AccountTuple, PoolAccountKey } from "./types"
import { query } from "./client"
import { marketContract } from "./constants/address"

async function queryAllCollaterals(contractAddress, msg) {
    const data = await query(contractAddress, msg)
    const collaterals = JSON.parse(data)
    return collaterals
}

export async function getLiquidationLTV() {
    const msg = { get_all_collaterals: {} };
    const collaterals = await queryAllCollaterals(marketContract, msg)
    const collateralTable = {}
    collaterals.forEach((collateral) => {
        const token = collateral[0].token ? collateral[0].token.contract_addr : collateral[0].native_token.denom
        const liquidationLTV = collateral[1].collateral_details.liquidation_ltv
        collateralTable[token] = liquidationLTV
    })
    return collateralTable

}

// getLiquidationLTV().catch(console.error)