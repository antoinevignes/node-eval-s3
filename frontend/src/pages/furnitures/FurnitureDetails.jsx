import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";

export default function FurnitureDetails() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [furniture, setFurniture] = useState({});

  useEffect(() => {
    async function getFurnitureById() {
      const response = await fetch(`${API_URL}/furniture/${id}`);

      const data = await response.json();

      setFurniture(data);
    }

    getFurnitureById();
  }, []);

  console.log(furniture);

  return (
    <>
      {furniture && (
        <section className="flex flex-col justify-center items-center h-[80vh] space-y-4">
          <h1 className="text-2xl font-bold">{furniture.name}</h1>

          <p>Catégorie : {furniture.category?.name}</p>

          <div>
            <ul className="flex items-center gap-2">
              {furniture.materials?.map((m) => (
                <li
                  key={m._id}
                  className="bg-blue-500 rounded-lg px-2 py-1 text-white"
                >
                  <Link to={`/material/${m._id}`}>{m.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
