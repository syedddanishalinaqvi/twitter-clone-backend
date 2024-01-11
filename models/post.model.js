import mongoose from'mongoose';

const PostSchema=new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user', 
        required: true 
    },
    data:{
        type:String,
        require:true,
    },
    image:{
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