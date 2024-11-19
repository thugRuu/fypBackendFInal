const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authmiddleware"); // Import the protect middleware
const { createAnalysis,getAnalysisWithDetails,getAllUsersWithAnalysis,getUserAnswers, deleteAnalysis } = require("../controller/analysisController"); // Import the controller function

// Define the route with the protect middleware
router.route("/").post(createAnalysis).get(getAllUsersWithAnalysis); // Apply the protect middleware before the createAnalysis handler
router.route('/:id').get(getAnalysisWithDetails).delete(deleteAnalysis)
router.route("/answer/:id").get(getUserAnswers)
module.exports = router;
