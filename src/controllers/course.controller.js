import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
import crypto from "crypto";
import User from "../models/User.js"
import Course from "../models/Course.js"


export const getallcourse=async(req,res)=>{
  console.log("namaste chaio")
  const userId = req.user.id; // ✅ From auth middleware
  
  
  try{
     const user = await User.findById(userId);
 
     if (!user) {
       return res.status(404).json({ message: "User not found" });
     }
 
     if (user) {
       const allResults = await Course.find()
         .populate("name", "description")
       return res.status(200).json({ results: allResults });
     }
     res.status(403).json({ message: "Unauthorized role" });
   } catch (error) {
     res.status(500).json({
       message: "Server error while fetching results",
       error: error.message,
     });
}
}


export const postcourse=async(req,res)=>{
    const userId = req.user.id; // ✅ From auth middleware
    console.log(userId);
    try {
    const {name,id,description } = req.body;
    console.log(req.body)

    // Validate required fields
    if (!name || !id || !description  == null) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newUser=await User.findById(userId);
    if(newUser.role=="admin"){
      // Create and save the result
    const newCourse = new Course({
      name,
      id,
      description
    });

    await newCourse.save();

    res.status(201).json({
      message: "Result created successfully",
      result: newResult,
    });
    }
    else{
      res.status(401).json({
        message:"it is not accessible for u"
      })
    }

   
  } catch (error) {
    res.status(500).json({
      message: "Server error while creating result",
      error: error.message,
    });
  }

}



// POST /courses/:courseId/materials → Faculty only
export const createMaterial = async (req, res) => {
  try {
    const { courseId } = req.user.id;
    const { title, description, fileUrl } = req.body;

    // Role check: only faculty
    if (req.user.role !== "faculty") {
      return res.status(403).json({ message: "Only faculty can upload materials." });
    }

    // Find course by custom course ID
    const course = await Course.findOne(User.findOne({ courseId}));
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const material = new Material({
      course: course.id, // link to course using Mongo _id
      title,
      description,
      fileUrl
    });

    await material.save();

    res.status(201).json({
      message: "Material uploaded successfully.",
      material
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const getMaterials = async (req, res) => {
  try {
    const { courseId } = req.params;
    const userId = req.user.id;
    const User=await User.findById(userId);
    if(User.role=="faculty"||User.role=="student"){

    const course = await Course.findOne({ _id: courseId, User: userId });

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    const materials = await Material.find({ course: course._id });

    res.status(200).json({
      message: `Materials for course ID ${courseId}`,
      materials,
    });
  }
  else{
    res.status(400).json({
      message:"not have access of it"
    })
  }
  } catch (error) {
    res.status(500).json({ message: "Error fetching materials", error: error.message });
  }
};