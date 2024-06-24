import mongoose from "mongoose";

const dbConnection = async ()=>{
    const db = await mongoose.connect(`${process.env.MONGO_URI}/twitterDB`).then(()=>{
        console.log("DB is connected");
    }).catch(()=>{
        console.log("DB connection failed");
    })
}

export default dbConnection;