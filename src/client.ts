import { toBase64 } from "@injectivelabs/sdk-ts"
import { chainGrpcWasmApi } from "./services"

export async function query(contractAddress: string, msg): Promise<string> {
    const response = await chainGrpcWasmApi.fetchSmartContractState(contractAddress, toBase64(msg))
    const data = new TextDecoder().decode(response.data)
    return data
}