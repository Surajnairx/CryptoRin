import { Outlet } from "react-router-dom";
import Symbol from "../components/Symbol";

const Home = () => {
  return (
    <main className="w-full h-full flex flex-col items-center relative text-white">
      <div className="w-screen h-screen bg-black fixed -z-10">
        <Symbol />
      </div>

      <Outlet />
    </main>
  );
};

export default Home;
