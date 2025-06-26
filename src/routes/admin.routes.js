import express from "express";
import {authmiddleware} from "../utils/middleware.js";

import {getAllUsers} from "../controllers/admin.controller.js"
const adminrouter=express.Router();


adminrouter.get("/get/",authmiddleware,getAllUsers);
// adminrouter.put("/put/admin/users/:id/role",authmiddleware,changeUserrole);

export default adminrouter;






