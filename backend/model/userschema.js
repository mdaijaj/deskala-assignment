const mongoose=require('../database/db');
const Schema = mongoose.Schema
const Bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');

let userSchema=  new Schema({
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        // required: true,
    },
    phone: {
        type: String,
        // required: [true, "phone number is required"],
        validate: {
            validator: (v)=> {
                return v.length== 10
            }
        }
    },
    password: {
     type: String,
    //  required: true
    },
    tokens: [
        {
            token:{
                type: String,
                required: true
            } 
        }
    ]}, {
    timestamps: true
});   

//hashing password
userSchema.pre("save", async function (next){
    console.log("Hi i am pre password using...")
    if(this.isModified('password')){
        console.log("password modified...")
        this.password= await Bcrypt.hash(this.password, 12)
    }
    next()
})

userSchema.methods.generateAuthToken= async function(){
    try{
        let token=jwt.sign({_id: this._id}, "aijajkhan");
        console.log("token", token)
        this.tokens= this.tokens.concat({token: token});
        // console.log("token", this.tokens)
        await this.save();
        return token;
    }
    catch(err){
        console.log("not token verify", err.message)
    }
}

const User=mongoose.model('User', userSchema);
module.exports= User;