import { useEffect, useState } from "react";

function App() {
  const [furnitures, setFurnitures] = useState([]);

  useEffect(() => {
    async function getFurnitures() {
      const response = await fetch(`http://localhost:8000/furniture`);

      const data = await response.json();

      setFurnitures(data);
    }

    getFurnitures();
  }, []);

  console.log(furnitures);

  return (
    <section className="grid grid-cols-12 p-20">
      <h1 className="col-start-6 col-span-4 font-bold text-2xl">Mes meubles</h1>

      <div className="col-span-12 col-start-2 col-end-12 grid grid-cols-2 gap-4 mt-10">
        {furnitures &&
          furnitures.map((f) => (
            <div key={f._id} className="shadow-md p-6 rounded-lg space-y-2">
              <h4 className="font-semibold text-lg">{f.name}</h4>

              <p>Catégorie : {f.category.name}</p>

              <div>
                <p>Matériaux :</p>
                <ul>
                  {f.materials.map((m) => (
                    <li key={m._id}>{m.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default App;
