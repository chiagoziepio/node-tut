const express = require("express");
const router = express.Router();
const path = require("path");

 // this handles for root file routing

 
router.get("^/$|/index(.html)?", (req, res)=>{
    res.sendFile(path.join(__dirname, "..", "pages", "index.html"))
});
router.get("/new-page(.html)?", (req,res)=>{
    res.sendFile(path.join(__dirname, "..", "pages", "new-page.html"))
}); 
// how express handles redirect

router.get("/old-page(.html)?", (req, res)=>{
    // using the express redirect method, we will have to specify (301) the statuscode because express will send 302 which is not a permanent redirect
    res.redirect(301, "/new-page.html")
} )
router.get("/*", (req, res)=>{
    res.status(400).sendFile(path.join(__dirname, "..", "pages", "error.html"))
})

module.exports = router