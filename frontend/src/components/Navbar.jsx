import { Link, useNavigate } from "react-router";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between">
      <Link to="/" className="font-bold text-lg">
        🏠 Meubles
      </Link>
      <div className="flex gap-4">
        {!token ? (
          <Link to="/user/login" className="hover:text-blue-400">
            Login
          </Link>
        ) : (
          <button onClick={handleLogout} className="hover:text-blue-400">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
