import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router";

export default function AddFurniture() {
  const API_URL = import.meta.env.VITE_API_URL;
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [materialsSelected, setMaterialsSelected] = useState([
    { id: "", qty: 1 },
  ]);

  const categories = [
    { id: "68ff4178c117aceec20a9300", name: "Armoires" },
    { id: "68ff4187c117aceec20a9301", name: "Étagères" },
  ];

  const materials = [
    { id: "68ff3fa0c117aceec20a92e4", name: "Plastique" },
    { id: "68ff4069c117aceec20a92ec", name: "Frêne" },
    { id: "68ff40c5c117aceec20a92f1", name: "Chêne" },
    { id: "68ff40e2c117aceec20a92f4", name: "Noyer" },
    { id: "68ff40f1c117aceec20a92f5", name: "Acier" },
    { id: "68ff4154c117aceec20a92fb", name: "Inox" },
    { id: "68ff4160c117aceec20a92fc", name: "Aluminium" },
  ];

  const handleSubmit = async (formData) => {
    const name = formData.get("name");
    const category_id = formData.get("category_id");
    const qty = Number(formData.get("qty"));
    const materials = materialsSelected
      .filter((m) => m.id)
      .map((m) => ({ material_id: m.id, qty: m.qty }));

    const body = JSON.stringify({ name, category_id, qty, materials });

    try {
      const response = await fetch(`${API_URL}/furniture/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user}`,
        },
        body,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || "Erreur inconnue");
        return;
      }

      navigate("/admin/dashboard?success=true");
    } catch (err) {
      console.error(err);
      setError("Erreur serveur");
    }
  };

  const addMaterialField = () => {
    setMaterialsSelected([...materialsSelected, { id: "", qty: 1 }]);
  };

  const updateMaterial = (index, field, value) => {
    const updated = [...materialsSelected];
    updated[index][field] = field === "qty" ? Number(value) : value;
    setMaterialsSelected(updated);
  };

  const removeMaterialField = (index) => {
    setMaterialsSelected(materialsSelected.filter((_, i) => i !== index));
  };

  return (
    <section className="min-h-[85vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-2xl border border-gray-100 p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-gray-900">
            Ajouter un meuble
          </h1>
          <p className="text-gray-500 text-sm">
            Remplissez les informations ci-dessous
          </p>
        </div>

        <form
          action={handleSubmit}
          method="post"
          className="flex flex-col space-y-4"
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nom
            </label>
            <input
              type="text"
              name="name"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Nom du meuble"
            />
          </div>

          <div>
            <label
              htmlFor="category_id"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Catégorie
            </label>
            <select
              name="category_id"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="qty"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Quantité de meubles
            </label>
            <input
              type="number"
              name="qty"
              min="1"
              defaultValue="1"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          {/* MATÉRIAUX */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Matériaux utilisés
            </label>

            <div className="space-y-3">
              {materialsSelected.map((m, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 border border-gray-200 rounded-lg p-2"
                >
                  <select
                    value={m.id}
                    onChange={(e) =>
                      updateMaterial(index, "id", e.target.value)
                    }
                    className="flex-1 border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">-- Choisir un matériau --</option>
                    {materials.map((mat) => (
                      <option key={mat.id} value={mat.id}>
                        {mat.name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="number"
                    min="1"
                    value={m.qty}
                    onChange={(e) =>
                      updateMaterial(index, "qty", e.target.value)
                    }
                    className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-center focus:ring-2 focus:ring-blue-500"
                  />

                  {materialsSelected.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMaterialField(index)}
                      className="text-red-500 hover:text-red-700 font-bold"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addMaterialField}
              className="text-blue-600 text-sm mt-2 font-medium hover:underline"
            >
              + Ajouter un matériau
            </button>
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center font-medium bg-red-50 border border-red-100 py-2 rounded-lg">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full cursor-pointer bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all shadow-sm hover:shadow-md"
          >
            Créer
          </button>
        </form>
      </div>
    </section>
  );
}
