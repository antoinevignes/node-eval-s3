import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./routes/index.js";
import { verifyToken } from "./middlewares/authMiddleware.js";
import cors from "cors";

dotenv.config();
const { PORT, MONGO_URL } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

try {
  await mongoose.connect(MONGO_URL);
  console.log("Connected to MongoDB");
} catch (err) {
  console.error("MongoDB connection error:", err);
}

app.use(router);

app.get("/api/profile", verifyToken, (req, res) => {
  res.json({ message: `Bienvenue ${req.user.email}` });
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
