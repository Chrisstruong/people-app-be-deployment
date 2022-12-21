const { response } = require('express')
const  express = require('express')
const router = express.Router()

// import model (People)
const {People} = require('../models')
const db = require('../models')
// const People = require('../models/People')
console.log(People)


// Routes
// http://localhost:4000/people/
router.get('/', async (req,res, next)=>{
    // res.status(200).json({message: "people index route"})
    try {
        const allPeople = await People.find({})
        res.status(200).json(allPeople)
    } catch (err){
        res.status(400).json({error: err})
    }
    
})

// http://localhost:4000/people/

// People create route
router.post('/', async (req,res, next)=>{
    console.log(req.body)
    // res.status(200).json({message: "people create route"})
    try{
        // 
        const newPerson = await People.create(req.body)
        res.status(201).json(newPerson)
    } catch(err){
        res.status(400).json({error: err})
    }
})

// People Show Route
router.get('/:id', async(req,res, next)=>{
    // res.status(200).json({message: "people index route: " + req.params.id})
    try {
        const foundPeople = await People.findById(req.params.id)
        res.status(200).json(foundPeople)
    } catch(err) {
        res.status(400).json({error: err})
    }
})

// Peple delete route
router.delete('/:id', async(req, res, next)=>{
    // res.status(200).json({message: "people delete route: " +req.params.id})
    try {
        const deletedPeople = await People.findByIdAndDelete(req.params.id)
        res.redirect('/people')
    } catch(err) {
        res.status(400).json({error: err})
    }
})

// people update route
router.put('/:id', async(req, res, next)=>{
    // res.status(200).json({message: "people update route: " + req.params.id})
    try {
        const updatedPeople = await People.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).json(updatedPeople)
    } catch(err) {
        res.status(400).json({error: err})
    }
})

// http://localhost:4000/people/:id - GET
// http://localhost:4000/people/:id - DELETE
// http://localhost:4000/people/:id - PUT
module.exports = router