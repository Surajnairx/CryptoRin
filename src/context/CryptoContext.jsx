/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CryptoContext = createContext({
  coins: [],
  searchData: [],
  sortBy: "",
  setCoinResult: () => {},
  getSearchData: (query) => {},
  setCurrency: () => {},
  setSortBy: () => {},
});

export default function CryptoContextProvider({ children }) {
  const API_KEY = import.meta.env.VITE_API_KEY;
  const [coins, setCoins] = useState([]);
  const [searchData, setSearchData] = useState();
  const [coinResult, setCoinResult] = useState("");
  const [currency, setCurrency] = useState("usd");
  const [sortBy, setSortBy] = useState("market_cap_desc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(250);
  const [perPage, setPerPage] = useState(7);

  const getCryptoData = async () => {
    try {
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=${coinResult}&price_change_percentage=1h,24h,7d&per_page=${perPage}&order=${sortBy}&page=${currentPage}`;

      const options = {
        method: "GET",
        headers: { "x-cg-demo-api-key": API_KEY },
        body: null,
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setCoins(data);
    } catch (err) {
      console.error(err);
    }

    try {
      const url = "https://api.coingecko.com/api/v3/coins/list";
      const options = {
        method: "GET",
        headers: { "x-cg-demo-api-key": API_KEY },
        body: null,
      };
      const response = await fetch(url, options);
      const data = await response.json();
      setTotalPages(data.length);
      console.log(data);
      // setCoins(data);
    } catch (err) {
      console.error(err);
    }
  };
  const reset = () => {
    setSearchData();
    setCurrentPage(1);
    setCoinResult("");
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

  useEffect(() => {
    getCryptoData();
  }, [coinResult, currency, sortBy, currentPage, perPage]);

  const ctxValue = {
    coins,
    searchData,
    setSearchData,
    setCoinResult,
    getSearchResults,
    setCurrency,
    currency,
    sortBy,
    setSortBy,
    currentPage,
    setCurrentPage,
    totalPages,
    reset,
    setPerPage,
    perPage,
  };

  return (
    <CryptoContext.Provider value={ctxValue}>{children}</CryptoContext.Provider>
  );
}
