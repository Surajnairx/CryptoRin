/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { createContext, useLayoutEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CryptoContext = createContext({
  coins: [],
  searchData: [],
  getSearchData: (query) => {},
});

export default function CryptoContextProvider({ children }) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [coins, setCoins] = useState([]);
  const [searchData, setSearchData] = useState([]);

  const getCryptoData = async () => {
    const url =
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin&names=Bitcoin&symbols=btc&category=layer-1&price_change_percentage=1h%2C24%2C7d&per_page=10";
    const options = {
      method: "GET",
      headers: { "x-cg-demo-api-key": API_KEY },
      body: null,
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setCoins(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getSearchResults = async (query) => {
    const url = `https://api.coingecko.com/api/v3/search?query=${query}`;
    const options = {
      method: "GET",
      headers: { "x-cg-demo-api-key": API_KEY },
      body: undefined,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      const coins = data.coins;
      setSearchData(coins);
    } catch (error) {
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    getCryptoData();
  }, []);

  const ctxValue = {
    coins,
    searchData,
    getSearchResults,
  };

  return (
    <CryptoContext.Provider value={ctxValue}>{children}</CryptoContext.Provider>
  );
}
