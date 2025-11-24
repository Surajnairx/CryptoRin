import { Outlet } from "react-router-dom";
import Navigation from "../components/Navigation";
import Logo from "../components/Logo";
import CryptoContextProvider from "../context/CryptoContext";
import TrendingContextProvider, {
  TrendingContext,
} from "../context/TrendingContext";
import StoreContextProvider from "../context/StoreContext";

function Home() {
  return (
    <StoreContextProvider>
      <TrendingContextProvider>
        <CryptoContextProvider>
          <main className=" w-screen h-screen flex flex-col items-center first-letter:capitalize relative text-white bg-black ">
            <Logo />
            <Navigation />

            {/* <Outlet /> */}
          </main>
        </CryptoContextProvider>
      </TrendingContextProvider>
    </StoreContextProvider>
  );
}

export default Home;
