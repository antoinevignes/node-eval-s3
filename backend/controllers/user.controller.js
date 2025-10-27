import dotenv from "dotenv";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

dotenv.config();

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res.status(400).json({ message: "Tous les champs sont requis" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Cet utilisateur existe déjà" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Utilisateur créé avec succès", user });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
}
