import { useContext } from "react";
import { TrendingContext } from "../context/TrendingContext";
import TrendingCoin from "../components/TrendingCoin";
import { Outlet } from "react-router-dom";

function Trending() {
  const { coins } = useContext(TrendingContext);
  return (
    <div className="w-[80%] h-full  flex flex-col mt-9 mb-24 relative">
      <div className="flex flex-col md:flex-row md:flex-wrap min-h-[60vh] px-10 py-5 justify-evenly mt-9 border border-gray-100  rounded">
        {coins &&
          coins.map((coin) => <TrendingCoin key={coin.id} coin={coin.item} />)}
      </div>
      {console.log(coins)}
      <Outlet />
    </div>
  );
}

export default Trending;
