const express=require('express')
const users= require('../controller/index')
const {authenticate}=require('../middleware/authentication')
const Candidate = require('../controller/candidate')
const router=express()


//routes
router.post('/signup', users.signup)
router.post('/login', users.login)
// router.get('/contactData', authenticate, users.contactData)


//candidate
router.post('/newcandidate', authenticate, Candidate.newCandidate)
router.get('/allcandidate', authenticate, Candidate.allCandidate)
router.get('/candidatedetails/:_id', authenticate, Candidate.candidateDetails)
router.put('/updatecandidate/:_id', Candidate.editCandidate)
router.delete('/deletecandidate/:itemId', Candidate.deleteCandidate)
 
module.exports={
    router
};