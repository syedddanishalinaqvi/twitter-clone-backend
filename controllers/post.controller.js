import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadUsingCloudinary } from "../utils/cloudinary.js";

const addPostToUser = async (userId, postId) => {
    const user = await User.findById(userId);
    user.posts.push(postId);
    const newUser = await user.save();
    return (newUser);
}


const newPostController = (asyncHandler(async (req, res) => {
    const { data } = req.body;
    if (data === "") {
        res.status(400).json({
            message: "Enter some data",
        })
    }
    else {
        if (req.file?.path) {
            const imageUrl = await uploadUsingCloudinary(req.file?.path);
            const post = await Post.create(
                {
                    data,
                    image: imageUrl.url,
                    userId: req.user._id
                }
            );
            const { newUser } = await addPostToUser(req.user._id, post._id);
            res.status(200).json({
                data: newUser,
                post,
                message: "Post added"
            })
        }
        else {
            const post = await Post.create(
                {
                    data,
                    userId: req.user._id
                }
            );
            const { newUser } = await addPostToUser(req.user._id, post._id);
            res.status(200).json({
                data: newUser,
                post,
                message: "Post added"
            })
        }
    }
}));

const postDeleteController = (asyncHandler(async (req, res) => {
    const deletePost = await Post.findById(req.params.id);
    if (!deletePost) {
        res.status(400).json({
            message: "cannot find post"
        })
    }
    else {
        if (deletePost.userId.toString() !== req.user._id.toString()) {
            res.status(400).json({
                message: "You are not authorize To delete it"
            })
        }
        else {
            await Post.findByIdAndDelete(deletePost._id);
            const newUserData = await User.findByIdAndUpdate(deletePost.userId, { $pull: { posts: deletePost._id } }, { new: true })
            res.status(200).json({
                message: "deleted",
                data: newUserData,
            })
        }
    }
}))

export { newPostController, postDeleteController }