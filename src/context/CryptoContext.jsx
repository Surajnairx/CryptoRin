/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { createContext, useEffect, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CryptoContext = createContext({
  coins: [],
  searchData: [],
  sortBy: "",
  coinData: [],
  setCoinResult: () => {},
  getSearchData: (query) => {},
  setCurrency: () => {},
  setSortBy: () => {},
  getCoinData: () => {},
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
  const [coinData, setCoinData] = useState();

  const getCoinData = async (coinId) => {
    // const url = `https://api.coingecko.com/api/v3/coins/${coinId}`;
    // const options = {
    //   method: "GET",
    //   headers: { "x-cg-demo-api-key": API_KEY },
    //   body: undefined,
    // };

    // try {
    //   const response = await fetch(url, options);
    //   const data = await response.json();
    //   setCoinData(data);
    // } catch (error) {
    //   console.error(error);
    // }
    const getCoinData = async (coinId) => {
      try {
        const response = await fetch(`/api/coin?coinId=${coinId}`);
        const data = await response.json();
        setCoinData(data);
      } catch (error) {
        console.error(error);
      }
    };
  };
  const getCryptoData = async () => {
    try {
      const response = await fetch(
        `/api/markets?currency=${currency}&coinResult=${coinResult}&perPage=${perPage}&sortBy=${sortBy}&page=${currentPage}`,
      );
      const data = await response.json();
      setCoins(data);
    } catch (err) {
      console.error("Markets API error:", err);
    }

    try {
      const response = await fetch("/api/list");
      const data = await response.json();
      setTotalPages(data.length);
    } catch (err) {
      console.error("List API error:", err);
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
    getCoinData,
    coinData,
  };

  return (
    <CryptoContext.Provider value={ctxValue}>{children}</CryptoContext.Provider>
  );
}
