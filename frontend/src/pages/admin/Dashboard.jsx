import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext);

  useEffect(() => {
    if (!user && !loading) {
      navigate("/user/login?error=not-connected");
    }
  }, []);

  return (
    <section className="h-screen bg-gray-200">
      <h1>Dashboard</h1>
    </section>
  );
}
