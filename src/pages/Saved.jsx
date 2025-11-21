import { useContext, useEffect } from "react";
import { StoreContext } from "../context/StoreContext";
import { CryptoContext } from "../context/CryptoContext";
import { Link, Outlet, useNavigate } from "react-router-dom";

function Saved() {
  const { savedCoin, getSavedData, savedData } = useContext(StoreContext);
  const { currency } = useContext(CryptoContext);
  const navigate = useNavigate();
  const getCoinDetails = (id) => {
    navigate(id);
  };

  useEffect(() => {
    const idsString = savedCoin.join(",");
    console.log(idsString);
    getSavedData(idsString);
  }, [savedCoin]);
  return (
    <div className="w-full px-20 py-6">
      {console.log(savedData)}
      <div className="flex flex-col mt-9 border border-gray-100 rounded bg-cyan-600/20">
        {savedData ? (
          <table className="w-full table-auto">
            <thead className=" capitalize text-base text-gray-500 font-medium border-b border-gray-600">
              <tr>
                <th className="py-1 ">asset</th>
                <th className="py-1 ">name</th>
                <th className="py-1 ">price</th>
                <th className="py-1 ">total volume</th>
                <th className="py-1 ">market cap change</th>
                <th className="py-1 ">24H</th>
              </tr>
            </thead>
            <tbody
              className="text-center text-base border-b border-gray-100 
        last:border-b-0"
            >
              {savedData.map((coin) => {
                return (
                  <tr
                    key={coin.id}
                    className="hover:bg-gray-900"
                    onClick={() => getCoinDetails(coin.id)}
                  >
                    <td className="py-4 flex items-center justify-center uppercase not-first:">
                      <img
                        className="w-[1.2rem] h-[1.2rem] mx-1.5"
                        src={coin.image}
                        alt={coin.name}
                      />
                      <span>
                        <div className="cursor-pointer" to={`/${coin.id}`}>
                          {coin.symbol}
                        </div>
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="cursor-pointer" to={`/${coin.id}`}>
                        {coin.name}
                      </div>
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
                        coin.price_change_percentage_24h > 0
                          ? `text-green-400 py-4`
                          : `text-red-500 py-4`
                      }
                    >
                      {Number(coin.price_change_percentage_24h).toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>
      <Outlet />
    </div>
  );
}

export default Saved;
