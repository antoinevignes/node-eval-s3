import FurnitureMaterial from "../models/furniture_material.model.js";

export async function getMaterialUsage(req, res) {
  try {
    const results = await FurnitureMaterial.aggregate([
      {
        $lookup: {
          from: "materials",
          localField: "material_id",
          foreignField: "_id",
          as: "material",
        },
      },
      { $unwind: "$material" },
      {
        $group: {
          _id: {
            id: "$material._id",
            name: "$material.name",
          },
          totalUsed: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          material_id: "$_id.id",
          name: "$_id.name",
          totalUsed: 1,
        },
      },
      { $sort: { totalUsed: -1 } },
    ]);

    res.status(200).json(results);
  } catch (error) {
    console.error("Erreur récupération stat:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}

export async function getMaterialUsageByCompany(_, res) {
  try {
    const results = await FurnitureMaterial.aggregate([
      {
        $lookup: {
          from: "materials",
          localField: "material_id",
          foreignField: "_id",
          as: "material",
        },
      },
      { $unwind: "$material" },
      {
        $lookup: {
          from: "companies",
          localField: "material.company_id",
          foreignField: "_id",
          as: "company",
        },
      },
      { $unwind: "$company" },
      {
        $group: {
          _id: "$company.name",
          totalMaterialsUsed: { $sum: 1 },
        },
      },
      { $sort: { totalMaterialsUsed: -1 } },
      {
        $project: {
          _id: 0,
          name: "$_id",
          totalMaterialsUsed: 1,
        },
      },
    ]);

    res.status(200).json(results);
  } catch (error) {
    console.error("Erreur récupération stat:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}
