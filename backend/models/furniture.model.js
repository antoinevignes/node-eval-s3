import mongoose from "mongoose";

const furnitureSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  qty: { type: Number, default: 1, min: 1 },
});

export default mongoose.model("Furniture", furnitureSchema);
