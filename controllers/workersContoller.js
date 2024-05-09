const data = {
    workers: require("../data/workers.json"),
    setWorker : function(info){
        this.workers = info
    }
}


const getAllWorkers = (req, res)=>{
    console.log("getting");
    res.json(data.workers);
}
const createNewWorker = (req,res)=>{

    const newWorker = {
        id: data.workers.length ? data.workers[data.workers.length -1].id + 1: 1,
        firstname: req.body.firstname,
        lastname: req.body.lastname
    }
    if(!newWorker.firstname || !newWorker.lastname){
        return res.status(400).json({"message": "names are required"})
    }
    data.setWorker([...data.workers, newWorker])
    res.status(201).json(
        data.workers
    )
}

const updateWorker = (req,res)=>{

    const theWorker = data.workers.find(worker => worker.id === parseInt(req.body.id));
    if(!theWorker){
       return res.status(400).json({"messge": `couldnt find a match for ${req.body.id}`})
    }
    if(req.body.firstname) {theWorker.firstname = req.body.firstname}
    if(req.body.lastname) {theWorker.lastname = req.body.lastname}

    const filterworkers = data.workers.filter(worker => worker.id !== parseInt(req.body.id))
    const unsortedWorkers = [...filterworkers, theWorker]
    data.setWorker(unsortedWorkers.sort((a,b)=> a.id> b.id? 1: a.id< b.id? -1 : 0))

    res.json(data.workers)
}

const deleteWorker = (req,res)=>{
    const theWorker = data.workers.find(worker => worker.id === parseInt(req.body.id) )
    if(!theWorker){
        res.status(400).json({"message": `couldnt find a match for ${req.body.id}`})
    }
    const deletedWorker = data.workers.filter(worker => worker.id !== parseInt(req.body.id))
    data.setWorker(/* [...deletedWorker] */ deletedWorker)

    res.json(data.workers)
}

const getOneWorker = (req,res)=>{
    const theWorker = data.workers.find(worker => worker.id === parseInt(req.params.id) )
    if(!theWorker){
        res.status(400).json({"message": `couldnt find a match for ${req.params.id}`})
    }
    res.json(theWorker)
}

module.exports = {getAllWorkers, createNewWorker, updateWorker,deleteWorker, getOneWorker}