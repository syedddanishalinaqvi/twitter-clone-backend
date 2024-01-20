import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const generateAccessAndRefreshToken = async(userID) =>{
    try {
        const newUser = await User.findOne({ _id:userID });
        const AccessToken = await newUser.generateAccessToken();
        const RefreshToken = await newUser.generateRefreshToken();
        newUser.refreshToken = RefreshToken;
        await newUser.save({ validateBeforeSave: false },{isNew:true});
        return { AccessToken, RefreshToken,newUser };
    } catch (error) {
        throw new Error("Internal Error")
    }
}


const userRegisterController = (asyncHandler(async (req, res) => {
    const { username, password, email, name, avatar } = req.body;
    if ([username, password, email, name].some((field) => field?.trim() === "")) {
        res.status(400).json({
            message: "Field input is empty",
        })
    }
    const findUser = await User.findOne({ username, });
    if (findUser) {
        res.status(200).json({
            message: "User Exist"
        })
    }
    else{
    const user = await User.create(
        {
            username: username,
            password: password,
            email: email,
            name: name,
            avatar: avatar
        });
    res.status(200).json({
        data: user,
        message: "Signed Up. Moving to Login",
    })
}
}))

const userLoginController = (asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    if (username === "" || password === "") {
        res.status(400).json({
            message: "Enter Username or Password"
        })
    }
    else {
        const user = await User.findOne({ username, })
        if (!user) {
            res.status(404).json({
                message: "User not found"
            })
        }
        else {
            const checkPassword = await user?.isPasswordCorrect(password);
            if (!checkPassword) {
                res.status(400).json({
                    message: "Password Incorrect"
                })
            }
            else{
            const { AccessToken, RefreshToken,newUser } = await generateAccessAndRefreshToken(user._id);
            const options = {
                httpOnly: true,
                secure:true,
                sameSite: 'None',
            }
            res.status(200)
                .cookie("accessToken", AccessToken, options)
                .cookie("refreshToken", RefreshToken, options)
                .json({
                    data: newUser.refreshToken,
                    "refreshToken": RefreshToken,
                    "accessToken": AccessToken,
                    message:"Logged In successfull"
                })
            }
        }
    }
}));
const userLogoutController = (asyncHandler(async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.user._id, 
            {$set: { refreshToken: null}},
            {new:true});
        const options = {
            httpOnly: true,

        }
        res.status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({
                data: user.refreshToken,
                message: "Successfully Logged out"
            })
    }
    catch (error) {
        res.status(400).json({ message: "Cannot find tokens" })
    }
}));

const getUserController=(asyncHandler(async(req,res)=>{
    const currentUser=await User.findOne(req.user._id);
    res.status(200).json({
        data:currentUser,
    })
}))

export { userRegisterController, userLoginController, userLogoutController, getUserController }