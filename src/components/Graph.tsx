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
  const [data, setData] = useState<ChartData[]>([])
  const [domain, setDomain] = useState<[number | string, number | string]>([
    'auto',
    'auto',
  ])
  const [activeButton, setActiveButton] = useState(0)

  useEffect(() => {
    fetchData({ relative: true, interval: 60 * 60 * 1000, index: 0 })
  }, [])

  const fetchData = async (param: fetchDataParams) => {
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
    console.log(req.startTime, req.endTime)
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
  }

  return (
    <div className="flex flex-col items-center gap-5">
      <LineChart width={1000} height={500} data={data}>
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
        <Line type="monotone" dataKey="numberOfPeople" stroke="#8884d8" />
      </LineChart>
      <GraphIntervalButtonGroup
        fetchData={fetchData}
        activeButton={activeButton}
      />
    </div>
  )
}

export default Graph
