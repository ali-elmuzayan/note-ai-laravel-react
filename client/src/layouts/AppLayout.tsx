import { Outlet } from "react-router";
import Header from "./components/Header";

const AppLayout = () => {
  return (
    <div className="w-full min-h-screen bg-gray-100">
      <Header />
      <main className="px-4">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
