import { useEffect, useState } from "react";
import { Eye, SquarePen } from "lucide-react";
import { Link } from "react-router";

export default function FurnitureTable() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [furnitures, setFurnitures] = useState([]);

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

  return (
    <div className="bg-white rounded-lg shadow-lg col-span-3 p-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-900">
        Liste des meubles
      </h2>

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
              <th className="px-6 py-3 font-medium text-right">Actions</th>
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
                    <td className="px-6 py-4 text-right">1</td>
                    <td className="px-6 py-4 flex items-center justify-end gap-2">
                      <Link to={`/${f._id}`}>
                        <Eye size={20} />
                      </Link>
                      <Link to={`/admin/furniture/update/${f._id}`}>
                        <SquarePen size={20} />
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
