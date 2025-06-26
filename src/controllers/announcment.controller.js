
import announcment from "../models/announcements.js"
import User from "../models/User.js"
import { authmiddleware } from "../utils/middleware.js";

export const  postannouncement=async(req,res)=>{ 
     console.log("chal rha hun")
     const {announcment}=req.body;    //  chaliye iska algo banate hai sabse phele
    //  console.log(announcment)      // apke kay postam kei andar data pass kr dena hai jese ki annoumcnent kei liye chala jaega
                                      // uske baad apke kau login karake req.user.id kei jake login id leke ana hai
      try{                           // agar id kay chek krne kai baad user kaa role agar facutlty yaa fir admin hai 
                                       // tau usko access dei dena hai aur agar nhi hai tau fir warning ya fir error thoru kr denahuta hai
     
     const userId=req.user.id
    //  console.log(userId)
        if(!announcment){
           
          res.status(401).json({
            message:"feilds are missing "
          })
          console.log("hoho")
        }
        
             console.log("yup mera tera sabka")
          const newUser=await User.findById(userId);
         
           console.log(newUser.role);
        if(newUser.role=="admin"||newUser.role=="faculty"){
            const newAnnouncement = new announcment({
       message: announcment,
      createdBy: userId,
    });
         await newAnnouncement.save();
        
        return res.status(201).json({
          message:"user is saved successfully "
        })
      }
    
    return res.status(401).json({
          message:"your are unknow user for my self  is saved successfully "
        })
      }
      catch(err){
           res.status(500).json({
            message:"something is fissy in it"
           })
      }
}

export const getannouncement= async (req,res)=>{   // ek baar iske auth controller aur dekh lena bss fir kam 
     const userId=req.user.id;
     try{
        if(!userId){
          res.status(400).json({
            message:" deatils not found"
          })
        
        }
          const announcmentdetils=await announcment.find({User:userId});
          console.log(announcmentdetils+"this is ")
          res.status(201).json({
            id:announcmentdetils
          })
     }
     catch(err){
      res.status(500).json({
        message:"something is fissiy in it"
      })
     }
}
