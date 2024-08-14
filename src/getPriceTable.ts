import { queryAllPrices } from "./get_all_prices"
import { priceOracleContract } from "./constants/address"

interface PriceInfo {
    price: string
    decimals: number
    time_last_updated: string
    confidence: string
}

export async function getPriceTable() {
    const msg = { get_all_prices: {} }
    const priceData: [] = await queryAllPrices(priceOracleContract, msg)

    let priceTable = {}
    priceData.forEach(tokenPricePair => {
        // console.log(tokenPricePair)
        const key = tokenPricePair[0].native_token 
            ? tokenPricePair[0].native_token.denom 
            : tokenPricePair[0].token.contract_addr;

        const priceInfo: PriceInfo = tokenPricePair[1]
        const value = { price: parseFloat(priceInfo.price), decimals: priceInfo.decimals}
        priceTable[key] = value
    });
    return priceTable
}

// getPriceTable().catch(console.error)

// {
//     'ibc/2CBC2EA121AE42563B08028466F37B600F2D7D4282342DE938283CC3FB2BC00E': { price: 0.99985685, decimals: 6 },
//     'ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9': { price: 4.97139973, decimals: 6 },
//     'ibc/F51BB221BAA275F2EBF654F70B005627D7E713AFFD6D86AFD1E43CAA886149F4': { price: 5.61312364, decimals: 6 },
//     inj: { price: 18.73812394, decimals: 18 },
//     peggy0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2: { price: 2658.2416347, decimals: 18 },
//     peggy0xdAC17F958D2ee523a2206206994597C13D831ec7: { price: 1.0001962, decimals: 6 },
//     inj16jf4qkcarp3lan4wl2qkrelf4kduvvujwg0780: { price: 5.086502336055977, decimals: 6 },
//     inj18luqttqyckgpddndh8hvaq25d5nfwjc78m56lc: { price: 18.73812394, decimals: 18 },
//     inj1cy9hes20vww2yr6crvs75gxy5hpycya2hmjg9s: { price: 1.0898594418725625, decimals: 6 },
//     inj1dafy7fv7qczzatd98dv8hekx6ssckrflswpjaz: { price: 1.0181488241322907, decimals: 6 },
//     inj1fzquxxxam59z6fzewy2hvvreeh3m04x83zg4vv: { price: 5.77637689767626, decimals: 6 },
//     inj1kehk5nvreklhylx22p3x0yjydfsz9fv3fvg5xt: { price: 2712.8542840608297, decimals: 18 },
//     inj1rmzufd7h09sqfrre5dtvu5d09ta7c0t4jzkr2f: { price: 19.430281945813416, decimals: 18 }
// }