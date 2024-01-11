import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const checkUser=asyncHandler(async(req,res,next)=>{
    try {
        const token=req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ","");
        if(!token){ res.status(400).json({
            message:"No Authorization found",
        })
    }
       else{
        const definedToken=jwt.verify(token,process.env.ACCESS_SECRET);
        const user=await User.findById(definedToken._id)
        req.user=user;
        next();
       }
    
    } catch (error) {
        res.send(400).json({
            message:"Invalid Authorization",
        })
    }
})
export {checkUser}