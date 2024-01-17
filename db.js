import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();

const connectToMongo=mongoose.connect(process.env.MONGO_URI)
.then(console.log("Connected"));

export {connectToMongo};