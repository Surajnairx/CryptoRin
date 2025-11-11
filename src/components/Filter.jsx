import React from "react";
import Search from "./Search";

const Filter = () => {
  return (
    <div className="w-full h-12 border-2 border-gray-400 rounded-lg flex items-center justify-between relative">
      <div>
        <Search />
      </div>
      <div>currency</div>
      <div>sort</div>
    </div>
  );
};

export default Filter;
