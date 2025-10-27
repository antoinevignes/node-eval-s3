import { Route, Routes } from "react-router";
import FurnitureList from "./pages/furnitures/FurnitureList";
import FurnitureDetails from "./pages/furnitures/FurnitureDetails";
import MainLayout from "./layout/MainLayout";
import MaterialDetail from "./pages/materials/MaterialDetail";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<FurnitureList />} />
        <Route path="/:id" element={<FurnitureDetails />} />
        <Route path="/material/:id" element={<MaterialDetail />} />
      </Route>
    </Routes>
  );
}
