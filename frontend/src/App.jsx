import { Route, Routes } from "react-router";
import FurnitureList from "./pages/FurnitureList";
import FurnitureDetails from "./pages/FurnitureDetails";
import MainLayout from "./layout/MainLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<FurnitureList />} />
        <Route path="/:id" element={<FurnitureDetails />} />
      </Route>
    </Routes>
  );
}
