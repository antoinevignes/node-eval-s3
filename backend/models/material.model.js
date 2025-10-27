import mongoose from "mongoose";

const materialSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  type: { type: String, required: true, unique: true },
  company_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
  description: { type: String, required: true },
});

export default mongoose.model("Material", materialSchema);
