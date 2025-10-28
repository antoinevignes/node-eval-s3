import mongoose from "mongoose";
import Furniture from "../models/furniture.model.js";
import FurnitureMaterial from "../models/furniture_material.model.js";

export async function addFurniture(req, res) {
  try {
    const { name, category_id, materials } = req.body;

    if (!name || !category_id) {
      return res.status(400).json({ message: "Tous les champs sont requis" });
    }

    const existingFurniture = await Furniture.findOne({ name });
    if (existingFurniture)
      return res.status(400).json({
        message: "Ce meuble existe déjà, veuillez en augmenter la quantité",
      });

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
          qty: 1,
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

export async function getFurnitureById(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const furniture = await Furniture.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
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

    if (!furniture || furniture.length === 0) {
      return res.status(404).json({ message: "Meuble non trouvé" });
    }

    res.status(200).json(furniture[0]);
  } catch (error) {
    console.error("Erreur récupération meuble:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

export async function updateQtyById(req, res) {
  try {
    const { id } = req.params;
    const { qty } = req.body;

    if (typeof qty !== "number") {
      return res.status(400).json({ message: "qty doit être un nombre" });
    }

    const furniture = await Furniture.findById(id);
    if (!furniture) {
      return res.status(404).json({ message: "Meuble non trouvé" });
    }

    furniture.qty = qty;
    await furniture.save();

    res.status(200).json({
      message: `Quantité mise à jour`,
      quantity: furniture.qty,
    });
  } catch (err) {
    console.error("Erreur MAJ quantité:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}
