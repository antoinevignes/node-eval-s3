import { useEffect, useState } from "react";
import { Eye } from "lucide-react";
import { Link } from "react-router";

export default function FurnitureTable() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [furnitures, setFurnitures] = useState([]);

  const increaseQuantity = (id) => {
    setFurnitures((prev) =>
      prev.map((f) =>
        f._id === id ? { ...f, quantity: (f.quantity || 0) + 1 } : f
      )
    );
  };

  const decreaseQuantity = (id) => {
    setFurnitures((prev) =>
      prev.map((f) =>
        f._id === id
          ? { ...f, quantity: Math.max((f.quantity || 0) - 1, 0) }
          : f
      )
    );
  };

  useEffect(() => {
    async function getFurnitures() {
      try {
        const response = await fetch(`${API_URL}/furniture`);
        const raw = await response.text();

        if (!response.ok) {
          console.error("Erreur", raw);
          return;
        }

        const data = JSON.parse(raw);
        setFurnitures(data);
      } catch (err) {
        console.error(err);
      }
    }

    getFurnitures();
  }, [API_URL]);

  console.log(furnitures);

  return (
    <div className="bg-white rounded-lg shadow-lg col-span-3 p-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Liste des meubles
        </h2>

        <Link
          to={`/admin/furniture/add`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
        >
          Ajouter
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm text-left">
          <thead className="text-gray-600 uppercase text-xs border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 font-medium">Nom</th>
              <th className="px-6 py-3 font-medium">Catégorie</th>
              <th className="px-6 py-3 font-medium">
                Date de première création
              </th>
              <th className="px-6 py-3 font-medium text-right">Quantité</th>
              <th className="px-6 py-3 font-medium text-right">Détails</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100 text-gray-700">
            {furnitures.length > 0 ? (
              furnitures.map((f) => {
                const date = new Date(f.created_at).toLocaleDateString();

                return (
                  <tr
                    key={f._id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4 font-medium">{f.name}</td>
                    <td className="px-6 py-4">{f.category.name}</td>
                    <td className="px-6 py-4">{date}</td>

                    <td className="px-6 py-4 text-right space-x-4">
                      <button
                        onClick={() => decreaseQuantity(f._id)}
                        className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 transition"
                      >
                        -
                      </button>

                      <span className="min-w-8 text-center">{f.qty || 0}</span>

                      <button
                        onClick={() => increaseQuantity(f._id)}
                        className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
                      >
                        +
                      </button>
                    </td>

                    <td className="px-6 py-4 flex items-center justify-end">
                      <Link to={`/admin/${f._id}`}>
                        <Eye size={20} />
                      </Link>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-6 text-center text-gray-500 italic"
                >
                  Aucun meuble trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
