import { DashboardServiceClient } from '../generated/dashboard-service.client'
import { GetNumberOfPeopleRequest } from '../generated/dashboard-service'
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  CartesianGrid,
} from 'recharts'
import { useEffect, useState } from 'react'
import { ImSpinner2 } from 'react-icons/im'
import { IoRefresh } from 'react-icons/io5'
import { Timestamp } from '../generated/google/protobuf/timestamp'
import GraphIntervalButtonGroup from './GraphIntervalButtonGroup'

interface GraphProps {
  client: DashboardServiceClient
}

interface ChartData {
  timestamp: Number
  numberOfPeople: Number
}

type fetchDataParamsRelative = {
  relative: true
  interval: number
  index: number
}
type fetchDataParamsAbsolute = {
  relative: false
  startTime: Date
  endTime: Date
}
export type fetchDataParams = fetchDataParamsRelative | fetchDataParamsAbsolute

function Graph({ client }: GraphProps) {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ChartData[]>([])
  const [domain, setDomain] = useState<[number | string, number | string]>([
    'auto',
    'auto',
  ])
  const [activeButton, setActiveButton] = useState(0)
  const [latestParams, setLatestParams] = useState<fetchDataParams>({
    relative: true,
    interval: 60 * 60 * 1000,
    index: 0,
  })

  useEffect(() => {
    fetchData(latestParams)
  }, [])

  const fetchData = async (param: fetchDataParams) => {
    setLoading(true)
    let req: GetNumberOfPeopleRequest
    if (param.relative) {
      const now = new Date()
      const startTime = new Date(now.getTime() - param.interval)
      req = {
        startTime: Timestamp.fromDate(startTime),
        endTime: Timestamp.fromDate(now),
      }
      setActiveButton(param.index)
    } else {
      req = {
        startTime: Timestamp.fromDate(param.startTime),
        endTime: Timestamp.fromDate(param.endTime),
      }
    }
    const { response } = await client.getNumberOfPeople(req)
    const mapped_rows = response.rows.map(({ timestamp, numberOfPeople }) => {
      return {
        timestamp: Number(
          timestamp!.seconds * 1000n + BigInt(timestamp!.nanos / 1000000)
        ),
        numberOfPeople: Number(numberOfPeople!),
      }
    })
    if (req.startTime!.seconds === 0n) {
      setDomain(['auto', 'auto'])
    } else {
      setDomain([
        Timestamp.toDate(req.startTime!).getTime(),
        Timestamp.toDate(req.endTime!).getTime(),
      ])
    }
    setData(mapped_rows)
    setLatestParams(param)
    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-row gap-2 self-end">
        <GraphIntervalButtonGroup
          fetchData={fetchData}
          activeButton={activeButton}
        />
        <button
          className="btn"
          onClick={() => {
            fetchData(latestParams)
          }}>
          <IoRefresh />
        </button>
      </div>
      <div className="grid justify-items-center items-center">
        {loading ? (
          <ImSpinner2
            className="animate-spin row-start-1 col-start-1"
            size={50}
          />
        ) : null}
        <LineChart
          className={`row-start-1 col-start-1 margin-0 ${
            loading ? 'opacity-50' : ''
          }`}
          width={1000}
          height={500}
          data={data}>
          <XAxis
            dataKey="timestamp"
            domain={domain}
            tickFormatter={(unixTime) => {
              const datetime = new Date(unixTime)
              return `${datetime.toLocaleDateString()} ${datetime.toLocaleTimeString()}`
            }}
            tickCount={10}
            type="number"
          />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="linear" dataKey="numberOfPeople" stroke="#8884d8" />
        </LineChart>
      </div>
    </div>
  )
}

export default Graph
