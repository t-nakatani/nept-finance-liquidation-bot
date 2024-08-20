export type Uint256 = string;
export type Decimal256 = string;

export type NeptuneMap<K, V> = [K, V][];

export type AssetInfo = 
    | { token: { contract_addr: string } }
    | { native_token: { denom: string } };

export type AssetMap<T> = NeptuneMap<AssetInfo, T>;

export interface LiquidationAmounts {
    amount: Uint256;
    min_discount: Decimal256;
}

export interface LiquidationOperation {
    account_addr: string;
    account_index: number;
    ask_assets: AssetMap<LiquidationAmounts>;
    offer_assets: AssetMap<Uint256>;
}

// export interface ExecuteMsg {
//     Liquidate: {
//         liquidation_operations: LiquidationOperation[]
//         recipient?: string
//         tokens_sent: AssetMap<Uint256>
//     };
// }
export interface ExecuteMsg {
    account_addr: string;
    account_index: number;
    ask_assets: AssetMap<LiquidationAmounts>;
    offer_assets: AssetMap<Uint256>;
    recipient?: string;
}

export interface TxParams {
    amount: {
        denom: string;
        amount: string;
    } | {
        denom: string;
        amount: string;
    }[];
    srcInjectiveAddress: string;
    dstInjectiveAddress: string;
}
