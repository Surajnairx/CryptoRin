import { createContext, useEffect, useState } from "react";

export const TrendingContext = createContext({
  coins: [],
});

export default function TrendingContextProvider({ children }) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [coins, setCoins] = useState([]);

  const getTrendingResults = async () => {
    const url = "https://api.coingecko.com/api/v3/search/trending";
    const options = {
      method: "GET",
      headers: { "x-cg-demo-api-key": API_KEY },
      body: undefined,
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      setCoins(data.coins);
    } catch (error) {
      console.error(error);
    }
  };

  const ctxValue = {
    coins,
  };
  useEffect(() => {
    getTrendingResults();
  }, []);

  return (
    <TrendingContext.Provider value={ctxValue}>
      {children}
    </TrendingContext.Provider>
  );
}
