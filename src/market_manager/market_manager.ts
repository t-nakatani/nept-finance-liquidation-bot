import { InjectiveQueryClient } from "./client";
import { Network } from "@injectivelabs/networks";
import { PriceFetcher } from "./price_fetcher";
import { CollateralFetcher } from "./collateral_fetcher";
import { AccountFetcher } from "./account_fetcher";
import { LiquidationAnalyzer } from "./liquidate_analyzer";
import { LiquidationChance } from "./types";

export class MarketManager {
    private client: InjectiveQueryClient;
    private priceFetcher: PriceFetcher;
    private collateralFetcher: CollateralFetcher;
    private accountFetcher: AccountFetcher;
    private liquidationAnalyzer: LiquidationAnalyzer;

    constructor(network: Network = Network.MainnetSentry) {
        this.client = new InjectiveQueryClient(network);
        this.priceFetcher = new PriceFetcher(this.client);
        this.collateralFetcher = new CollateralFetcher(this.client);
        this.accountFetcher = new AccountFetcher(this.client);
        this.liquidationAnalyzer = new LiquidationAnalyzer(this.priceFetcher, this.collateralFetcher);
    }

    async initialize(): Promise<void> {
        await this.priceFetcher.initialize();
        await this.collateralFetcher.initialize();
    }

    async fetchAccounts(lastAddress: string = ''): Promise<any> {
        await this.initialize();
        const accLotSize = 1000;

        const msg = { get_all_accounts: { start_after: [lastAddress, 0], limit: accLotSize } };

        const accounts = await this.accountFetcher.queryAllAccount(msg);
        const liquidationChances: LiquidationChance[] = this.liquidationAnalyzer.analyzeAccounts(accounts);
        return liquidationChances;
    }
}
