import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import { connectToMongo } from './db.js';
import dotenv from 'dotenv'
dotenv.config();

connectToMongo;

const app=express();
app.use(cors({
        origin:'https://sweep-tweets.vercel.app',
        credentials:true,
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//Routes
import userRouter from './routes/user.route.js'
import postRouter from './routes/post.route.js'

app.use("/api/user",userRouter);
app.use("/api/post",postRouter);

app.listen(process.env.PORT,()=>{
    console.log("Server running");
});