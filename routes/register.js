const express = require("express");
const router = express.Router()
const handleNewusers = require("../controllers/usersContoller");

router.post("/",handleNewusers);

module.exports = router