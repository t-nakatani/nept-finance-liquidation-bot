import { MarketManager } from "./market_manager";
import { Network } from "@injectivelabs/networks";

async function main() {
  const manager = new MarketManager(Network.MainnetSentry);
  await manager.fetchAccounts();
}

main().catch(console.error);
