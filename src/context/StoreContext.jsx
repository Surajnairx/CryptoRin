import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext({
  savedCoin: [],
  saveCoin: () => {},
  removeCoin: () => {},
  getSavedData: () => {},
  savedData: [],
});

export default function StoreContextProvider({ children }) {
  const [savedCoin, setSavedCoin] = useState([]);
  const [savedData, setSavedData] = useState([]);

  const saveCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));
    console.log(oldCoins);

    if (oldCoins.includes(coinId)) {
      return;
    }
    const updated = [...oldCoins, coinId];

    setSavedCoin(updated);

    localStorage.setItem("coins", JSON.stringify(updated));
  };

  const removeCoin = (coinId) => {
    let oldCoins = JSON.parse(localStorage.getItem("coins"));
    console.log(oldCoins);

    if (oldCoins.includes(coinId)) {
      let newCoin = oldCoins.filter((coin) => coin !== coinId);
      localStorage.setItem("coins", JSON.stringify(newCoin));
      setSavedCoin(newCoin);
    }
  };

  const getSavedData = async (coinIds) => {
    console.log(coinIds);
    if (coinIds.length > 0) {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}`
      );
      const data = await response.json();
      console.log(data);
      setSavedData(data);
    }
  };
  useEffect(() => {
    const getCoins = JSON.parse(localStorage.getItem("coins")) || false;

    if (!getCoins) {
      localStorage.setItem("coins", JSON.stringify([]));
    } else {
      setSavedCoin(getCoins);
    }
  }, []);

  const ctxValue = {
    saveCoin,
    savedCoin,
    removeCoin,
    getSavedData,
    savedData,
  };

  return (
    <StoreContext.Provider value={ctxValue}>{children}</StoreContext.Provider>
  );
}
