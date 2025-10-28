import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useSearchParams } from "react-router";

export default function Login() {
  const API_URL = import.meta.env.VITE_API_URL;

  const { login } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const searchParamsErr = searchParams.get("error");

  const [error, setError] = useState(
    searchParamsErr ? "Vous devez vous connecter pour continuer" : ""
  );

  const handleSubmit = async (formData) => {
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await fetch(`${API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Erreur inconnue");
        return;
      }

      const data = await response.json();

      login(data.token);
    } catch (err) {
      console.error(err);
      setError("Erreur serveur");
    }
  };

  return (
    <section className="p-20 flex flex-col justify-center items-center h-screen">
      <h1 className="font-bold text-2xl mb-6">Se connecter</h1>

      <form
        action={handleSubmit}
        method="post"
        className="flex flex-col justify-center items-center space-y-2"
      >
        <input
          type="email"
          name="email"
          className="border border-black rounded-lg px-2 py-1"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          className="border border-black rounded-lg px-2 py-1"
          placeholder="Mot de passe"
        />
        <input
          type="submit"
          value="Se connecter"
          className="bg-black text-white px-2 py-1 rounded-lg border border-black hover:bg-white hover:text-black transition-all cursor-pointer"
        />

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </section>
  );
}
