import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (!user) {
      navigate("/user/login?error=not-connected");
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
    </div>
  );
}
