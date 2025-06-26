import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()
const mongodburl=process.env.MONGODBURL;
export const db=()=>mongoose.connect(mongodburl).then(()=>{
  console.log("your data is conntect suceessfully")
})
.catch((err)=>{
  console.log(err);
})