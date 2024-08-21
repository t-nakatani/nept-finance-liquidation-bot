import { TxListener } from "./tx_manager/tx_listener";
import { MarketManager } from "./market_manager/market_manager";
import { LiquidateEngine } from "./liquidator/liquidator";
import { TxGenerator } from "./tx_manager/tx_generator";
import { marketContract } from "./constants/address";
import { AssetInfo } from "./liquidator/types";

function getMarketInfoExample() {
    const target_account_addr = 'inj...'
    const account_index = 0
    const tokenIn: AssetInfo = { native_token: { denom: 'inj' } }
    const amountIn = '1'
    const token_out: AssetInfo = { native_token: { denom: 'inj' } }
    const amount_out = '1'
    const min_discount = '10'
    return [target_account_addr, account_index, tokenIn, amountIn, token_out, amount_out, min_discount]
}

async function main() {
    const txListener = new TxListener();
    const marketManager = new MarketManager();
    const liquidateEngine = new LiquidateEngine();
    const txGenerator = new TxGenerator();

  txListener.on("targetFound", async (tx) => {
    console.log('============== Found Tx ==============')
    console.log(tx)
    try {
      const firstAccount = ''
      const targetAccountsData = await marketManager.fetchAccounts(firstAccount);
      console.log(targetAccountsData)

      const [
        target_account_addr,
        account_index,
        tokenIn,
        amountIn,
        token_out,
        amount_out,
        min_discount
    ] = getMarketInfoExample();

    const actionMsg = liquidateEngine.createLiquidateOperation(
        target_account_addr,
        account_index,
        tokenIn,
        amountIn,
        token_out,
        amount_out,
        min_discount
    );

    await txGenerator.generateTx(tokenIn, amountIn, marketContract, 'liquidate', actionMsg);

    } catch (error) {
      console.error("Error in liquidation process:", error);
    }
  });

  console.log("Starting to listen for transactions...");
  txListener.startListening();
}

main().catch((error) => console.error("Main program error:", error));
