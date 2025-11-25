import { useContext, useEffect, useState } from "react";
import githubSvg from "../assets/github-fill.svg";
import twitterSvg from "../assets/twitter-circle-filled.svg";
import redditSvg from "../assets/reddit-fill.svg";
import { createPortal } from "react-dom";
import { useNavigate, useParams } from "react-router-dom";
import { CryptoContext } from "../context/CryptoContext";
import Charts from "./Charts";
function CryptoDetails() {
  const { coinId } = useParams();
  const navigate = useNavigate();
  const { coinData: data, getCoinData, currency } = useContext(CryptoContext);

  const close = () => {
    navigate("..");
  };

  useEffect(() => {
    getCoinData(coinId);
  }, [coinId]);

  const HighLowIndicator = ({ currentPrice, high, low }) => {
    const [green, setGreen] = useState();

    useEffect(() => {
      let total = high - low;
      let greenZone = ((high - currentPrice) * 100) / total;
      setGreen(Math.ceil(greenZone));
    }, [currentPrice, high, low]);

    return (
      <>
        <span
          className="bg-red-400 h-1.5 rounded-l-lg w-[50%]"
          style={{ width: `${100 - green}%` }}
        >
          &nbsp;
        </span>
        <span
          className="bg-green-400 h-1.5 rounded-r-lg w-[50%]"
          style={{ width: `${green}` }}
        >
          &nbsp;
        </span>
      </>
    );
  };
  return createPortal(
    <div
      onClick={close}
      className="fixed top-0 w-full h-full bg-gray-600/0 backdrop-blur-sm flex items-center justify-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[90%] h-[90%] bg-gray-800/60 rounded-lg text-white relative overflow-x-scroll"
      >
        {data ? (
          <div className="flex flex-col  h-full w-full p-3">
            <div className=" flex flex-col w-full pr-2">
              <div className="flex w-full items-center">
                <img
                  className="w-12 h-12 mx-1.5 "
                  src={data.image.large}
                  alt={data.id}
                />
                <h1 className="text-xl capitalize font-medium">{data.name}</h1>
                <span className="text-sm py-0.5 px-2.5 ml-2 bg-cyan-300/30 text-cyan-300 rounded uppercase">
                  {data.symbol}
                </span>
              </div>
              <div className="flex w-full mt-6 ">
                <div className="flex flex-col w-full">
                  <div className=" flex justify-between">
                    <span className="text-sm capitalize text-stone-400">
                      Price
                    </span>

                    <div
                      className={
                        data.market_data.price_change_percentage_24h < 0
                          ? `text-sm px-1 ml-2 font-medium items-center rounded uppercase flex bg-red-700/20 text-red-500`
                          : `text-sm px-1 ml-2 font-medium items-center rounded uppercase flex bg-green-700 text-green-500`
                      }
                    >
                      <span>
                        {Number(
                          data.market_data.price_change_percentage_24h
                        ).toFixed(2)}
                        %
                      </span>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={
                          data.market_data.price_change_percentage_24h < 0
                            ? `fill-red-500`
                            : `fill-green-500 rotate-180`
                        }
                      >
                        <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                      </svg>
                    </div>
                  </div>
                  <h2 className="text-lg font-bold ">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      maximumSignificantDigits: 5,
                    }).format(data.market_data.current_price[currency])}
                  </h2>
                </div>
              </div>
              <div className="flex flex-col w-full mt-4">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-stone-400">
                    Market Cap
                  </span>
                  <h2 className="text-lg font-bold ">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      maximumSignificantDigits: 10,
                    }).format(data.market_data.market_cap[currency])}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-stone-400">
                    Fully Diluted Valuation
                  </span>
                  <h2 className="text-lg font-bold ">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      notation: "compact",
                    }).format(
                      data.market_data.fully_diluted_valuation[currency]
                    )}
                  </h2>
                </div>
              </div>
              <div className="flex flex-col w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-stone-400">
                    Total Volume
                  </span>
                  <h2 className="text-lg font-bold ">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(data.market_data.total_volume[currency])}
                  </h2>
                </div>
              </div>
              <div className="flex w-full mt-4 justify-center">
                {" "}
                <HighLowIndicator
                  currentPrice={data.market_data.current_price[currency]}
                  high={data.market_data.high_24h[currency]}
                  low={data.market_data.low_24h[currency]}
                />
              </div>
              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-stone-400">
                    Low 24H
                  </span>
                  <h2 className="text-sm font-bold ">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 5,
                    }).format(data.market_data.low_24h[currency])}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-stone-400">
                    High 24H
                  </span>
                  <h2 className="text-sm font-bold ">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 5,
                    }).format(data.market_data.high_24h[currency])}
                  </h2>
                </div>
              </div>
              <div className="flex w-full mt-4 justify-between">
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-stone-400">
                    Max Supply
                  </span>
                  <h2 className="text-sm font-bold ">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(data.market_data.max_supply)}
                  </h2>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm capitalize text-stone-400">
                    Circulating Supply
                  </span>
                  <h2 className="text-sm font-bold ">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                      minimumFractionDigits: 0,
                    }).format(data.market_data.circulating_supply)}
                  </h2>
                </div>
              </div>
              <div className="flex flex-col w-full mt-4 justify-between">
                <div className="flex flex-col w-full justify-center items-center">
                  <a
                    className="text-sm bg-gray-600/40 text-gray-300 px-1.5 py-0.5 rounded my-1 w-full text-center"
                    href={data?.links.homepage[0]}
                    target="_blank"
                  >
                    {data?.links.homepage[0]}
                  </a>
                  <a
                    className="text-sm bg-gray-600/40 text-gray-300 px-1.5 py-0.5 rounded my-1 w-full text-center"
                    href={data?.links.blockchain_site[2]}
                    target="_blank"
                  >
                    {data?.links.blockchain_site[2]?.substring(0, 26)}
                  </a>
                </div>
                <div className="flex flex-col content-start">
                  <h1>Sentiment</h1>
                  <div className="text-sm px-1 my-1 ml-2 font-medium items-center rounded uppercase flex bg-green-800 text-green-500">
                    <span>
                      {Number(data.sentiment_votes_up_percentage).toFixed(2)}%
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-green-500 rotate-180"
                    >
                      <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                    </svg>
                  </div>
                  <div className="text-sm px-1 my-1 ml-2 font-medium items-center rounded uppercase flex bg-red-700/20 text-red-500">
                    <span>
                      {Number(data.sentiment_votes_down_percentage).toFixed(2)}%
                    </span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="fill-red-500"
                    >
                      <path d="M7.47951 11.4153C7.42599 11.493 7.35438 11.5565 7.27085 11.6004C7.18732 11.6444 7.09437 11.6673 7.00001 11.6673C6.90564 11.6673 6.81269 11.6444 6.72916 11.6004C6.64563 11.5565 6.57402 11.493 6.52051 11.4153L1.27051 3.83194C1.20974 3.74447 1.1741 3.64202 1.16747 3.53572C1.16084 3.42943 1.18346 3.32334 1.23289 3.229C1.28232 3.13466 1.35665 3.05567 1.44782 3.0006C1.53899 2.94554 1.6435 2.91652 1.75001 2.91669H12.25C12.3563 2.91713 12.4604 2.94652 12.5512 3.00172C12.642 3.05691 12.716 3.13581 12.7653 3.22993C12.8147 3.32406 12.8374 3.42984 12.8311 3.53591C12.8247 3.64199 12.7896 3.74433 12.7295 3.83194L7.47951 11.4153Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-full pl-3 ">
              <Charts id={data.id} />
              <div className="flex flex-col mt-8">
                <h3 className="text-white py-1 text-center">
                  <span className="text-gray-100 capitalize mr-1">
                    Market Cap Rank : {data.market_cap_rank}
                  </span>
                </h3>
              </div>
            </div>
            <div className="flex justify-center gap-7">
              {data ? (
                <>
                  <a
                    href={data.links.repos_url.github[0]}
                    target="_blank"
                    className="text-sm bg-gray-600/40 text-gray-800 px-1.5 py-0.5 rounded my-1"
                  >
                    <img className="h-7 m-1" src={githubSvg} alt="" srcset="" />
                  </a>
                  <a
                    className="text-sm bg-gray-600/40 text-gray-800 px-1.5 py-0.5 rounded my-1"
                    href={`https://twitter.com/4${data.links.twitter_screen_name}`}
                  >
                    <img className="h-7 m-1" src={twitterSvg} alt="" />
                  </a>
                  <a
                    className="text-sm bg-gray-600/40 text-gray-800 px-1.5 py-0.5 rounded my-1"
                    href={data.links.subreddit_url}
                  >
                    <img className="h-7 m-1" src={redditSvg} alt="" />
                  </a>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </div>,

    document.getElementById("modal")
  );
}

export default CryptoDetails;
