import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function FurnitureDetails() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [furniture, setFurniture] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getFurnitureById() {
      try {
        const response = await fetch(`${API_URL}/furniture/${id}`);

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message);
        }

        const data = await response.json();
        setFurniture(data);
        setError("");
      } catch (err) {
        console.error("Erreur récupération détails meubles:", err);
        setError(err.message || "Erreur serveur");
      }
    }

    getFurnitureById();
  }, [API_URL, id]);

  if (error) {
    return (
      <section className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </section>
    );
  }

  if (!furniture) {
    return (
      <section className="flex justify-center items-center h-[80vh] text-gray-500">
        Chargement en cours...
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] py-16 flex justify-center items-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-md border border-gray-100 p-10 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {furniture.name}
          </h1>
          <p className="text-gray-500 text-sm">
            Catégorie :{" "}
            <span className="font-medium text-gray-700">
              {furniture.category?.name}
            </span>
          </p>
        </div>

        <div className="w-full h-64 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
          <img
            src={
              furniture.image_url || "https://placehold.co/600x400?text=Meuble"
            }
            alt={furniture.name}
            className="object-cover h-full w-full rounded-lg"
          />
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">
            Matériaux utilisés :
          </h2>
          <ul className="flex flex-wrap gap-3">
            {furniture.materials?.map((m) => (
              <li key={m._id}>
                <Link
                  to={`/material/${m._id}`}
                  className="bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 hover:text-white transition-all shadow-sm"
                >
                  {m.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-sm text-gray-500 text-center pt-6 border-t border-gray-100">
          Créé le{" "}
          <span className="font-medium text-gray-700">
            {new Date(furniture.created_at).toLocaleDateString()}
          </span>
        </div>
      </div>
    </section>
  );
}
