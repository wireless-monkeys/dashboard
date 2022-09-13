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

interface GraphProps {
  client: DashboardServiceClient;
}

interface ChartData {
  timestamp: Number;
  numberOfPeople: Number;
}

function Graph({ client }: GraphProps) {
  const [data, setData] = useState<ChartData[]>([])

  const fetchData = async () => {
    const req: GetNumberOfPeopleRequest = {
      startTime: {
        seconds: BigInt(0),
        nanos: 0,
      },
      endTime: {
        seconds: BigInt(2000000000),
        nanos: 0,
      },
    };
    const { response } = await client.getNumberOfPeople(req);
    const mapped_rows = response.rows.map(({timestamp, numberOfPeople}) => {
      return {
        timestamp: Number(timestamp!.seconds * 1000n),
        numberOfPeople: Number(numberOfPeople!),
      }
    })
    setData(mapped_rows)
    console.log(data)
  };

  return (
    <>
      <LineChart width={1000} height={500} data={data}>
        <XAxis
          dataKey="timestamp"
          domain = {['auto', 'auto']}
          tickFormatter={(unixTime) => {
            const datetime = new Date(unixTime);
            return `${datetime.toLocaleDateString()} ${datetime.toLocaleTimeString()}`;
          }}
          type="number"
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="numberOfPeople"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
      </LineChart>
      <button onClick={fetchData}>Fetch Data</button>
    </>
  );
}

export default Graph;
