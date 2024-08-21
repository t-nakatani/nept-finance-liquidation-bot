import { InjectiveQueryClient } from "./client";
import { marketContract } from "../constants/address";

export class CollateralFetcher {
    private client: InjectiveQueryClient;
    collateralTable: { [key: string]: string };

    constructor(client: InjectiveQueryClient) {
        this.client = client;
        this.collateralTable = {};
    }

    async initialize(): Promise<void> {
        this.collateralTable = await this.getLiquidationLTV();
    }

    private async getLiquidationLTV(): Promise<any> {
        const msg = { get_all_collaterals: {} };
        const collaterals = await this.queryAllCollaterals(marketContract, msg);
        const collateralTable: { [key: string]: string } = {};
        collaterals.forEach((collateral: any) => {
            const token = collateral[0].token ? collateral[0].token.contract_addr : collateral[0].native_token.denom;
            const liquidationLTV = collateral[1].collateral_details.liquidation_ltv;
            collateralTable[token] = liquidationLTV;
        });
        return collateralTable;
    }

    private async queryAllCollaterals(contractAddress: string, msg: any): Promise<any[]> {
        const data = await this.client.query(contractAddress, msg);
        return JSON.parse(data);
    }
}
