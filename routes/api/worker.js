const express = require("express");
const router = express.Router();
const data = {}
data.employees = require("../../data/workers.json");
const datas = data.employees

router.route("/")
    .get((req, res)=>{
        console.log("getting");
        res.json(datas);
    })
    .post((req,res)=>{
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .put((req,res)=>{
        res.json({
            "firstname": req.body.firstname,
            "lastname": req.body.lastname
        })
    })
    .delete((req,res)=>{
        res.json({"id": req.body.id})
    });

    router.route("/:id")
        .get((req,res)=>{
            res.json({"id":req.params.id})
        })

module.exports = router