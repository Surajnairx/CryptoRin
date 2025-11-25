import React, { useContext, useEffect, useState } from "react";
import searchIcon from "../assets/search-icon.svg";
import { CryptoContext } from "../context/CryptoContext";
import Loader from "../UI/Loader";

function Search() {
  const [searchText, setSearchText] = useState("");
  const { getSearchResults, searchData, setCoinResult } =
    useContext(CryptoContext);

  function selectCoin(coin) {
    setCoinResult(coin);
    setSearchText("");
  }

  function handleInput(e) {
    setSearchText(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
  }

  useEffect(() => {
    if (!searchText.trim()) return;
    const timer = setTimeout(() => {
      getSearchResults(searchText);
    }, 1000);
    return () => clearTimeout(timer);
  }, [searchText, getSearchResults]);

  return (
    <div className="relative">
      {/* 🔍 Search Input */}
      <form
        onSubmit={handleSubmit}
        className="relative w-72 md:w-96 flex items-center bg-gray-800 border border-gray-700 rounded-lg overflow-hidden focus-within:border-cyan-400 transition duration-200"
      >
        <input
          type="text"
          name="search"
          placeholder="Search crypto..."
          value={searchText}
          required
          onChange={handleInput}
          className="w-full bg-transparent text-sm text-white px-3 py-2 placeholder-gray-500 focus:outline-none"
        />
        <button
          type="submit"
          className="absolute right-2 p-1 rounded-md hover:bg-cyan-400/20 transition"
        >
          <img src={searchIcon} alt="search" className="w-4 h-4" />
        </button>
      </form>

      {/* 🔽 Search Results Dropdown */}
      {searchText.length > 0 && (
        <div className="absolute top-12 left-0 w-full bg-gray-600/80 backdrop-blur-md border border-gray-700 rounded-xl shadow-lg overflow-y-auto max-h-72 z-10">
          {searchData ? (
            searchData.length > 0 ? (
              <ul className="py-2">
                {searchData.map((coin) => (
                  <li
                    key={coin.id}
                    onClick={() => selectCoin(coin.id)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-cyan-500/20 cursor-pointer transition"
                  >
                    <img
                      src={coin.large}
                      alt={coin.name}
                      className="w-5 h-5 rounded-full"
                    />
                    <span>{coin.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex justify-center py-6 text-gray-400 text-sm">
                No results found.
              </div>
            )
          ) : (
            <div className="flex justify-center items-center py-6">
              <Loader />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
