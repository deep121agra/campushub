import { authmiddleware } from "../utils/middleware.js";
import Result from "../models/result.js";
import User from "../models/User.js"




export const createResult = async (req, res) => {
  try {
    const { user, course, grade, marks } = req.body;
     const userId=req.user.id
     const Userfind=await User.findById(userId);

    // Validate required fields
    if (!user || !course || !grade || marks == null) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if(Userfind.role=="admin"){
 // Create and save the result
    const newResult = new Result({
      user,
      course,
      grade,
      marks,
    });

    await newResult.save();

    res.status(201).json({
      message: "Result created successfully",
      result: newResult,
    });
    }
    else{
      res.status(401).json({
        message:"not have a access of it sorrry"
      })
    }

   
  } catch (error) {
    res.status(500).json({
      message: "Server error while creating result",
      error: error.message,
    });
  }
};


export const getResults = async (req, res) => {
  try {
    const userId = req.user.id; // ✅ From auth middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.role === "teacher") {
      const allResults = await Result.find()
        .populate("user", "name email")
        .populate("course", "title");
      return res.status(200).json({ results: allResults });
    }

    if (user.role === "student") {
      const studentResults = await Result.find({ user: userId })
        .populate("course", "title");
      return res.status(200).json({ results: studentResults });
    }

    res.status(403).json({ message: "Unauthorized role" });
  } catch (error) {
    res.status(500).json({
      message: "Server error while fetching results",
      error: error.message,
    });
  }
}