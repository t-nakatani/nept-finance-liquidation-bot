import { ChainGrpcWasmApi } from '@injectivelabs/sdk-ts'
import { Network, getNetworkEndpoints } from '@injectivelabs/networks'

export const NETWORK = Network.MainnetSentry
export const ENDPOINTS = getNetworkEndpoints(NETWORK)

export const chainGrpcWasmApi = new ChainGrpcWasmApi(ENDPOINTS.grpc)