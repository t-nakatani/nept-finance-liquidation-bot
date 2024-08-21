import { ChainGrpcWasmApi, toBase64 } from "@injectivelabs/sdk-ts"
import { Network, getNetworkEndpoints } from '@injectivelabs/networks'

export class InjectiveQueryClient {
    private chainGrpcWasmApi: ChainGrpcWasmApi;

    constructor(network: Network = Network.MainnetSentry) {
        const endpoints = getNetworkEndpoints(network);
        this.chainGrpcWasmApi = new ChainGrpcWasmApi(endpoints.grpc);
    }

    async query(contractAddress: string, msg: any): Promise<string> {
        const response = await this.chainGrpcWasmApi.fetchSmartContractState(contractAddress, toBase64(msg));
        const data = new TextDecoder().decode(response.data);
        return data;
    }
}
