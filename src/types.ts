export interface NativeToken {
  denom: string;
  // 他の必要なプロパティがあればここに追加
}

export interface AccountTuple {
    0: [string, number]; // 'inj...'のアドレスと0
    1: Account;   // 詳細データを持つオブジェクト
}

export interface PoolAccountKey {
  native_token: NativeToken;
}

export interface PoolAccount {
  principal: string;
  shares: string;
}

export interface Account {
  last_tx_height: number;
  debt_pool_accounts: [PoolAccountKey, PoolAccount][];
  collateral_pool_accounts: [PoolAccountKey, PoolAccount][];
}
