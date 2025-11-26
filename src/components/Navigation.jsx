import React from "react";
import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="w-fit px-5   mt-25 flex justify-around align-middle border border-cyan-300 rounded-lg">
      <NavLink
        to="/"
        className={({ isActive }) => {
          return isActive
            ? `bg-cyan-300 text-gray-800 w-full text-base p-1 text-center m-2.5 active:bg-cyan-300 active:text-gray-500
        border-0 cursor-pointer capitalize rounded font-bold`
            : `w-full text-base text-center  p-1 m-2.5 bg-gray-900 text-gray-100 hover:text-cyan-300 active:bg-cyan-300 active:text-gray-500
        border-0 cursor-pointer capitalize rounded font-bold`;
        }}
      >
        Crypto
      </NavLink>
      <NavLink
        to="/trending"
        className={({ isActive }) => {
          return isActive
            ? `bg-cyan-300 text-gray-800 w-full text-base p-1 text-center m-2.5 active:bg-cyan-300 active:text-gray-500
        border-0 cursor-pointer capitalize rounded font-bold`
            : `w-full text-base text-center  p-1 m-2.5 bg-gray-900 text-gray-100 hover:text-cyan-300 active:bg-cyan-300 active:text-gray-500
        border-0 cursor-pointer capitalize rounded font-bold`;
        }}
      >
        Trending
      </NavLink>
      <NavLink
        to="/saved"
        className={({ isActive }) => {
          return isActive
            ? `bg-cyan-300 text-gray-800 w-full text-base p-1 text-center m-2.5 active:bg-cyan-300 active:text-gray-500
        border-0 cursor-pointer capitalize rounded font-bold`
            : `w-full text-base text-center  p-1 m-2.5 bg-gray-900 text-gray-100 hover:text-cyan-300 active:bg-cyan-300 active:text-gray-500
        border-0 cursor-pointer capitalize rounded font-bold`;
        }}
      >
        Saved
      </NavLink>
    </nav>
  );
}

export default Navigation;
