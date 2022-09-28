import './App.css'
import { CameraFeed } from './components/CameraFeed'
import Graph from './components/Graph'

function App() {
  return (
    <div className="w-screen flex flex-col items-center gap-10 p-10">
      <h1 className="text-6xl font-bold">Dashboard</h1>
      <Graph />
      <CameraFeed />
    </div>
  )
}

export default App
