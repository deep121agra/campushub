import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
import crypto from "crypto";
import User from "../models/User.js"


export const getAllUsers = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const newUser = await User.findById(userId);

    if (!newUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (newUser.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const users = await User.find();
    return res.status(200).json({ users });

  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching users",
      error: error.message,
    });
  }
};