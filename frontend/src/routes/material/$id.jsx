import { createFileRoute, useParams, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/material/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const API_URL = import.meta.env.VITE_API_URL;
  const router = useRouter();
  const { id } = useParams({ from: "/material/$id" });
  const [material, setMaterial] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getMaterial() {
      try {
        const response = await fetch(`${API_URL}/material/${id}`);

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.message);
        }

        const data = await response.json();
        setMaterial(data);
        setError("");
      } catch (err) {
        console.error("Erreur récupération matériau:", err);
        setError(err.message || "Erreur serveur");
      }
    }

    getMaterial();
  }, [API_URL, id]);

  if (error) {
    return (
      <section className="flex justify-center items-center h-screen text-red-500">
        <p>{error}</p>
      </section>
    );
  }

  if (!material) {
    return (
      <section className="flex justify-center items-center h-[80vh] text-gray-500">
        Chargement du matériau...
      </section>
    );
  }

  return (
    <section className="min-h-[80vh] py-16 flex justify-center items-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-md border border-gray-100 p-10 space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">{material.name}</h1>
          <p className="text-gray-500 text-sm uppercase tracking-wide">
            Type :{" "}
            <span className="text-gray-700 font-semibold">{material.type}</span>
          </p>
        </div>

        <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden flex justify-center items-center">
          <img
            src={
              material.image_url ||
              `https://placehold.co/600x400?text=${encodeURIComponent(
                material.name
              )}`
            }
            alt={material.name}
            className="object-cover h-full w-full rounded-lg"
          />
        </div>

        <div className="text-center">
          <p className="text-gray-700">
            Fabriqué par :{" "}
            <span className="font-medium text-blue-600">
              {material.company_id?.name}
            </span>
          </p>
        </div>

        {material.description && (
          <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 text-center">
            “{material.description}”
          </blockquote>
        )}

        <div className="pt-6 border-t border-gray-100 text-sm text-gray-500 text-right">
          <button
            onClick={() => router.history.back()}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-300 transition-all"
          >
            ← Retour
          </button>
        </div>
      </div>
    </section>
  );
}
