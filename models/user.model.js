const mongoose = require('mongoose');
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const AccessSecret = "danish";
const RefreshSecret = "sydan";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
        index: true
    },
    name: {
        type: String,
        require: true,
        lowercase: true,
    },
    avatar: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        require: true,
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }],
    refreshToken: {
        type: String,
    }
}, {
    timestamps: true
})

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10);
    next();
})

UserSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

UserSchema.methods.generateAccessToken = async function () {
    return jwt.sign({
        _id: this._id,
    }, AccessSecret, { expiresIn: "1d" })
}

UserSchema.methods.generateRefreshToken = async function (password) {
    return jwt.sign({
        _id: this._id,
    }, RefreshSecret, { expiresIn: "10d" })
}

export const User = mongoose.model('User', UserSchema);