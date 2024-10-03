import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <main className=" w-full h-full flex flex-col content-center items-center relative ">
      <div className="w-screen h-screen bg-gray-300 fixed -z-10"></div>
      <Outlet />
    </main>
  );
};

export default Home;
