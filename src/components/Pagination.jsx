import { useState } from "react";
import paginationImg from "../assets/pagination-arrow.svg";
function Pagination() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalNumber = 250;
  const next = () => {
    if (currentPage < totalNumber) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const multiStep = () => {
    setCurrentPage((prev) => prev + 3);
  };
  const jumpToLast = () => {
    setCurrentPage(totalNumber);
  };
  return (
    <div className="flex items-center">
      <ul className="flex items-center justify-center text-sm">
        <li className="flex items-center">
          <button
            className="outline-0 hover:text-cyan-300 rounded-full h-8 w-8 flex items-center justify-center bg-gray-600 mx-1.5"
            onClick={prev}
          >
            <img
              className="w-full h-auto rotate-180"
              src={paginationImg}
              alt="left"
            />
          </button>
        </li>
        {currentPage > 1 ? (
          <li>
            <button
              onClick={prev}
              className="outline-0 hover:text-cyan-300 rounded-full h-8 w-8 flex items-center justify-center bg-gray-600 mx-1.5"
            >
              {currentPage - 1}
            </button>
          </li>
        ) : null}

        <li>
          <button className="outline-0 rounded-full h-8 w-8 flex items-center justify-center mx-1.5 bg-cyan-300 text-gray-600">
            {currentPage}
          </button>
        </li>
        {currentPage + 1 >= totalNumber ? null : (
          <li>
            <button
              onClick={next}
              className="outline-0 hover:text-cyan-300 rounded-full h-8 w-8 flex items-center justify-center bg-gray-600 mx-1.5"
            >
              {currentPage + 1}
            </button>
          </li>
        )}
        {currentPage + 3 >= totalNumber ? null : (
          <li>
            <button
              onClick={multiStep}
              className="outline-0 hover:text-cyan-300 rounded-full h-8 w-8 flex items-center justify-center bg-gray-600 mx-1.5 "
            >
              ...
            </button>
          </li>
        )}

        {currentPage === totalNumber ? null : (
          <li>
            <button
              onClick={jumpToLast}
              className="outline-0 hover:text-cyan-300 rounded-full h-8 w-8 flex items-center justify-center bg-gray-600 mx-1.5"
            >
              {totalNumber}
            </button>
          </li>
        )}

        <li>
          <button
            className="outline-0 hover:text-cyan-300 rounded-full h-8 w-8 flex items-center justify-center bg-gray-600 mx-1.5"
            onClick={next}
          >
            <img className="w-full h-auto" src={paginationImg} alt="right" />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
