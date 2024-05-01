const logActions = require("./logEvent");

const EventEmitter = require("events");
class myEmmitter extends EventEmitter {}

const emitter = new myEmmitter()

emitter.on('log', (message)=>logActions(message));

setTimeout(()=>{
 emitter.emit("log", "log event emitted")
}, 2000);