import { createContext, useLayoutEffect, useState } from "react";

export const CryptoContext = createContext({
  coins: [],
});

export default function CryptoContextProvider({ children }) {
  const [coins, setCoins] = useState([]);

  const url =
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h%2C24%2C7d&per_page=10";
  const options = {
    method: "GET",
    headers: { "x-cg-demo-api-key": "CG-62Zikz6EnrxwDGuV1ZJoetDN" },
    body: null,
  };

  const getCryptoData = async () => {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setCoins(data);
    } catch (err) {
      console.error(err);
    }
  };

  useLayoutEffect(() => {
    getCryptoData();
  }, []);

  const ctxValue = {
    coins: coins,
  };

  return (
    <CryptoContext.Provider value={ctxValue}>{children}</CryptoContext.Provider>
  );
}
