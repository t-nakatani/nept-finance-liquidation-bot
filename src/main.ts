import { toBase64, fromBase64 } from "@injectivelabs/sdk-ts"
import { chainGrpcWasmApi } from "./services"
import {Account, PoolAccount} from "./types"

async function query() {
    const CONTRACT_ADDRESS = "inj1nc7gjkf2mhp34a6gquhurg8qahnw5kxs5u3s4u"
    const response = await chainGrpcWasmApi.fetchSmartContractState(
        CONTRACT_ADDRESS, 
        // toBase64({ get_state: {} })
        toBase64({ get_user_accounts: {addr: "inj1wqhker6wkskcwyuzdf5hk7qdzwt9lkxqsrn3qf"} })
    )

    // const data = new TextDecoder().decode(response.data)
    // console.log(JSON.parse(data))
    // const decodedData = new TextDecoder().decode(response.data)
    // const parsedData = JSON.parse(decodedData)[0] as [number, Account]
    const decodedData = new TextDecoder().decode(response.data)
    const [_, account] = JSON.parse(decodedData)[0] as [number, Account]

    console.log("Account Details:")
    console.log(`Last Transaction Height: ${account.last_tx_height}`)
    console.log("\nDebt Pool Accounts:")
    account.debt_pool_accounts.forEach(([assetInfo, poolAccount]) => {
        const assetType = assetInfo.native_token ? 'Native Token' : 'Token Contract';
        const assetId = assetInfo.native_token ? assetInfo.native_token.denom : assetInfo.token?.contract_addr;
        console.log(`  Asset Type: ${assetType}`)
        console.log(`  Asset ID: ${assetId}`)
        console.log(`  Principal: ${poolAccount.principal}`)
        console.log(`  Shares: ${poolAccount.shares}`)
        console.log()
    })

    console.log("Collateral Pool Accounts:")
    account.collateral_pool_accounts.forEach(([assetInfo, poolAccount]) => {
        const assetType = assetInfo.native_token ? 'Native Token' : 'Token Contract';
        const assetId = assetInfo.native_token ? assetInfo.native_token.denom : assetInfo.token?.contract_addr;
        console.log(`  Asset Type: ${assetType}`)
        console.log(`  Asset ID: ${assetId}`)
        console.log(`  Principal: ${poolAccount.principal}`)
        console.log(`  Shares: ${poolAccount.shares}`)
        console.log()
    })
    // console.log(parsedData)
    // console.log('=====')
    // console.log(parsedData[1].last_tx_height)
    // console.log(parsedData[1].debt_pool_accounts)
    // console.log(parsedData[1].collateral_pool_accounts)
}

query().catch(console.error)