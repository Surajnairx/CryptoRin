import React from "react";
import Table from "../components/Table";
import Filter from "../components/Filter";

function Crypto() {
  return (
    <section className="w-[80%] h-full flex flex-col mt-16 mb-24 relative">
      <Filter />
      <Table />
    </section>
  );
}

export default Crypto;
