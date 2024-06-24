import {User} from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import multer from 'multer'
import path from 'path'
//user registration
export const register = async(req,res)=>{
    try {
        const {fullname,username,email,password,confirmPassword} = req.body;
        if(!fullname || !username || !email || !password || !confirmPassword){
            return res.status(400).json({msg:'Please fill in all fields.'})
        }
        if(password !== confirmPassword){
            return res.status(400).json({msg:'Passwords do not match.'})
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({msg:"User already exists"})
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);
        const newUser = await User.create({
            fullname,
            username,
            email,
            password:hashPassword,
        })
        if(newUser){
            res.status(200).send(newUser);
        }
        
    } catch (error) {
        console.log(error)
    }
}

//user login
export const login = async(req,res)=>{
    try {
        const {username,password} = req.body;
        if(!username || !password){
            res.status(400).json({msg:"Enter all fields"})
        }
        const user = await User.findOne({username});
        if(!user){
            res.status(400).json({msg:"User doesn't exists"})
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch){
            res.status(400).json({msg:"Incorrect password or username"})
        }
        const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'1d'});

        res.status(200).cookie("token",token,{
            httpOnly:true
        })
        return res.json({user})
    } catch (error) {
        console.log(error)
    }
}

//user logout 
export const logout = async (req,res)=>{
    try {
        return res.status(200).cookie("token","").json({msg:"Logged out successfully!"})
    } catch (error) {
        console.log(error)
    }
}

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        const sanitizedFilename = file.originalname.replace(/\s+/g, '_')
        cb(null,`${Date.now()}_${sanitizedFilename}`)
    }
})

export const upload = multer({storage:storage})


//edit bio
export const edit =  async(req,res)=>{
   try {
        const {id} = req.params;
        const file = req.file;
        console.log(file);
        const {bio} = req.body;
        const user = await User.findByIdAndUpdate(id,{bio:bio,profilePic:file.filename},{new:true});
        if(!user){
            res.status(404).json({msg:"User not found"})
        }
        res.status(200).json({user});
   } catch (error) {
    console.log(error)
   }
}



export const fetchAuthUser = async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id)
        if(!user){
            res.status(400).json({msg:"User not found"})
        }
        res.status(200).send(user);
    } catch (error) {
        console.log(error)
    }
}

export const getOtherUsers = async(req,res)=>{
    try {
        const {id} = req.params;
        const users = await User.find({_id:{$ne:id}}).select("-password")
        if(!users){
            res.status(400).json({msg:"No users found!"})
        }
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
    }
}

