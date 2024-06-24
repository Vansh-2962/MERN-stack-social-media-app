import mongoose from "mongoose";
// tweet model
const tweetSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    likes:{
        type:[{type:mongoose.Schema.Types.ObjectId}],
        require:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

export const Tweet = mongoose.model("Tweet",tweetSchema);