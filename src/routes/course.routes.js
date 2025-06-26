import express from "express";
import {authmiddleware} from "../utils/middleware.js";
import { getallcourse,postcourse ,getMaterials,createMaterial} from "../controllers/course.controller.js";
const courseRoutes=express.Router();

courseRoutes.get("/get/",authmiddleware,getallcourse),
courseRoutes.post("/post/",authmiddleware,postcourse), // try to make it for a admin only 
courseRoutes.post("/:courseId/material/",authmiddleware,createMaterial)  // try to make it for a use for a stuend and faculty
courseRoutes.get("/get/:courseId/material/",authmiddleware,getMaterials )  // try to make it for a use for a stuend and faculty

export default courseRoutes;

