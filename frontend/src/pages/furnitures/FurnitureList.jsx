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
  }, []);

  console.log(furnitures);

  return (
    <section className="grid grid-cols-12">
      <div className="col-span-12 col-start-2 col-end-12 grid grid-cols-2 gap-4 mt-10">
        {furnitures &&
          furnitures.map((f) => (
            <Link
              to={`/${f._id}`}
              key={f._id}
              className="shadow-md flex flex-col items-center p-6 rounded-lg space-y-2 hover:shadow-lg transition-all"
            >
              <h4 className="font-semibold text-lg">{f.name}</h4>

              <p>Catégorie: {f.category.name}</p>

              <div>
                <ul className="flex items-center gap-2">
                  {f.materials.map((m) => (
                    <li
                      key={m._id}
                      className="bg-blue-500 rounded-lg px-2 py-1 text-white"
                    >
                      {m.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
