import mongoose from "mongoose";
import Material from "../models/material.model.js";
import "../models/company.model.js";

export async function getMaterialDetails(req, res) {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID invalide" });
    }

    const material = await Material.findById(id).populate("company_id");

    res.status(200).json(material);
  } catch (err) {
    console.error("Erreur récupération matériau:", err);
    res.status(500).json({ message: "Erreur serveur" });
  }
}
