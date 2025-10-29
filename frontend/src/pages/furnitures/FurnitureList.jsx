import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";

export default function FurnitureList() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [searchParams] = useSearchParams();
  const [furnitures, setFurnitures] = useState([]);
  const [error, setError] = useState("");

  const success = searchParams.get("success");

  useEffect(() => {
    async function getFurnitures() {
      try {
        const response = await fetch(`${API_URL}/furniture`);

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message);
        }

        const data = await response.json();
        setFurnitures(data);
        setError("");
      } catch (err) {
        console.error("Erreur récupération liste meubles:", err);
        setError(err.message || "Erreur serveur");
      }
    }

    getFurnitures();
  }, [API_URL]);

  if (error) {
    return (
      <section className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Nos meubles réalisés
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {furnitures.length > 0 ? (
            furnitures.map((f, idx) => (
              <Link
                to={`/${f._id}`}
                key={idx}
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100 p-6 flex flex-col space-y-4 hover:-translate-y-1"
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                    {f.name}
                  </h4>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    {f.category.name}
                  </span>
                </div>

                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">
                    Matériaux utilisés :
                  </h5>
                  <ul className="flex flex-wrap gap-2">
                    {f.materials.map((m, idx) => (
                      <li
                        key={idx}
                        className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {m.material_name}
                      </li>
                    ))}
                  </ul>
                </div>

                <p className="text-xs text-gray-500 mt-auto pt-4 border-t border-gray-100">
                  Créé le{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(f.created_at).toLocaleDateString()}
                  </span>
                </p>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-full">
              Aucun meuble disponible.
            </p>
          )}
        </div>
      </div>

      {success && (
        <div
          className="
            bg-green-300 border border-green-500 
            w-fit p-5 rounded-lg absolute bottom-10 right-10
            shadow-lg text-green-900 font-medium
            animate-slide-fade
          "
        >
          <p>Connecté !</p>
        </div>
      )}
    </section>
  );
}
