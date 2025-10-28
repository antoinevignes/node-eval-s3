import FurnitureMaterial from "../models/furniture_material.model.js";

export async function getMaterialUsageByCompany(req, res) {
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

    res.json(results);
  } catch (error) {
    console.error("Erreur récupération entreprises:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
}
