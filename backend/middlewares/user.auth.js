import jwt from 'jsonwebtoken'

const isAuthenticated = async (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        res.status(400).json({msg:"User is not authenticated"});
    }
    const decode = jwt.verify(token,process.env.JWT_SECRET);
    if(!decode){
        res.status(401).json({msg:"Invalid Token"})
    }
    req.id = decode.id;
    next();
}
export default isAuthenticated;