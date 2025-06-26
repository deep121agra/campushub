import mongoose from "mongoose";

const resultSchema=new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
  course:{type:mongoose.Schema.Types.ObjectId,ref:"Course"},
  grade:{type:String,require:true},
  marks:{type:Number,require:true},
  
})

export default mongoose.model("Result",resultSchema);