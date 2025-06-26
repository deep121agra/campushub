import express from "express";
import cors from "cors";
import {db} from "./src/utils/db.js";
import authroutes from "./src/routes/auth.routes.js";
import announcmentroutes from "./src/routes/anouncement.routes.js";
import adminrouter from "./src/routes/admin.routes.js";
import resultsroutes from "./src/routes/results.routes.js";
import courseRoutes from "./src/routes/course.routes.js";
import cookieParser from "cookie-parser";

const app =express();
app.use(cookieParser())
app.use(cors());
app.use(express.json());
db();

const port = 3000;
app.get("/",(req,res)=>{
  res.send("Hello World!");
})


app.use("/auth/",authroutes);
app.use("/announcement/",announcmentroutes);
app.use("/admin/",adminrouter)
app.use("/results/",resultsroutes)
app.use("/course/",courseRoutes);

app.listen(3000)
