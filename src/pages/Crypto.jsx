import React from "react";
import Table from "../components/Table";
import Filter from "../components/Filter";
import { Outlet } from "react-router-dom";

function Crypto() {
  return (
    <section className="w-[80%] h-full flex flex-col items-center mt-10 mb-60 relative">
      <Filter />
      <Table />
      <Outlet />
    </section>
  );
}

export default Crypto;
