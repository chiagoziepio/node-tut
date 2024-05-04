const express = require("express")
const http = require("http");
const fs = require('fs');
const fspromises = require("fs").promises
const path = require("path")

const app = express()
const PORT = process.env.PORT || 5000
// the ^/$|/index.html means the it can accept only the the / or /index.html
// to make the extension of.html optional, we will have to add (.html)?

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



app.listen(PORT, ()=>{
    console.log(`server listening on ${PORT}`);
})