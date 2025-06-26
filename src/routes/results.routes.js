import express from "express";
const resultsroutes=express.Router();
import {authmiddleware} from "../utils/middleware.js";
import {createResult,getResults} from "../controllers/result.controller.js"

resultsroutes.post("/post/results/",authmiddleware,createResult);
resultsroutes.get("/get/results:studentId/",authmiddleware,getResults);  // try to make it like that if we can


export default resultsroutes;




