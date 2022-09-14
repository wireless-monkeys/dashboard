import './App.css'
import { DashboardServiceClient } from './generated/dashboard-service.client'
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'
import Graph from './components/Graph'

function App() {
  const transport = new GrpcWebFetchTransport({
    baseUrl: 'https://wm.suphon.dev/grpc',
  })
  const client = new DashboardServiceClient(transport)
  return (
    <div className="w-screen m-4 flex flex-col items-center gap-7">
      <h1 className="text-6xl font-bold">Dashboard</h1>
      <Graph client={client} />
    </div>
  )
}

export default App
