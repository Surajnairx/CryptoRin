import React, { useContext, useRef } from "react";
import Search from "./Search";
import submitIcon from "../assets/submit-icon.svg";
import { CryptoContext } from "../context/CryptoContext";

const Filter = () => {
  const currencyRef = useRef();
  const { setCurrency } = useContext(CryptoContext);

  const handleCurrency = (e) => {
    e.preventDefault();
    const currency = currencyRef.current.value.trim().toLowerCase();
    if (!currency) return;
    setCurrency(currency);
    currencyRef.current.value = "";
  };

  return (
    <div className="w-full h-16 bg-gray-900/60 backdrop-blur-md border border-gray-700 rounded-2xl flex items-center justify-between px-4 md:px-6 shadow-md">
      {/* 🔍 Search Component */}
      <div className="flex-1">
        <Search />
      </div>

      {/* 💰 Currency + Sort Section */}
      <div className="flex items-center gap-6">
        {/* Currency Form */}
        <form
          className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 focus-within:border-cyan-400 transition duration-200"
          onSubmit={handleCurrency}
        >
          <label
            className="font-semibold text-gray-300 mr-2 text-sm"
            htmlFor="currency"
          >
            Currency:
          </label>
          <input
            className="bg-transparent w-16 text-white text-sm px-1 rounded outline-0 placeholder-gray-500"
            type="text"
            name="currency"
            placeholder="usd"
            required
            ref={currencyRef}
          />
          <button
            className="ml-1 p-1 rounded-md hover:bg-cyan-400/20 transition"
            type="submit"
          >
            <img className="w-4 h-4" src={submitIcon} alt="submit" />
          </button>
        </form>

        {/* Sort Dropdown */}
        <label
          className="flex items-center gap-2 text-sm text-gray-300"
          htmlFor="sortby"
        >
          <span className="font-semibold">Sort by:</span>
          <select
            className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 text-white text-sm capitalize focus:border-cyan-400 outline-0 transition"
            name="sortby"
          >
            <option value="market_cap_asc">Market Cap ⬆️</option>
            <option value="market_cap_desc">Market Cap ⬇️</option>
            <option value="volume_asc">Volume ⬆️</option>
            <option value="volume_desc">Volume ⬇️</option>
            <option value="id_asc">Name ⬆️</option>
            <option value="id_desc">Name ⬇️</option>
          </select>
        </label>

        <img className="w-4 h-4" src={submitIcon} alt="submit" />
      </div>
    </div>
  );
};

export default Filter;
