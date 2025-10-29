import mongoose from "mongoose";

const furnitureMaterialSchema = new mongoose.Schema({
  furniture_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Furniture",
    required: true,
  },
  material_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Material",
    required: true,
  },
  qty: {
    type: Number,
    required: true,
    default: 1,
    min: 1,
  },
});

export default mongoose.model(
  "FurnitureMaterial",
  furnitureMaterialSchema,
  "furniture_materials"
);
