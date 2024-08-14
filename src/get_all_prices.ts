import { PoolAccount, AccountTuple, PoolAccountKey } from "./types"
import { query } from "./client"
import { priceOracleContract } from "./constants/address"

export async function queryAllPrices(contractAddress: string, msg) {
    const data = await query(contractAddress, msg)
    const prices = JSON.parse(data)
    return prices
}

// async function main() {
//     const msg = { get_all_prices: {} };
//     const collateralPools = await queryAllPrices(priceOracleContract, msg)

//     collateralPools.forEach((collateralPool) => {
//         console.log(collateralPool)
//     })
// }

// main().catch(console.error)
