import mongoose from "mongoose";

const furnitureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
});

export default mongoose.model("Furniture", furnitureSchema);
