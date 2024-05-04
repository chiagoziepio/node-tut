const express = require("express")
const http = require("http");
const fs = require('fs');
const fspromises = require("fs").promises
const path = require("path")
const { logger } = require("./middleware/logEvent");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler")

const app = express()
const PORT = process.env.PORT || 5000
// the ^/$|/index.html means the it can accept only the the / or /index.html
// to make the extension of.html optional, we will have to add (.html)?


// middlewares


// custom middleware
// to write a cleaner code, it will be nice if we this logger middleware in the eventevent file
/* app.use((req,res, next)=>{
    logEvent(`${req.method}\t${req.headers.origin}\t${req.url}`)
    console.log(`${req.method} ${req.path}`);
    next();
}); */

app.use(logger)
//third party middleware

// cors prevents cross-origin sharing
// to put  the origin that should bre allowed to make request to your server, we have putit in  an array otherwise leave cors open to accept every origin : app.use(cors())

const acceptedOrigin = ["https://www.mysite.com","http://127.0.0.1:1573", "https://localhost:500"]

const corsOptions = {
    origin: (origin, callback)=>{
        if(acceptedOrigin.indexOf(origin) !== -1 || !origin){
            callback(null, true)
        }else{
            callback(new Error("not allowed by cors"))
        }
    },
    optionsSuccessStatus:200
}

app.use(cors(corsOptions))

// built-in node middleware
// mainly for form data
app.use(express.urlencoded({extended:false}));


// for json
app.use(express.json())

app.use(express.static(path.join(__dirname, '/public')))


app.get("^/$|/index(.html)?", (req, res)=>{
    res.sendFile(path.join(__dirname, "pages", "index.html"))
});
app.get("/new-page(.html)?", (req,res)=>{
    res.sendFile(path.join(__dirname, "pages", "new-page.html"))
}); 
// how express handles redirect

app.get("/old-page(.html)?", (req, res)=>{
    // using the express redirect method, we will have to specify (301) the statuscode because express will send 302 which is not a permanent redirect
    res.redirect(301, "/new-page.html")
} )
app.get("/*", (req, res)=>{
    res.status(400).sendFile(path.join(__dirname, "pages", "error.html"))
})

// for handling express errors in a custom way

app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log(`server listening on ${PORT}`);
})