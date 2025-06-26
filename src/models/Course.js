import mongoose from "mongoose";

const courseSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    id:{
      type:Number,
      required:true
    
    },
    user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
    description:{type:String}
  }
)
export default mongoose.model("Course",courseSchema);