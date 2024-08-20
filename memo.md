## memo

Liquidation tx
https://explorer.injective.network/transaction/151e28cde15e0db70dbff7dd412b4db93eb2aa8981dc06d0bd65342cb810ef9e/event-logs/

My liquidated tx (from https://app.nept.finance/txs/)
https://explorer.injective.network/transaction/151e28cde15e0db70dbff7dd412b4db93eb2aa8981dc06d0bd65342cb810ef9e/

上の精算txは自作コントラクトでneptune financeのMarketコントラクトを叩いている模様。

### アーキテクチャ所感
最初からアーキテクチャこだわるのは博打。

精算botにおいて本質的なのは、collateralとdebtの価値とhealthの算出・精算対象の絞り込み・精算方法の導出らへんかな。

tokenの表現方法は本質的でないので、抽象的なtokenという概念から本質的なhealth等の算出はいい感じにインターフェイスを噛ませて、ブロックチェーンごとに差し替えるとか良さそう。


### example request structure
```
{
    "ask_assets": [ [ { "token": { "contract_addr": "inj1cy9hes20vww2yr6crvs75gxy5hpycya2hmjg9s" } }, { "amount": "12050", "min_discount": "0" } ] ],
    "offer_assets": [ [ { "native_token": { "denom": "ibc/C4CFF46FD6DE35CA4CF4CE031E643C8FDC9BA4B99AE598E9B0ED98FE3A2319F9" } }, "2029" ] ]
}
```