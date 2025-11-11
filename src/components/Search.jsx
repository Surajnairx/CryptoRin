import React, { useState } from "react";
import searchIcon from "../assets/search-icon.svg";
function Search() {
  const [seachText, setSearchText] = useState("");
  function handleInput(event) {
    const query = event.target.value;
    setSearchText(query);
  }
  function handleSubmit(event) {
    setSearchText("");
    event.preventDefault();
    console.log(seachText);
  }
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
          value={seachText}
          required
          onChange={handleInput}
        />
        <button className="cursor-pointer absolute right-1" type="submit">
          <img src={searchIcon} alt="search" />
        </button>
      </form>

      {seachText.length > 0 ? (
        <ul className="absolute top-11 right-0 w-full h-96 rounded overflow-x-hidden py-2 bg-transparent backdrop-blur-sm">
          <li>Bitcoin</li>
          <li>Ethereum</li>
        </ul>
      ) : null}
    </>
  );
}

export default Search;
