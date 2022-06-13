const jwt= require('jsonwebtoken');
const User= require('../model/userschema');

const authenticate= async(req,res,next)=>{
    console.log("req.cookies.token", req.cookies)
    const token=req.cookies.jwtToken;
    console.log("token", token)
    try{
        if(token){
            const verifyToken=await jwt.verify(token, "aijajkhan");
            console.log("verifyToken,", verifyToken)
            
            const userRouter= await User.findOne({_id: verifyToken._id, 'tokens.token': token})
            // console.log("userRouter", userRouter)
            if(!userRouter){ throw new Error("User not found.")}

            req.token=token;
            req.userRouter= userRouter;
            req.UserId=userRouter._id
            next();
        }else{
            return res.status(401).send('/')        
        }
    }catch(err){
        console.log(err.message)
        res.status(401).send("Unauthorized: no token provide")
    }
}

module.exports={
    authenticate
}