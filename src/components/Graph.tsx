import { GetNumberOfPeopleRequest } from '../generated/dashboard-service'
import { formatRFC7231, formatISO9075 } from 'date-fns'
import { LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts'
import { useEffect, useState } from 'react'
import { ImSpinner2 } from 'react-icons/im'
import { IoRefresh } from 'react-icons/io5'
import { Timestamp } from '../generated/google/protobuf/timestamp'
import GraphIntervalButtonGroup from './GraphIntervalButtonGroup'
import { client } from '../client'

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

type AxisDomain = [number | string, number | string]

function Graph() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ChartData[]>([])
  const [xdomain, setXDomain] = useState<AxisDomain>(['auto', 'auto'])
  const [ydomain, setYDomain] = useState<AxisDomain>(['auto', 'auto'])
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
      setXDomain(['auto', 'auto'])
    } else {
      setXDomain([
        Timestamp.toDate(req.startTime!).getTime(),
        Timestamp.toDate(req.endTime!).getTime(),
      ])
    }
    const max_y = Math.max(...mapped_rows.map((row) => row.numberOfPeople))
    if (max_y < 20) {
      setYDomain([0, 10])
    } else {
      setYDomain([0, 'auto'])
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
            domain={xdomain}
            tickFormatter={(unixTime) => {
              const datetime = new Date(unixTime)
              if (isNaN(datetime.getTime())) {
                return ''
              }
              return formatISO9075(datetime)
            }}
            type="number"
          />
          <YAxis domain={ydomain} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line
            name="Number of people"
            type="linear"
            dataKey="numberOfPeople"
            stroke="#8884d8"
          />
        </LineChart>
      </div>
    </div>
  )
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const { numberOfPeople, timestamp } = payload[0].payload
    const datetime = new Date(timestamp)
    return (
      <div className="card bg-base-100">
        <div className="card-body items-center text-center">
          <p>{formatRFC7231(datetime)}</p>
          <p className="text-primary">{`People: ${numberOfPeople}`}</p>
        </div>
      </div>
    )
  }
  return null
}

export default Graph
