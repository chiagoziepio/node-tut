const express = require("express")
const http = require("http");
const fs = require('fs');
const fspromises = require("fs").promises
const path = require("path")
const { logger } = require("./middleware/logEvent");
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler")
const corsOptions = require("./config/corsAllowed")
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



app.use(cors(corsOptions))

// built-in node middleware
// mainly for form data
app.use(express.urlencoded({extended:false}));


// for json
app.use(express.json())

app.use(express.static(path.join(__dirname, '/public')))

// router in express uses app.use()

// for the subfolders

app.use("/subfolder", require("./routes/routes"));
// for the api request
app.use("/worker", require("./routes/api/worker"))
//for the root pages
app.use("/", require("./routes/root"))
 
// for handling express errors in a custom way

app.use(errorHandler)


app.listen(PORT, ()=>{
    console.log(`server listening on ${PORT}`);
})