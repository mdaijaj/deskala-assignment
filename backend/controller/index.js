const Bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User= require('../model/userschema');

const signup= async (req,res)=>{
    try{
        const {
            email,
            phone,
            password,
        }= req.body;
        console.log(req.body, "aijaj")
        console.log("body", email, phone, password)
        if( !email || !phone  || !password ){
            console.log("please fill all fields");
        }

        const userExits= await User.find({email:email}).exec()
        if(userExits.length>0){
            console.log("userExits", userExits)
            // res.send("email is already exits in your db...")
            return userExits;
        }

        const user= new User({email, phone, password})
        console.log("user...", user)
        await user.save();
        res.status(200).send({message:"inserted data success", data: user});
    }
    catch(err){
        console.log(err.message)
        console.log("This mail already exists please login.............");
    }
}


const login= async (req,res)=>{
    try{
        const {email, password}=req.body;
        if(!email || !password){
            res.status(400).send("please fill the data...");
        }
        const mail= await User.findOne({email: email})
            if(!mail){
                res.status(400).send({message: "email not found"})
            }else{
                const isMatch=await Bcrypt.compare(password, mail.password);
            console.log("encrypted password match success!")
            // let token =await jwt.sign({ user_detail: mail }, "aijajkhan", {expiresIn: 86400 }); // expires in 24 hours
            let token= await mail.generateAuthToken();
            console.log("token.....", token)

            // res.cookie('token', token, {
            //     expires: new Date(Date.now() + 300000000),
            //     secure: false, // set to true if your using https
            //     httpOnly: true,
            //   });

            res.cookie("jwtToken", token, {
                expires: new Date(Date.now()+ 300000000),
                httpOnly: true
            });
            if(!isMatch){
                res.status(400).send({error: "Invalid Credentials"})
            }else{
                res.send({
                    token: token,
                    user_detail: mail,
                    message: "login Success"
                })
            }
        }
    }
    catch(err){
        console.log(err.message)
        res.send("there is problem to login...")
    } 
}

// const feedback= async(req,res)=>{
//     try{
//         const obj = new Feedback(req.body);
//         const result=await obj.save();
//         console.log("feedback insert successfully!");
//         res.send("feedback sent successfully!");
//     }
//     catch(err){
//         console.log(err.message)
//         res.send(err.message)
//     }
// }


// const contact= async (req,res)=>{
//     try{
//         const {name, email, phone, message}=req.body;
//         if(!name || !email || !phone || message){
//             console.log("user fill all fields")
//             return res.status(401).send("your fill all fields")
//         }
//         const userContact=await User.findOne({_id: req.UserId})

//         console.log("userContact", userContact)
//         if(userContact){
//             const userMessage= await userContact.addMessage(name, email, phone, message);
//             await userContact.save();
//             return res.status(201).send({message: "user message success!"}) 
//         }
//     }
//     catch(err){
//         console.log(err.message)
//         res.status(400).send("error contact page")
//     }
// }

// const about= async(req,res)=>{
//     console.log("about page open");
//     res.send(req.userRouter);
// }

const contactData= async(req,res)=>{
    console.log("about page open");
    res.send(req.userRouter);
}

// const home= async(req,res)=>{
//     console.log("hello about page...")
//     res.send(req.userRouter);
// }


const logout= async(req,res)=>{
    console.log("logout")
    res.clearCookie("jwtToken", {path: '/'})
    res.status(200).send("user logout");
}


module.exports={
    signup,
    login,
    logout,
    contactData
}