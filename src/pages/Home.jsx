import { Outlet } from "react-router-dom";

function Home() {
  return (
    <main className=" w-full h-full flex flex-col first-letter:capitalize items-center relative text-white ">
      <div className="w-screen h-screen bg-black fixed -z-10"></div>

      <Outlet />
    </main>
  );
}

export default Home;
