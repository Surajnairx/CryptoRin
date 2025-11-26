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

const ChartComponent = ({ data, currency, type }) => {
  function CustomTooltip({ payload, label, active, currency = "usd" }) {
    if (active && payload && payload.length > 0) {
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
            style={{ fontWeight: "700", color: "cyan" }}
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
        left: 20,
      }}
    >
      <CartesianGrid stroke="grey" />
      <Line
        type="monotone"
        dataKey={type}
        stroke="cyan"
        strokeWidth={1}
        name="prices"
      />
      <XAxis dataKey="date" hide />
      <YAxis
        name="Prices"
        dataKey={type}
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
  //for the price / market cap / total volume
  const [type, setType] = useState("prices");
  const [days, setDays] = useState(7);
  const API_KEY = import.meta.env.VITE_API_KEY;
  useLayoutEffect(() => {
    const getChatData = async () => {
      const url = `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=daily`;
      const options = {
        method: "GET",
        headers: { "x-cg-demo-api-key": API_KEY },
        body: undefined,
      };

      try {
        const response = await fetch(url, options);
        const data = await response.json();

        const convertedData = data[type].map((item) => {
          return {
            date: new Date(item[0]).toLocaleDateString(),
            [type]: item[1],
          };
        });

        setChartData(convertedData);
      } catch (error) {
        console.error(error);
      }
    };
    getChatData(id);
  }, [id, type, days]);
  return (
    <div className="">
      <ChartComponent data={chatData} currency={currency} type={type} />
      <div className="flex gap-1">
        <div className="border p-2 rounded flex flex-col gap-2 w-full">
          <h1 className="text-center">Values</h1>
          <button
            className={`text-sm py-0.5 px-1.5 ml-2 cursor-pointer rounded ${
              type === "prices"
                ? "bg-cyan-300 text-black"
                : "bg-cyan-200/20 text-white "
            }`}
            onClick={() => setType("prices")}
          >
            Price
          </button>
          <button
            className={`text-sm py-0.5 px-1.5 ml-2 cursor-pointer rounded ${
              type === "market_caps"
                ? "bg-cyan-300 text-black"
                : "bg-cyan-200/20 text-white"
            }`}
            onClick={() => setType("market_caps")}
          >
            Market Cap
          </button>
          <button
            className={`text-sm py-0.5 px-1.5 ml-2 cursor-pointer rounded ${
              type === "total_volumes"
                ? "bg-cyan-300 text-black"
                : "bg-cyan-200/20 text-white"
            }`}
            onClick={() => setType("total_volumes")}
          >
            Total Volume
          </button>
        </div>

        <div className="border p-2 rounded flex flex-col gap-2  w-full">
          <h1 className="text-center">Time</h1>
          <button
            className={`text-sm py-0.5 px-1.5 ml-2 cursor-pointer rounded ${
              days === 7
                ? "bg-cyan-300 text-black"
                : "bg-cyan-200/20 text-white"
            }`}
            onClick={() => {
              setDays(7);
            }}
          >
            7D
          </button>
          <button
            className={`text-sm py-0.5 px-1.5 ml-2 cursor-pointer rounded ${
              days === 14
                ? "bg-cyan-300 text-black"
                : "bg-cyan-200/20 text-white "
            }`}
            onClick={() => {
              setDays(14);
            }}
          >
            14D
          </button>
          <button
            className={`text-sm py-0.5 px-1.5 ml-2 cursor-pointer rounded ${
              days === 30
                ? "bg-cyan-300 text-black"
                : "bg-cyan-200/20 text-white"
            }`}
            onClick={() => {
              setDays(30);
            }}
          >
            30D
          </button>
        </div>
      </div>
    </div>
  );
}

export default Charts;
