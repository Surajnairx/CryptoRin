import React, { useContext, useRef } from "react";
import Search from "./Search";
import submitIcon from "../assets/submit-icon.svg";
import { CryptoContext } from "../context/CryptoContext";

const Filter = () => {
  let currencyRef = useRef();
  const { setCurrency } = useContext(CryptoContext);
  const handleCurrency = (e) => {
    e.preventDefault();
    const currency = currencyRef.current.value;
    console.log(currency);
    setCurrency(currency);
    currencyRef.current.value = "";
  };
  return (
    <div className="w-full h-12 border-2 border-gray-400 rounded-lg flex items-center justify-between relative">
      <div>
        <Search />
      </div>
      <div className="mr-7">
        <form className="relative flex items-center " onSubmit={handleCurrency}>
          <label className="font-bold text-white mr-2" htmlFor="currency">
            currency:
          </label>
          <input
            className="bg-gray-800 w-16 px-1 rounded focus:border-cyan-300 outline-0 leading-3.5 border border-transparent"
            type="text"
            name="currency"
            placeholder="usd"
            required
            ref={currencyRef}
          />
          <button className="cursor-pointer" type="submit">
            <img className="ml-1" src={submitIcon} alt="" />
          </button>
        </form>
      </div>
      <div>sort</div>
    </div>
  );
};

export default Filter;
