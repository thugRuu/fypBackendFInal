const express = require("express");
const router = express.Router();
const { prediction } = require("../controller/predictionController"); // Import the controller function

router.route("/").post(prediction)

module.exports = router