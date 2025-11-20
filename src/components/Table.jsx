import { useContext } from "react";
import { CryptoContext } from "../context/CryptoContext";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import SaveButton from "../UI/SaveButton";

function Table() {
  let { coins, currency } = useContext(CryptoContext);

  return (
    <>
      <div className="flex flex-col mt-9 border border-gray-100 rounded bg-cyan-600/20">
        {coins ? (
          <table className="w-full table-auto">
            <thead className=" capitalize text-base text-gray-500 font-medium border-b border-gray-600">
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
        ) : null}
      </div>

      <div className="flex items-center justify-between mt-4 capitalize h-8">
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
