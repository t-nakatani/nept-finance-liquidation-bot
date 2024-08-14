import { getPriceTable } from "./getPriceTable";
import { PoolAccount, AccountTuple, PoolAccountKey } from "./types"
import { query } from "./client"
import { marketContract } from "./constants/address"
import { getLiquidationLTV } from "./getCollateralTable"


async function queryAllAccount(contractAddress, msg): Promise<AccountTuple[]> {
    const data = await query(contractAddress, msg)
    const accounts: AccountTuple[] = JSON.parse(data)
    return accounts
}

function parseAccounts(priceTable, collateralTable, accounts: AccountTuple[]) {
    accounts.forEach((accountTuple) => {
        const address: string = accountTuple[0][0]
        const collaterals: [PoolAccountKey, PoolAccount][] = accountTuple[1].collateral_pool_accounts
        const collateralSummery = summerizeCollaterals(priceTable, collateralTable, collaterals)

        const debts: [PoolAccountKey, PoolAccount][] = accountTuple[1].debt_pool_accounts
        let debtsSummery
        if (debts) {
            debtsSummery = summerizeDebts(priceTable, debts)
        } else {
            debtsSummery = null
        }

        if (collateralSummery < debtsSummery) {
            console.log(`\n===== liquidation chance (address: ${address}, ${parseInt(debtsSummery)}USD, ratio: ${debtsSummery / collateralSummery}) =====\n`)
        } else {
            console.log(`No liquidation chance (address: ${address}, ${parseInt(debtsSummery)}USD, ratio: ${debtsSummery / collateralSummery})`)
        }
    })
}

function summerizeCollaterals(priceTable, collateralTable, assets: [PoolAccountKey, PoolAccount][]) {
    let sumValueUSD = 0
    assets.forEach((poolAccountKeyPair) => {
        const token = poolAccountKeyPair[0].native_token ? poolAccountKeyPair[0].native_token.denom : poolAccountKeyPair[0].token.contract_addr
        const amount = poolAccountKeyPair[1].shares

        const valueUSD = priceTable[token].price * parseInt(amount) * 10 ** -priceTable[token].decimals
        const scaledValueUSD = valueUSD * parseFloat(collateralTable[token])
        sumValueUSD += scaledValueUSD
    })
    return sumValueUSD
}

function summerizeDebts(priceTable, assets: [PoolAccountKey, PoolAccount][]) {
    let sumValueUSD = 0
    assets.forEach((poolAccountKeyPair) => {
        const token = poolAccountKeyPair[0].native_token ? poolAccountKeyPair[0].native_token.denom : poolAccountKeyPair[0].token.contract_addr
        const amount = poolAccountKeyPair[1].shares

        const valueUSD = priceTable[token].price * parseInt(amount) * 10 ** -priceTable[token].decimals
        sumValueUSD += valueUSD
    })
    return sumValueUSD
}

async function main() {
    const accLotSize = 1000
    const priceTable = await getPriceTable()
    const collateralTable = await getLiquidationLTV()
    const lastAdress = ''

    const msg = { get_all_accounts: {start_after: [lastAdress, 0], limit: accLotSize}};

    const accounts: AccountTuple[] = await queryAllAccount(marketContract, msg)
    parseAccounts(priceTable, collateralTable, accounts)
}

main().catch(console.error)