import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import CryptoContextProvider from "../context/CryptoContext";
import TrendingContextProvider, {
  TrendingContext,
} from "../context/TrendingContext";

function Home() {
  return (
    <TrendingContextProvider>
      <CryptoContextProvider>
        <main className=" w-full h-full flex flex-col first-letter:capitalize items-center relative text-white ">
          <div className="w-screen h-screen bg-black fixed -z-10"></div>
          <Logo />
          <Navigation />

          <Outlet />
        </main>
      </CryptoContextProvider>
    </TrendingContextProvider>
  );
}

export default Home;
