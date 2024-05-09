const express = require("express");
const router = express.Router();

const {getAllWorkers, createNewWorker, updateWorker,deleteWorker, getOneWorker} = require("../../controllers/workersContoller")

router.route("/")
    .get(getAllWorkers)
    .post(createNewWorker)
    .put(updateWorker)
    .delete(deleteWorker);

    router.route("/:id")
        .get(getOneWorker)

module.exports = router