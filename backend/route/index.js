const express=require('express')
const users= require('../controller/index')
const {authenticate}=require('../middleware/authentication')
const Candidate = require('../controller/candidate')
const router=express()


//users
router.post('/signup', users.signup)
router.post('/login', users.login)


//candidate
router.post('/newcandidate', authenticate, Candidate.newCandidate)
router.get('/allcandidate', authenticate, Candidate.allCandidate)
router.get('/candidatedetails/:_id', authenticate, Candidate.candidateDetails)
router.put('/editcandidate/:id',authenticate, Candidate.editCandidate)
router.delete('/deletecandidate/:id',authenticate, Candidate.deleteCandidate)

module.exports={
    router
};