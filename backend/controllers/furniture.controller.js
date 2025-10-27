import Furniture from "../models/furniture.model.js";
import "../models/category.model.js";

export async function addFurniture(req, res) {
  try {
    const { name, category_id } = req.body;

    if (!name || !category_id) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const furniture = await Furniture.create({
      name,
      category_id,
    });

    res.status(201).json({ message: "Meuble créé avec succès", furniture });
  } catch (error) {
    console.error("Erreur création meuble:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

export async function getFurnitures(_, res) {
  const furnitures = await Furniture.find().populate("category_id");
  res.json(furnitures);
}
