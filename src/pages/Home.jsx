import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <main className="bg-red-500">
      <p className=" font-bold underline bg-red-600">Hello World</p>
      <Outlet />
    </main>
  );
};

export default Home;
