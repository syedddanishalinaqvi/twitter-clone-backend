const mongoose=require('mongoose');

const PostSchema=new mongoose.Schema({
    data:{
        type:String,
        require:true,
    },
    image:{
        type:String,
    },
    video:{
        type:String,
    },
    likes:{
        type:Number,
        default:0,
    },
    commentsCount:{
        type: Number,
        default:0,
    }

},{
    timestamps:true,
})

export const Post=mongoose.model("Post",PostSchema);