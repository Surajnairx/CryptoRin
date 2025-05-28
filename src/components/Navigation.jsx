import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="w-[40%] mt-16 flex justify-around align-middle border border-cyan-300 rounded-lg">
      <NavLink
        to="/"
        className={({ isActive }) => {
          return `w-full text-base text-center m-2.5 
          ${
            isActive
              ? "bg-cyan-300 text-black"
              : "bg-gray-800 text-gray-500 hover:text-cyan-300  active:bg-cyan-300 active:text-black"
          }
           border-0 cursor-pointer rounded capitalize font-semibold`;
        }}
      >
        Crypto
      </NavLink>
      <NavLink
        to="/trending"
        className={({ isActive }) => {
          return `w-full text-base text-center m-2.5 
          ${
            isActive
              ? "bg-cyan-300 text-black"
              : "bg-gray-800 text-gray-500 hover:text-cyan-300  active:bg-cyan-300 active:text-black"
          }
           border-0 cursor-pointer rounded capitalize font-semibold`;
        }}
      >
        Trending
      </NavLink>
      <NavLink
        to="/saved"
        className={({ isActive }) => {
          return `w-full text-base text-center m-2.5 
          ${
            isActive
              ? "bg-cyan-300 text-black"
              : "bg-gray-800 text-gray-500 hover:text-cyan-300  active:bg-cyan-300 active:text-black"
          }
           border-0 cursor-pointer rounded capitalize font-semibold`;
        }}
      >
        Saved
      </NavLink>
    </nav>
  );
};

export default Navigation;
