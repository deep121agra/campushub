import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv"
import crypto from "crypto";
import User from "../models/User.js"


export const register=async(req,res)=>{
  console.log(req.body)
const {name,email,password,role}=req.body;
console.log(name,email,password,role)
  try{
    const existingUser=await User.findOne({email});
    if(existingUser){
      return res.status(401).json({
        error:"User alreasdy exists"
      })
    }
    const hashedPassword=await bcrypt.hash(password,10);
     const newUser=await User.create(
      {
        name,
        email,
        password:hashedPassword,
        role:role||"student"
      }
     );
     const tokenbanao=jwt.sign(  
         {id:newUser._id},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
      
     )

     // set cookike(yei isliye liya gya hai jisse register krne kei baaad automatic sign in hau jaye)
     res.cookie("jwt",tokenbanao,{
      httpOnly:true,
      maxAge:60*60*1000
     })

     res.status(201).json({
      message:"User created successfully",
      user:{
        id:newUser._id,
        name:newUser.name,
        email:newUser.email,
        role:newUser.role
      }
     })
  }
  catch(err){
    console.log(err,"error creating users");
    res.status(500).json({
      error:"something is missing in that users"
    })
  }


}

 export const logout=async(req,res)=>{
  try{
res.clearCookie("jwt",tokenbanao,{
  httpOnly:true
})
res.status(204).json({
  message:"User logged out successfully"
})
  }
  catch(err){
    console.log(err,"error logging out");
    res.status(500).json({
      error:"something is missing in that users"
    })
  }
 }


 export const login=async(req,res)=>{


  // ayiee sabse phele iska alogrithm 
  // sabse phele body sei apan emal and password nikal bayenge
  // useke baad check krenge email kei basis pr kya tum humre database kei anadar present  hau ya nfir nhi
  // agar tum present nhi hau tay fir jao error throw kr day
  // aur agar present hai fir login ka access dei day and cokkies and pareser bhi store kr tay
  // iske alawa aur koi error agar apko dikhaui dei tau fir catch mai dalo aur jake uski khanai khtatm kro 
  try{
    console.log(req.body)
    const {email,password}=req.body;
     const userbanao=await User.findOne({email});
    //  console.log(userbanao);
     if(!userbanao){
      return res.status(401).json({
        error:"User is not present in our database"
      })
     }
     const isMatch=await bcrypt.compare(password,userbanao.password);
      console.log(isMatch)
     if(!isMatch){
      res.status(401).json({
        error:"password is not match "
      })
      }

            // Create JWT token
    const token = jwt.sign(
      { id: userbanao._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );
    console.log(token)
      res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: "Strict",
      secure: process.env.NODE_ENV !== "development",
      maxAge: 1000 * 60 * 60 * 24 * 7  // 7 days
    });


    res.status(200).json({
      message:"User Logged in SUccessfully",
      user:{
        id:userbanao.id,
        name:userbanao.name,
        email:userbanao.email
      }
    })

  }
  catch{
    res.status(500).json({
      error:"something is missing in that users"
    })
  }
 }



 export const apikey=async(req,res)=>{
  const{email}=req.body;
  console.log(email)
  try{
   

    const user=await User.findOne({email});
    console.log(user)
    if(!email){
      res.status(401).json(
        {
          message:"there is nothing is presnet in it"
        }
      )

    }
    const newapikey=crypto.randomBytes(32).toString("hex");
    user.apikey=newapikey;
    await user.save();
    return res.status(201).json({
      message:"Api key is created successfully",
      apikey:newapikey
    })
  }
  catch(error){
     console.log("error there is some missing")
    res.status(500).json(
      {
        error:"there is something fisssing in it "
      }
    )
  }
 }



 export const me=async(req,res)=>{
    // aiye iska bhi algo like hei
    // sabse phele aoo and req.body sei email and name nikalo
    // agar user mile tau fir response mai return kr baa day 
    // agar naa mile tau fir error throw kr day
    // aur agar iske alawa aur koi bhi error hau tau fir catch mai return kr dau 
    // simple hei hai bhaioo yei bhi koi dikkat bala baat nhi hai
    console.log("thi is ")
  const {email}=req.body;
  try{
      const user=await User.findOne({email}); 
      console.log(user)
      if(!user){
        return res.status(401).json({
          error:"user not found"
        })
      }

      res.status(201).json({
          id:user.id,
          email:user.email,
          name:user.name
      })

  }
  catch(error){
    console.log(error,"thiir is some issuse");
    res.status(401).json({
      error:"error is getting there for someone"
    })
  }
}

