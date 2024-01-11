const asyncHandler= (requestHandler)=>{
    return async (req,res,next)=>{
        return Promise.resolve(requestHandler(req,res,next))
        .catch((err)=>next(err))
    }
}

export {asyncHandler}