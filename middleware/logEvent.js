const {v4: uuid} = require("uuid")
const fs = require("fs")
const fspromises = require("fs").promises
const path = require("path")
const { format } = require("date-fns")


const logActions = async(msg, logFile)=>{
    
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${msg}\n\n`;
    console.log(logItem);
    try {
        if(!fs.existsSync(path.join(__dirname, "..", 'log'))){
            await fspromises.mkdir(path.join(__dirname, "..", 'log'))
        }
        await fspromises.appendFile(path.join(__dirname, "..", 'log', logFile), logItem)
    } catch (error) {
        console.error(error);
        
    }
}

const logger = (req,res, next)=>{
    logActions(`${req.method}\t${req.headers.origin}\t${req.url}`, "eventslog.txt")
    console.log(`${req.method} ${req.path}`);
    next();
};
module.exports = {logActions, logger}