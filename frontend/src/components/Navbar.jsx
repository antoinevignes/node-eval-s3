import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-lg">
        🏠 Meubles
      </Link>

      <div className="flex gap-4">
        {!user ? (
          <Link to="/user/login" className="hover:text-blue-400 transition-all">
            Login
          </Link>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              to="/admin/dashboard"
              className="hover:text-blue-400 transition-all"
            >
              Dashboard
            </Link>

            <button
              onClick={logout}
              className="hover:text-blue-400 transition-all"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
