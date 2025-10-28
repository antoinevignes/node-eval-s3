import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-900 font-bold text-xl hover:text-blue-600 transition-colors"
        >
          🪑 Atelier du Design
        </Link>

        <div className="flex items-center gap-6">
          {!user ? (
            <Link
              to="/user/login"
              className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
            >
              Connexion
            </Link>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/admin/dashboard"
                className="text-gray-700 font-medium hover:text-blue-600 transition-colors"
              >
                Tableau de bord
              </Link>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 hover:text-gray-900 transition-all"
              >
                Déconnexion
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
