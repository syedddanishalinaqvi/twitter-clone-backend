import { asyncHandler } from "../utils/asyncHandler.js";


const userRegisterController=(asyncHandler(async (req,res)=>{
    res.status(200).json({
        message:"Working",
    })
}))

export {userRegisterController}