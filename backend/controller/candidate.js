const Bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Candidate = require('../model/candidate');
const mongoose= require('mongoose')

//add candidate admin only
const newCandidate = async (req, res) => {
    try {
        console.log("req.body", req.body)
        const candidateInf = req.body
        const candidateData = await Candidate.create({
            name: candidateInf.name,
            dob: candidateInf.dob,
            age: candidateInf.age,
            email: candidateInf.email,
            address: candidateInf.address,
            state: candidateInf.state,
            pincode: candidateInf.pincode,
            result: candidateInf.result
        })
        console.log("kishan", candidateData)
        return res.status(200).send({
            message: "admin hotel add succuess",
            data: candidateData
        })
    }
    catch (err) {
        console.log(err.message)
    }
}


// all candidate get information
const allCandidate = async (req, res) => {
    try {
        const candidateData = await Candidate.find()
        console.log('candidateData', candidateData)
        return res.status(200).send({
            message: "get all hotel list ",
            data: candidateData
        })
    }
    catch (err) {
        console.log(err.message)
    }
}


// one candidate get details
const candidateDetails = async (req, res) => {
    try {
        console.log(req.params._id)
        const candidateData = await Hotels.findById({
            _id: req.params.id
        })
        if (!candidateData || candidateData == undefined) {
            return res.send("not found hotel")
        }
        return res.status(200).send({
            message: "user resitered save data",
            data: candidateData
        })
    }
    catch (err) {
        console.log(err.message)
    }
}


//update candidate information
const editCandidate = async (req, res) => {
    try {
        const { name, dob, age, email, address, state, pincode, result } = req.body
        const updateData = await Candidate.findByIdAndUpdate({ _id: req.params.id }, {
            $set: { name, dob, age, email, address, state, pincode, result}
        })
        console.log("updateData", updateData)
        res.send({ status: "update data successfully! ", "result": updateData })
    }
    catch (err) {
        console.log(err.message)
    }
}


//delete candidate details
const deleteCandidate = async (req, res) => {
    try {
        console.log(new mongoose.Types.ObjectId())
        const itemId=req.query._id
        const deleteInf = await Candidate.findByIdAndRemove({_id: itemId});
        console.log("delete successfully!", deleteInf)
        return res.send({ message: "delete successfully!", status: "success" })
    } catch (err) {
        console.log("error  while deleting...")
        console.log(err.message)
    }
}



module.exports = {
    newCandidate,
    allCandidate,
    candidateDetails,
    editCandidate,
    deleteCandidate
}