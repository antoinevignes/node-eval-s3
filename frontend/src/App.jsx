import { Route, Routes } from "react-router";
import FurnitureList from "./pages/FurnitureList";
import FurnitureDetails from "./pages/FurnitureDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FurnitureList />} />
      <Route path="/:id" element={<FurnitureDetails />} />
    </Routes>
  );
}
