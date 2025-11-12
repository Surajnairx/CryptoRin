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
  function handleInput(event) {
    const query = event.target.value;
    setSearchText(query);
  }
  function handleSubmit(event) {
    event.preventDefault();
  }
  useEffect(() => {
    if (!searchText.trim()) return;
    const timer = setTimeout(() => {
      getSearchResults(searchText);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchText, getSearchResults]);

  return (
    <>
      <form
        className="relative w-96 flex items-center ml-7 rounded-sm"
        onSubmit={handleSubmit}
      >
        <input
          className="bg-gray-800 px-1 w-full rounded focus:border-cyan-300 outline-0 border border-transparent"
          type="text"
          name="search"
          placeholder="search here..."
          value={searchText}
          required
          onChange={handleInput}
        />
        <button className="cursor-pointer absolute right-1" type="submit">
          <img src={searchIcon} alt="search" />
        </button>
      </form>

      <div className="relative">
        {searchText?.length > 0 ? (
          <ul className="absolute top-11 right-0 w-96 h-96 rounded overflow-x-hidden py-2 bg-transparent backdrop-blur-sm">
            {searchData ? (
              searchData.map((coin) => {
                return (
                  <li
                    className="flex items-center ml-4 my-2 cursor-pointer hover:bg-gray-600"
                    key={coin.id}
                    onClick={() => selectCoin(coin.id)}
                  >
                    <img
                      className="w-4 h-4 mx-1.5"
                      src={coin.large}
                      alt={coin.name}
                    />
                    {coin.name}
                  </li>
                );
              })
            ) : (
              <Loader />
            )}
          </ul>
        ) : null}
      </div>
    </>
  );
}

export default Search;
