import mongoose from 'mongoose';

const connectToMongo=mongoose.connect("mongodb://localhost:27017/twitter")
.then(console.log("Connected"));

export {connectToMongo};