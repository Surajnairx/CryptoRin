import { Link } from "react-router-dom";
import Logo from "../assests/logo.svg";

const Symbol = () => {
  return (
    <Link
      to="/"
      className=" absolute top-[1rem] letf-[1.5rem] no-underline text-lg flex items-center "
    >
      <img src={Logo} alt="" />
      <span>CryptoRin</span>
    </Link>
  );
};

export default Symbol;
