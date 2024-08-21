import { InjectiveQueryClient } from "./client";
import { marketContract } from "../constants/address";
import { AccountTuple } from "./types";

export class AccountFetcher {
    private client: InjectiveQueryClient;

    constructor(client: InjectiveQueryClient) {
        this.client = client;
    }

    async queryAllAccount(msg: any): Promise<AccountTuple[]> {
        const data = await this.client.query(marketContract, msg);
        const accounts: AccountTuple[] = JSON.parse(data);
        return accounts;
    }
}
