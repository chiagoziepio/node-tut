const {v4: uuid} = require("uuid")
const fs = require("fs")
const fspromises = require("fs").promises
const path = require("path")
const { format } = require("date-fns")


const logActions = async(msg)=>{
    
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${msg}\n\n`;
    console.log(logItem);
    try {
        if(!fs.existsSync(path.join(__dirname,'log'))){
            await fspromises.mkdir(path.join(__dirname, 'log'))
        }
        await fspromises.appendFile(path.join(__dirname, 'log', 'eventslog.txt'), logItem)
    } catch (error) {
        console.error(error);
        
    }
}
module.exports = logActions