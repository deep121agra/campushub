import express from "express";
 import jwt from "jsonwebtoken";
import User from "../models/User.js";
import cookieParser from "cookie-parser";

 export const authmiddleware = async (req, res, next) => {
  try {
    console.log("yah tak aa gya hun")
    const token = req.cookies.jwt || req.headers.authorization?.split(" ")[1];
    console.log("Extracted Token:", token);

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);

    const user = await User.findById(decoded.id).select("id name email role"); 
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    console.log("User in authMiddle:", req.user);
    next();
  } catch (error) {
    console.error("Authentication Error:", error.message);
    res.status(500).json({ message: "Error authenticating user", error: error.message });
  }
};