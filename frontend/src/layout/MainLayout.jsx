import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto">
        <Outlet />
      </main>
    </>
  );
}
