import express from "express";
import {authmiddleware} from "../utils/middleware.js";
import  {postannouncement,getannouncement} from "../controllers/announcment.controller.js"

const announcmentroutes=express.Router();

announcmentroutes.post("/POST/announcment",authmiddleware,postannouncement)
announcmentroutes.get("/GET/announcment",authmiddleware,getannouncement);
// announcmentroutes.get("/clicketit",(req,res)=>{
//   res.send("yes yes")
// })   // yei bala check kei liye tha bs
export default announcmentroutes;



