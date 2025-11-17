import React, { useContext, useLayoutEffect, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CryptoContext } from "../context/CryptoContext";

// #region Sample data
// const data = [
//   {
//     name: "Page A",
//     uv: 400,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: "Page B",
//     uv: 300,
//     pv: 4567,
//     amt: 2400,
//   },
//   {
//     name: "Page C",
//     uv: 320,
//     pv: 1398,
//     amt: 2400,
//   },
//   {
//     name: "Page D",
//     uv: 200,
//     pv: 9800,
//     amt: 2400,
//   },
//   {
//     name: "Page E",
//     uv: 278,
//     pv: 3908,
//     amt: 2400,
//   },
//   {
//     name: "Page F",
//     uv: 189,
//     pv: 4800,
//     amt: 2400,
//   },
// ];

const ChartComponent = ({ data, currency }) => {
  function CustomTooltip({ payload, label, active, currency = "usd" }) {
    if (active && payload && payload.length) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "transparent",
            padding: "7px",
            borderRadius: "5px",
          }}
        >
          <p
            className="label text-sm"
            style={{ margin: "0", fontWeight: "700", color: "cyan" }}
          >{`${label} : ${new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: currency,
            minimumFractionDigits: 5,
          }).format(payload[0].value)}`}</p>
        </div>
      );
    }

    return null;
  }

  return (
    <LineChart
      style={{ width: "100%", aspectRatio: 1.618, maxWidth: 600 }}
      responsive
      data={data}
      margin={{
        top: 20,
        right: 20,
        bottom: 5,
        left: 0,
      }}
    >
      <CartesianGrid stroke="grey" />
      <Line
        type="monotone"
        dataKey="prices"
        stroke="cyan"
        strokeWidth={1}
        name="prices"
      />
      <XAxis dataKey="date" hide />
      <YAxis
        name="Prices"
        dataKey="prices"
        domain={["auto", "auto"]}
        width="auto"
        hide
        label={{ value: "prices", position: "insideLeft", angle: -90 }}
      />
      <Tooltip
        content={CustomTooltip}
        defaultIndex={2}
        currency={currency}
        cursor={false}
      />
      <Legend />
    </LineChart>
  );
};

function Charts({ id }) {
  const [chatData, setChartData] = useState();
  const { currency } = useContext(CryptoContext);
  const API_KEY = import.meta.env.VITE_API_KEY;
  useLayoutEffect(() => {
    const getChatData = async () => {
      const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily`;
      const options = {
        method: "GET",
        headers: { "x-cg-demo-api-key": API_KEY },
        body: undefined,
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        const convertedData = data.prices.map((item) => {
          return {
            date: new Date(item[0]).toLocaleDateString(),
            prices: item[1],
          };
        });
        console.log(convertedData);
        setChartData(convertedData);
      } catch (error) {
        console.error(error);
      }
    };
    getChatData(id);
  }, [id]);
  return (
    <div>
      <ChartComponent data={chatData} currency={currency} />
    </div>
  );
}

export default Charts;
