const express = require("express")
const router = express.Router();
const refreshTokencontroller = require("../controllers/refreshTokencontroller");

router.get("/", refreshTokencontroller)

module.exports = router