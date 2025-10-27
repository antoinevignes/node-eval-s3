import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function MaterialDetail() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { id } = useParams();
  const [material, setMaterial] = useState({});

  useEffect(() => {
    async function getMaterial() {
      const response = await fetch(`${API_URL}/material/${id}`);

      const data = await response.json();

      setMaterial(data);
    }

    getMaterial();
  }, []);

  return (
    <>
      {material && (
        <section className="flex flex-col justify-center items-center h-[80vh] space-y-4">
          <h1 className="text-2xl font-bold">
            {material.name} ({material.type})
          </h1>

          <p>Fabriqué par : {material.company_id?.name}</p>

          <p className="w-[50%]">"{material.description}"</p>
        </section>
      )}
    </>
  );
}
