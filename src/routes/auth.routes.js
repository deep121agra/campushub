import express from "express";
import {authmiddleware} from "../utils/middleware.js";
import {register,login,apikey,me } from "../controllers/auth.controller.js"

const authroutes=express.Router();

authroutes.post("/register",register);
authroutes.post("/login",login);
authroutes.post("/apikey",apikey);
authroutes.get("/me",me);

export default authroutes;
