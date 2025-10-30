import { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { AuthContext } from "../../context/AuthContext";

export default function AdminFurnitureDetails() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [furniture, setFurniture] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getFurnitureById() {
      try {
        const response = await fetch(`${API_URL}/furniture/${id}`, {
          headers: {
            Authorization: `Bearer ${user}`,
          },
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message);
        }

        const data = await response.json();
        setFurniture(data);
      } catch (err) {
        console.error("Erreur récupération meuble:", err);
        setError(err.message || "Erreur serveur");
      } finally {
        setLoading(false);
      }
    }

    getFurnitureById();
  }, [API_URL, id, user]);

  console.log(furniture);

  if (loading) {
    return (
      <section className="flex justify-center items-center h-[80vh] text-gray-500">
        Chargement du meuble...
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </section>
    );
  }

  if (!furniture) {
    return (
      <section className="flex justify-center items-center h-screen text-gray-500">
        Meuble introuvable.
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] py-16 flex justify-center items-center bg-gray-50">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-lg border border-gray-100 p-10 space-y-10">
        <div className="flex items-center justify-between border-b pb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {furniture.name}
            </h1>
            <p className="text-gray-600">
              Catégorie :{" "}
              <span className="font-medium text-gray-800">
                {furniture.category?.name}
              </span>
            </p>
          </div>

          <div className="text-right">
            <p className="text-sm text-gray-500">Quantité en stock</p>
            <p className="text-2xl font-bold text-blue-600">
              {furniture.qty || 0}
            </p>
          </div>
        </div>

        <div className="w-full h-72 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden shadow-inner">
          <img
            src={
              furniture.image_url || "https://placehold.co/800x500?text=Meuble"
            }
            alt={furniture.name}
            className="object-cover h-full w-full rounded-lg"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
            Matériaux utilisés
          </h2>

          {furniture.materials?.length > 0 ? (
            <table className="w-full text-sm border-collapse">
              <thead className="text-gray-600 uppercase text-xs border-b">
                <tr>
                  <th className="text-left py-2 px-3">Nom</th>
                  <th className="text-left py-2 px-3">Type</th>
                  <th className="text-center py-2 px-3">Quantité</th>
                  <th className="text-right py-2 px-3">Fournisseur</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {furniture.materials.map((m, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="py-2 px-3 font-medium">
                      <Link
                        to={`/material/${m.material_id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {m.material_name}
                      </Link>
                    </td>
                    <td className="py-2 px-3 text-gray-700">{m.type}</td>
                    <td className="py-2 px-3 text-center font-semibold">
                      {m.qty || 1}
                    </td>
                    <td className="py-2 px-3 text-right text-gray-600">
                      {m.company_name || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 italic">
              Aucun matériau associé à ce meuble.
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-100 text-sm text-gray-500">
          <p>
            Créé le{" "}
            <span className="font-medium text-gray-700">
              {new Date(furniture.created_at).toLocaleDateString()}
            </span>
          </p>

          <button
            onClick={() => navigate(-1)}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all"
          >
            ← Retour
          </button>
        </div>
      </div>
    </section>
  );
}
