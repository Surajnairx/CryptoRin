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
    // <div className="w-full h-screen px-3 py-6">
    //   {savedData.length > 0 ? (
    //     <div className="flex flex-col mt-9 border border-gray-100 rounded bg-cyan-600/20">
    //       <table className="w-full table-auto">
    //         <thead className=" capitalize text-base text-gray-500 font-medium border-b border-gray-600">
    //           <tr>
    //             <th className="py-1 ">asset</th>
    //             <th className="py-1 ">name</th>
    //             <th className="py-1 ">price</th>
    //             <th className="py-1 ">total volume</th>
    //             <th className="py-1 ">market cap change</th>
    //             <th className="py-1 ">24H</th>
    //           </tr>
    //         </thead>
    //         <tbody
    //           className="text-center text-base border-b border-gray-100
    //     last:border-b-0"
    //         >
    //           {savedData.map((coin) => {
    //             return (
    //               <tr
    //                 key={coin.id}
    //                 className="hover:bg-gray-900"
    //                 onClick={() => getCoinDetails(coin.id)}
    //               >
    //                 <td className="py-4 flex items-center justify-center uppercase not-first:">
    //                   <img
    //                     className="w-[1.2rem] h-[1.2rem] mx-1.5"
    //                     src={coin.image}
    //                     alt={coin.name}
    //                   />
    //                   <span>
    //                     <div className="cursor-pointer" to={`/${coin.id}`}>
    //                       {coin.symbol}
    //                     </div>
    //                   </span>
    //                 </td>
    //                 <td className="py-4">
    //                   <div className="cursor-pointer" to={`/${coin.id}`}>
    //                     {coin.name}
    //                   </div>
    //                 </td>
    //                 <td className="py-4">
    //                   {new Intl.NumberFormat("en-IN", {
    //                     style: "currency",
    //                     currency: currency,
    //                   }).format(coin.current_price)}
    //                 </td>
    //                 <td className="py-4">{coin.total_volume}</td>
    //                 <td
    //                   className={
    //                     coin.market_cap_change_percentage_24h > 0
    //                       ? `text-green-400 py-4`
    //                       : `text-red-500 py-4`
    //                   }
    //                 >
    //                   {coin.market_cap_change_percentage_24h} %
    //                 </td>

    //                 <td
    //                   className={
    //                     coin.price_change_percentage_24h > 0
    //                       ? `text-green-400 py-4`
    //                       : `text-red-500 py-4`
    //                   }
    //                 >
    //                   {Number(coin.price_change_percentage_24h).toFixed(2)}
    //                 </td>
    //               </tr>
    //             );
    //           })}
    //         </tbody>
    //       </table>
    //     </div>
    //   ) : (
    //     <div className="h-[60vh] flex flex-col items-center justify-center text-center">
    //       <div className="bg-cyan-400/10 border border-cyan-400/30 rounded-2xl p-10 shadow-md max-w-md">
    //         <h1 className="text-2xl font-semibold text-cyan-300 mb-2">
    //           No Coins Saved
    //         </h1>
    //         <p className="text-gray-400 text-sm">
    //           Start adding your favorite coins to track them here.
    //         </p>
    //       </div>
    //     </div>
    //   )}

    //   <Outlet />
    // </div>
    <div className="w-full min-h-screen max-w-[80%] px-10 py-6">
      {savedData.length > 0 ? (
        <div className="mt-6 border border-gray-700 rounded bg-cyan-600/10 overflow-x-auto">
          <table className="w-full table-auto min-w-[650px]">
            <thead className="text-gray-400 text-sm border-b border-gray-700">
              <tr>
                <th className="py-2 px-2 text-left">Asset</th>
                <th className="py-2 px-2 text-left">Name</th>
                <th className="py-2 px-2 text-left">Price</th>
                <th className="py-2 px-2 text-left">Volume</th>
                <th className="py-2 px-2 text-left">M.Cap %</th>
                <th className="py-2 px-2 text-left">24H</th>
              </tr>
            </thead>

            <tbody className="text-sm border-gray-700">
              {savedData.map((coin) => (
                <tr
                  key={coin.id}
                  className="hover:bg-gray-900/40 transition cursor-pointer"
                  onClick={() => getCoinDetails(coin.id)}
                >
                  <td className="py-3 px-2 flex items-center gap-2 uppercase">
                    <img className="w-5 h-5" src={coin.image} alt={coin.name} />
                    {coin.symbol}
                  </td>

                  <td className="py-3 px-2">{coin.name}</td>

                  <td className="py-3 px-2">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: currency,
                    }).format(coin.current_price)}
                  </td>

                  <td className="py-3 px-2">{coin.total_volume}</td>

                  <td
                    className={`py-3 px-2 ${
                      coin.market_cap_change_percentage_24h > 0
                        ? "text-green-400"
                        : "text-red-500"
                    }`}
                  >
                    {coin.market_cap_change_percentage_24h}%
                  </td>

                  <td
                    className={`py-3 px-2 ${
                      coin.price_change_percentage_24h > 0
                        ? "text-green-400"
                        : "text-red-500"
                    }`}
                  >
                    {Number(coin.price_change_percentage_24h).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <div className="bg-cyan-400/10 border border-cyan-400/30 rounded-2xl p-8 shadow-md max-w-sm w-full">
            <h1 className="text-xl font-semibold text-cyan-300 mb-2">
              No Coins Saved
            </h1>
            <p className="text-gray-400 text-sm">
              Start adding your favorite coins to track them here.
            </p>
          </div>
        </div>
      )}

      <Outlet />
    </div>
  );
}

export default Saved;
