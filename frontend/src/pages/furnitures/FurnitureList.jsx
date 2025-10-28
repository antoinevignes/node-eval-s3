import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function FurnitureList() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [furnitures, setFurnitures] = useState([]);

  useEffect(() => {
    async function getFurnitures() {
      const response = await fetch(`${API_URL}/furniture`);
      const data = await response.json();
      setFurnitures(data);
    }

    getFurnitures();
  }, [API_URL]);

  return (
    <section className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-10 text-center">
          Nos meubles réalisés
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {furnitures.length > 0 ? (
            furnitures.map((f) => (
              <Link
                to={`/${f._id}`}
                key={f._id}
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
                    {f.materials.map((m) => (
                      <li
                        key={m._id}
                        className="bg-blue-100 text-blue-700 text-xs font-medium px-3 py-1 rounded-full"
                      >
                        {m.name}
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
    </section>
  );
}
