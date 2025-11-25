import { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import Loader from "../UI/Loader";
import SaveButton from "../UI/SaveButton";

function Table() {
  let { coins, currency } = useContext(CryptoContext);

  return (
    <>
      {/* <div className="flex flex-col w-full overflow-x-auto mt-9 border border-gray-100 rounded bg-cyan-600/20">
        {coins ? (
          <table className="w-full h-fit table-auto overflow-scroll">
            <thead className=" sticky capitalize text-base text-gray-500 font-medium border-b border-gray-600 scroll-">
              <tr>
                <th className="py-1 ">asset</th>
                <th className="py-1 ">name</th>
                <th className="py-1 ">price</th>
                <th className="py-1 ">total volume</th>
                <th className="py-1 ">market cap change</th>
                <th className="py-1 ">1H</th>
                <th className="py-1 ">24H</th>
                <th className="py-1 ">7D</th>
              </tr>
            </thead>
            <tbody
              className="text-center text-base border-b border-gray-100 
        last:border-b-0"
            >
              {coins.map((coin) => {
                return (
                  <tr key={coin.id} className="hover:bg-gray-900">
                    <td className="py-4 flex items-center uppercase not-first:">
                      <SaveButton coinId={coin.id} />
                      <img
                        className="w-[1.2rem] h-[1.2rem] mx-1.5"
                        src={coin.image}
                        alt={coin.name}
                      />
                      <span>
                        <Link className="cursor-pointer" to={`/${coin.id}`}>
                          {coin.symbol}
                        </Link>
                      </span>
                    </td>
                    <td className="py-4">
                      <Link className="cursor-pointer" to={`/${coin.id}`}>
                        {coin.name}
                      </Link>
                    </td>
                    <td className="py-4">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currency,
                      }).format(coin.current_price)}
                    </td>
                    <td className="py-4">{coin.total_volume}</td>
                    <td
                      className={
                        coin.market_cap_change_percentage_24h > 0
                          ? `text-green-400 py-4`
                          : `text-red-500 py-4`
                      }
                    >
                      {coin.market_cap_change_percentage_24h} %
                    </td>
                    <td
                      className={
                        coin.price_change_percentage_1h_in_currency > 0
                          ? `text-green-400 py-4`
                          : `text-red-500 py-4`
                      }
                    >
                      {Number(
                        coin.price_change_percentage_1h_in_currency
                      ).toFixed(2)}
                    </td>
                    <td
                      className={
                        coin.price_change_percentage_24h > 0
                          ? `text-green-400 py-4`
                          : `text-red-500 py-4`
                      }
                    >
                      {Number(coin.price_change_percentage_24h).toFixed(2)}
                    </td>
                    <td
                      className={
                        coin.price_change_percentage_7d_in_currency > 0
                          ? `text-green-400 py-4`
                          : `text-red-500 py-4`
                      }
                    >
                      {Number(
                        coin.price_change_percentage_7d_in_currency
                      ).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center py-6 min-h-[60vh]">
            <Loader />
          </div>
        )}
      </div> */}

      <div className="mt-9 border border-gray-100 rounded bg-cyan-600/20 w-full overflow-x-auto">
        {coins ? (
          <div className="max-h-[70vh] overflow-y-auto">
            <table className="w-full table-auto">
              {/* Sticky Header */}
              <thead className=" bg-black text-gray-400 text-sm md:text-base z-10">
                <tr>
                  <th className="py-2 text-left px-2">asset</th>
                  <th className="py-2 text-left px-2">name</th>
                  <th className="py-2 text-left px-2">price</th>
                  <th className="py-2 text-left px-2 hidden sm:table-cell">
                    total volume
                  </th>
                  <th className="py-2 text-left px-2 hidden md:table-cell">
                    market cap change
                  </th>
                  <th className="py-2 text-left px-2 hidden md:table-cell">
                    1H
                  </th>
                  <th className="py-2 text-left px-2">24H</th>
                  <th className="py-2 text-left px-2 hidden md:table-cell">
                    7D
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="text-sm md:text-base divide-y divide-gray-700">
                {coins.map((coin) => (
                  <tr
                    key={coin.id}
                    className="hover:bg-gray-900 transition-colors"
                  >
                    {/* Asset */}
                    <td className="py-3 px-2 flex items-center gap-2 uppercase">
                      <SaveButton coinId={coin.id} />
                      <img
                        className="w-5 h-5"
                        src={coin.image}
                        alt={coin.name}
                      />
                      <Link
                        to={`/${coin.id}`}
                        className="cursor-pointer hidden md:block"
                      >
                        {coin.symbol}
                      </Link>
                    </td>

                    {/* Name */}
                    <td className="py-3 px-2">
                      <Link to={`/${coin.id}`} className="cursor-pointer">
                        {coin.name}
                      </Link>
                    </td>

                    {/* Price */}
                    <td className="py-3 px-2">
                      {new Intl.NumberFormat("en-IN", {
                        style: "currency",
                        currency: currency,
                      }).format(coin.current_price)}
                    </td>

                    {/* Total Volume */}
                    <td className="py-3 px-2 hidden sm:table-cell">
                      {coin.total_volume.toLocaleString()}
                    </td>

                    {/* Market Cap Change */}
                    <td
                      className={`py-3 px-2 hidden md:table-cell ${
                        coin.market_cap_change_percentage_24h > 0
                          ? "text-green-400"
                          : "text-red-500"
                      }`}
                    >
                      {coin.market_cap_change_percentage_24h.toFixed(2)}%
                    </td>

                    {/* 1H Change */}
                    <td
                      className={`py-3 px-2 hidden md:table-cell ${
                        coin.price_change_percentage_1h_in_currency > 0
                          ? "text-green-400"
                          : "text-red-500"
                      }`}
                    >
                      {coin.price_change_percentage_1h_in_currency?.toFixed(2)}%
                    </td>

                    {/* 24H Change */}
                    <td
                      className={`py-3 px-2 ${
                        coin.price_change_percentage_24h > 0
                          ? "text-green-400"
                          : "text-red-500"
                      }`}
                    >
                      {coin.price_change_percentage_24h.toFixed(2)}%
                    </td>

                    {/* 7D Change */}
                    <td
                      className={`py-3 px-2 hidden md:table-cell ${
                        coin.price_change_percentage_7d_in_currency > 0
                          ? "text-green-400"
                          : "text-red-500"
                      }`}
                    >
                      {coin.price_change_percentage_7d_in_currency.toFixed(2)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex justify-center items-center py-6 min-h-[60vh]">
            <Loader />
          </div>
        )}
      </div>

      <div className="flex flex-col items-center justify-between mt-10 capitalize h-8">
        <span>
          Data Provided by{" "}
          <a
            className="text-cyan-300 cursor-pointer"
            href="https://www.coingecko.com/"
            target="_blank"
          >
            CoinGekko
          </a>
        </span>
        <Pagination />
      </div>
    </>
  );
}

export default Table;
