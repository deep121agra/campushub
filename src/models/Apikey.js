import mongoose from "mongoose";


const apikeys= new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  key:{type:String,unique:true},
  createdAt:{type:Date,default:Date.now}
})
export default mongoose.model("api",apikeys)