import express from 'express';
import cookieParser from 'cookie-parser'
import cors from 'cors';
import { connectToMongo } from './db.js';

connectToMongo;

const app=express();
app.use(cors({
        origin:'wwww.localhost:4000.com',
        credentials:true,
}))
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))
app.use(cookieParser())


//Routes
import userRouter from './routes/user.route.js'
app.use("/api/user",userRouter);

app.listen(4000,()=>{
    console.log("Server running");
});