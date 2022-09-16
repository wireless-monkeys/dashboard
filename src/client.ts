import { DashboardServiceClient } from './generated/dashboard-service.client'
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'

const transport = new GrpcWebFetchTransport({
  baseUrl: 'https://wm.suphon.dev/grpc',
})
export const client = new DashboardServiceClient(transport)
