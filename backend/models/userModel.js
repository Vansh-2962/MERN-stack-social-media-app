import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    bio:{
        type:String,
        default:''
    },
    profilePic:{
        type:String,
        default:''
    },
    followers:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
        default:[]
    },
    following:{
        type:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],
        default:[]
    }
})

export const User = mongoose.model('User',userSchema)