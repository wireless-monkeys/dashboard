import './App.css'
import Graph from './components/Graph'

function App() {
  return (
    <div className="w-screen flex flex-col items-center gap-10 p-10">
      <h1 className="text-6xl font-bold">Dashboard</h1>
      <Graph />
    </div>
  )
}

export default App
