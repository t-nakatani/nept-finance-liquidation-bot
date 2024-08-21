import { InjectiveQueryClient } from "./client";
import { priceOracleContract } from "../constants/address";
import { PriceInfo } from "./types";

export class PriceFetcher {
    private client: InjectiveQueryClient;
    priceTable: { [key: string]: { price: number; decimals: number } };

    constructor(client: InjectiveQueryClient) {
        this.client = client;
        this.priceTable = {};
    }

    async initialize(): Promise<void> {
        this.priceTable = await this.getPriceTable();
    }

    private async getPriceTable(): Promise<any> {
        const msg = { get_all_prices: {} };
        const priceData: any[] = await this.queryAllPrices(priceOracleContract, msg);

        let priceTable: { [key: string]: { price: number; decimals: number } } = {};
        priceData.forEach(tokenPricePair => {
            const key = tokenPricePair[0].native_token 
                ? tokenPricePair[0].native_token.denom 
                : tokenPricePair[0].token.contract_addr;

            const priceInfo: PriceInfo = tokenPricePair[1];
            const value = { price: parseFloat(priceInfo.price), decimals: priceInfo.decimals };
            priceTable[key] = value;
        });
        return priceTable;
    }

    private async queryAllPrices(contractAddress: string, msg: any): Promise<any[]> {
        const data = await this.client.query(contractAddress, msg);
        return JSON.parse(data);
    }
}
