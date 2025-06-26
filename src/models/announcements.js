import mongoose from "mongoose";

const announcmentsSchema=new mongoose.Schema({
user:{type:mongoose.Schema.Types.ObjectId,ref:"User"},
message:{type:String},
createdAt:{type:Date,default:Date.now}

})
export default mongoose.model("announcement",announcmentsSchema)