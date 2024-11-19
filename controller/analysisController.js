const Analysis = require("../mode/analysisSchema");
async function createAnalysis(req, res) {
  try {
    const { user, analysisData } = req.body;

    // Prepare the analysis data for saving
    const analysis = Object.keys(analysisData.questions).map((questionId) => ({
      question: questionId,
      answer: analysisData.questions[questionId],
    }));

    // Find if an analysis already exists for this user
    let userAnalysis = await Analysis.findOne({ userId: user.userId });

    if (userAnalysis) {
      // If an analysis already exists, update it
      userAnalysis.analysis = analysis; // Replace with new analysis data
      await userAnalysis.save();
      res.status(200).json({ message: "Analysis updated successfully!" });
    } else {
      // If no analysis exists for the user, create a new one
      userAnalysis = new Analysis({
        userId: user.userId,
        analysis: analysis,
      });
      await userAnalysis.save();
      res.status(201).json({ message: "Analysis saved successfully!" });
    }
  } catch (error) {
    console.error("Error saving analysis:", error);
    res.status(500).json({ message: "Failed to save analysis" });
  }
}
async function getAllUsersWithAnalysis(req,res) {
  
    try {
      const analyses = await Analysis.find().populate(
        
       "analysis.question",
       
      );
      const filteredAnalyses = analyses.map(analysis => {
        return {
            ...analysis.toObject(),
            analysis: analysis.analysis.map(a => ({
                answer: a.answer,
                question: a.question.question 
            }))
        };
    });
    
       res.json(filteredAnalyses)
  
      return analyses;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

async function getAnalysisWithDetails(req, res) {
    try {
        const analysis = await Analysis.findOne({ userId: req.params.id })
      .populate({
        path: 'userId', // Populate the userId field
        select: 'username', // Only select the username field
      })
      .populate({
        path: 'analysis.question', // Populate the question field in the analysis array
        select: 'question', // Only select the question field
      });

    if (!analysis) {
      return res.json({ message: "Analysis not found" });
    }

    res.status(200).json(analysis);
  } catch (error) {
    console.error("Error retrieving analysis:", error);
    res.status(500).json({ message: "Failed to retrieve analysis" });

      }
}

const getUserAnswers = async (req, res) => {
  console.log(req.params.userID);
  try {
    // Fetch the user details and populate the question field
    const userDetail = await Analysis.findOne({ userId: req.params.id }).populate({
      path: "analysis.question",
      select: "question"
    });

    // Check if user detail is found
    if (!userDetail) {
      return res.status(404).json({ message: "User not found" });
    }

    // Map the answers to the desired format
    const answerArray = userDetail.analysis.map(answer => ({
      question: answer.question.question, // Extract the question text
      answer: answer.answer // Extract the answer
    }));

    // Send the transformed data as JSON response
    res.json(answerArray);
  } catch (error) {
    // Handle server errors
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const deleteAnalysis = async (req,res)=>{
  console.log(req.params.id)
  const userID = req.params.id;

  // Check if userID is provided
  if (!userID) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Attempt to delete the analysis
    const result = await Analysis.deleteOne({ userId: userID });

     // Successful deletion
    res.status(200).json({ message: 'Analysis deleted successfully' });
  } catch (err) {
    // Handle any errors
    console.error(err);
    res.status(500).json({ message: 'Failed to delete analysis', error: err.message });
  }
}





module.exports = { createAnalysis,getAnalysisWithDetails ,getAllUsersWithAnalysis,getUserAnswers,deleteAnalysis };
