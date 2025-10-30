import { Route, Routes } from "react-router";
import FurnitureList from "./pages/furnitures/FurnitureList";
import FurnitureDetails from "./pages/furnitures/FurnitureDetails";
import MainLayout from "./layout/MainLayout";
import MaterialDetail from "./pages/materials/MaterialDetail";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/admin/Dashboard";
import AddFurniture from "./pages/admin/AddFurniture";
import NotFound from "./pages/404/NotFound";
import AdminFurnitureDetails from "./pages/admin/AdminFurnitureDetails";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<FurnitureList />} />
        <Route path="/:id" element={<FurnitureDetails />} />
        <Route path="/material/:id" element={<MaterialDetail />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/furniture/add" element={<AddFurniture />} />
        <Route
          path="/admin/furniture/:id"
          element={<AdminFurnitureDetails />}
        />
        <Route
          path="/admin/furniture/:id"
          element={<AdminFurnitureDetails />}
        />
      </Route>

      <Route path="/user/login" element={<Login />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
