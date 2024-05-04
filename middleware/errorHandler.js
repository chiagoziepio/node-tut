 
  const { logActions } = require("./logEvent")
 const errorHandler = (err, req,res,next)=>{
    logActions(`${err.name}: ${err.message}`, "errorlog.txt")
    console.error(err.stack)
    res.status(500).send(err.message)
}

module.exports = errorHandler