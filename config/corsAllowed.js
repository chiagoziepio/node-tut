const acceptedOrigin = [
    "https://www.mysite.com",
    "http://127.0.0.1:1573", 
    "https://localhost:500"]

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
