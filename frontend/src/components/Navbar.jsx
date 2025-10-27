import { Link } from "react-router";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-lg">
        🏠 Meubles
      </Link>
      <div className="flex gap-4">
        <Link to="/login" className="hover:text-blue-400">
          Login
        </Link>
      </div>
    </nav>
  );
}
