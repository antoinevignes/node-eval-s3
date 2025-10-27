import Furniture from "../models/furniture.model.js";
import FurnitureMaterial from "../models/furniture_material.model.js";

export async function addFurniture(req, res) {
  try {
    const { name, category_id, materials } = req.body;

    if (!name || !category_id) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const furniture = await Furniture.create({ name, category_id });

    if (materials && Array.isArray(materials)) {
      const relations = materials.map((material_id) => ({
        furniture_id: furniture._id,
        material_id,
      }));

      await FurnitureMaterial.insertMany(relations);
    }

    res
      .status(201)
      .json({ message: "Meuble et matériaux créés avec succès", furniture });
  } catch (error) {
    console.error("Erreur création meuble:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

export async function getFurnitures(_, res) {
  try {
    const furnitures = await Furniture.aggregate([
      {
        $lookup: {
          from: "categories",
          localField: "category_id",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $lookup: {
          from: "furniture_materials",
          localField: "_id",
          foreignField: "furniture_id",
          as: "furniture_materials",
        },
      },
      {
        $lookup: {
          from: "materials",
          localField: "furniture_materials.material_id",
          foreignField: "_id",
          as: "materials",
        },
      },
      {
        $lookup: {
          from: "companies",
          localField: "materials.company_id",
          foreignField: "_id",
          as: "companies",
        },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          created_at: 1,
          category: { name: 1, _id: 1 },
          materials: { name: 1, type: 1, _id: 1 },
          companies: { name: 1, _id: 1 },
        },
      },
    ]);

    res.status(200).json(furnitures);
  } catch (err) {
    console.error("Erreur récupération meubles:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}
