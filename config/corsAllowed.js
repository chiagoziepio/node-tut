const acceptedOrigin = require("./acceptedOrigin")
const corsOptions = {
    origin: (origin, callback)=>{
        if(acceptedOrigin.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error("not allowed by cors"))
        }
    },
    optionsSuccessStatus:200
};

module.exports = corsOptions
