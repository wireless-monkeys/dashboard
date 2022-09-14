import { DashboardServiceClient } from "../generated/dashboard-service.client";
import { GetNumberOfPeopleRequest, GetNumberOfPeopleResponse, NumberOfPeopleRow } from "../generated/dashboard-service";
import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import { useEffect, useState } from "react";
import { Timestamp } from "../generated/google/protobuf/timestamp";

interface GraphProps {
  client: DashboardServiceClient;
}

interface ChartData {
  timestamp: Number;
  numberOfPeople: Number;
}

type fetchDataParamsRelative = {
  relative: true;
  interval: number;
}
type fetchDataParamsAbsolute = {
  relative: false;
  startTime: Date;
  endTime: Date;
}
type fetchDataParams = fetchDataParamsRelative | fetchDataParamsAbsolute;

const second = 1000;
const minute = 60 * second;
const hour = 60 * minute;
const day = 24 * hour;

function Graph({ client }: GraphProps) {
  const [data, setData] = useState<ChartData[]>([])
  const [domain, setDomain] = useState<[number | string, number | string]>(['auto', 'auto'])

  const fetchData = async (param: fetchDataParams) => {
    let req: GetNumberOfPeopleRequest
    if (param.relative) {
      const now = new Date()
      const startTime = new Date(now.getTime() - param.interval)
      req = {
        startTime: Timestamp.fromDate(startTime),
        endTime: Timestamp.fromDate(now)
      }
    } else {
      req = {
        startTime: Timestamp.fromDate(param.startTime),
        endTime: Timestamp.fromDate(param.endTime)
      }
    }
    console.log(req.startTime, req.endTime)
    const { response } = await client.getNumberOfPeople(req);
    const mapped_rows = response.rows.map(({timestamp, numberOfPeople}) => {
      return {
        timestamp: Number(timestamp!.seconds * 1000n + BigInt(timestamp!.nanos / 1000000)),
        numberOfPeople: Number(numberOfPeople!),
      }
    })
    if (req.startTime!.seconds === 0n) {
      setDomain(['auto', 'auto'])
    } else {
      setDomain([Timestamp.toDate(req.startTime!).getTime(), Timestamp.toDate(req.endTime!).getTime()])
    }
    setData(mapped_rows)
  };

  return (
    <>
      <LineChart width={1000} height={500} data={data}>
        <XAxis
          dataKey="timestamp"
          domain = {domain}
          tickFormatter={(unixTime) => {
            const datetime = new Date(unixTime);
            return `${datetime.toLocaleDateString()} ${datetime.toLocaleTimeString()}`;
          }}
          tickCount = {10}
          // scale="point"
          type="number"
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="numberOfPeople"
          stroke="#8884d8"
        />
      </LineChart>
      <button onClick={() => fetchData({
        relative: true,
        interval: 1 * hour,
      })}>1h</button>
      <button onClick={() => fetchData({
        relative: true,
        interval: 6 * hour,
      })}>6h</button>
      <button onClick={() => fetchData({
        relative: true,
        interval: 12 * hour,
      })}>12h</button>
      <button onClick={() => fetchData({
        relative: true,
        interval: 1 * day,
      })}>1d</button>
      <button onClick={() => fetchData({
        relative: true,
        interval: 7 * day,
      })}>7d</button>
      <button onClick={() => {
        fetchData({
          relative: false,
          startTime: new Date(0),
          endTime: new Date(),
        })
      }}>All Time</button>
    </>
  );
}

export default Graph;
