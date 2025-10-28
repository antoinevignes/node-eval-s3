import { Route, Routes } from "react-router";
import FurnitureList from "./pages/furnitures/FurnitureList";
import FurnitureDetails from "./pages/furnitures/FurnitureDetails";
import MainLayout from "./layout/MainLayout";
import MaterialDetail from "./pages/materials/MaterialDetail";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/admin/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<FurnitureList />} />
        <Route path="/:id" element={<FurnitureDetails />} />
        <Route path="/material/:id" element={<MaterialDetail />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
      </Route>

      <Route path="/user/login" element={<Login />} />
    </Routes>
  );
}
