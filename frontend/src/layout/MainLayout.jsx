import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="p-20">
        <Outlet />
      </main>
    </>
  );
}
