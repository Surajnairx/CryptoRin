import { useContext, useRef } from "react";
import paginationImg from "../assets/pagination-arrow.svg";
import { CryptoContext } from "../context/CryptoContext";
import submitIcon from "../assets/submit-icon.svg";
function Pagination() {
  const {
    coins,
    currentPage,
    setCurrentPage,
    totalPages,
    setPerPage,
    perPage,
  } = useContext(CryptoContext);

  const totalNumber = Math.ceil(totalPages / perPage);
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

  const PerPage = () => {
    const inputRef = useRef(null);

    const setPageLimit = () => {
      const value = inputRef.current.value;
      if (value != 0) {
        setPerPage(value);
      }
    };

    return (
      <form className="flex items-center bg-gray-800 border border-gray-700 rounded-lg px-3 py-1.5 focus-within:border-cyan-400 transition duration-200">
        <label
          className="font-semibold text-gray-300 mr-2 text-sm"
          htmlFor="perpage"
        >
          Coins Per Page:
        </label>
        <input
          className="bg-transparent w-16 text-white text-sm px-1 rounded outline-0 placeholder-gray-500"
          type="number"
          name="perpage"
          placeholder="10"
          min={1}
          max={250}
          required
          ref={inputRef}
        />
        <button
          className="ml-1 p-1 rounded-md hover:bg-cyan-400/20 transition"
          onClick={setPageLimit}
          type="submit"
        >
          <img className="w-4 h-4" src={submitIcon} alt="submit" />
        </button>
      </form>
    );
  };
  //to check if the per page component should be rendered
  if (coins && coins.length >= perPage) {
    return (
      <div className="flex flex-col gap-5">
        <PerPage />
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
}

export default Pagination;
