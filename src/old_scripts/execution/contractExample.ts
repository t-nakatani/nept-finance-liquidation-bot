// https://docs.ts.injective.network/core-modules/wasm#msgexecutecontract-funds-example

// いくつかのシナリオでは、スマートコントラクトの機能によって、スマートコントラクトにトークンを送金する必要があります。
// cosmwasmの慣習に従って、fundsフィールドを使用して、ユーザの銀行モジュールからスマートコントラクトにトークンを送金します。

import { MsgExecuteContract, MsgBroadcasterWithPk } from '@injectivelabs/sdk-ts'
import { INJ_DENOM } from '@injectivelabs/utils'
import { Network } from '@injectivelabs/networks'

const injectiveAddress = 'inj1...'
const contractAddress = 'cw...'

const msg = MsgExecuteContract.fromJSON({
  contractAddress,
  sender: injectiveAddress,
  exec: {
    action: 'test',
    funds: [
      {
        denom: 'inj',
        amount: new BigNumberInBase(1).toWei().toFixed(),
      },
    ],
  },
})

const txHash = await new MsgBroadcasterWithPk({
  privateKey,
  network: Network.Mainnet,
}).broadcast({
  msgs: msg,
})

console.log(txHash)
