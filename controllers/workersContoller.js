const data = {}
data.workers = require("../data/workers.json")

const getAllWorkers = (req, res)=>{
    console.log("getting");
    res.json(data.workers);
}
const createNewWorker = (req,res)=>{
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    })
}

const updateWorker = (req,res)=>{
    res.json({
        "firstname": req.body.firstname,
        "lastname": req.body.lastname
    })
}

const deleteWorker = (req,res)=>{
    res.json({"id": req.body.id})
}

const getOneWorker = (req,res)=>{
    res.json({"id":req.params.id})
}

module.exports = {getAllWorkers, createNewWorker, updateWorker,deleteWorker, getOneWorker}