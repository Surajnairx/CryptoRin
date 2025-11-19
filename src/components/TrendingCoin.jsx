import { useNavigate } from "react-router-dom";

function TrendingCoin({ coin }) {
  const navigate = useNavigate();
  const getCoinDetails = (id) => {
    navigate(id);
  };
  return (
    <div
      className="w-[40%] bg-cyan-600/20 mb-12 last:mb-0 rounded-lg p-4 cursor-pointer relative hover:bg-gray-500/60"
      onClick={() => getCoinDetails(coin.id)}
    >
      {coin ? (
        <>
          <h3 className="text-base flex items-center my-0.5">
            <span className="text-cyan-300 capitalize">{coin.name}</span>
          </h3>
          <h3 className="text-base flex items-center my-0.5">
            <span>Market Cap Rank: &nbsp;</span>
            <span className="text-cyan-300 capitalize">
              {coin.market_cap_rank}
            </span>
          </h3>
          <h3 className="text-base flex items-center my-0.5">
            <span>Price: &nbsp;</span>
            <span className="text-cyan-300 capitalize">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "btc",
                maximumSignificantDigits: 5,
              }).format(coin.price_btc)}
            </span>
          </h3>

          <h3 className="text-base flex items-center my-0.5">
            <span>Score: &nbsp;</span>
            <span className="text-cyan-300 capitalize">{coin.score}</span>
          </h3>

          <img
            className="w-[35%] h-auto rounded-full absolute top-2/4 -right-12 -translate-y-2/4 "
            src={coin.large}
            alt={coin.name}
          />
        </>
      ) : null}
    </div>
  );
}

export default TrendingCoin;
