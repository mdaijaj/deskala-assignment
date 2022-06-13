const mongoose=require('../database/db');
const Schema = mongoose.Schema

let candidateSchema=  new Schema({
    name: {
        type: String,
        required:true,
        trim: true,

    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'],
        // required: true,
    },
    dob: {
     type: Date,
    //  required: true
    },
    age: {
        type: Number,
       //  required: true
    },
    address: {
        type: String,
        trim: true
    },
    state:{
        type: String,
        trim: true,
    },
    pincode: {
        type: String,
        // required: [true, "phone number is required"],
        validate: {
            validator: (v)=> {
                return v.length== 6
            }
        }
    },
    result :{
        type: String,
        enum : ['shortList','rejected'],
        default: 'shortList'
    }
   }, 
   {
    timestamps: true}
);   

const Candidate=mongoose.model('Candidate', candidateSchema);
module.exports= Candidate;