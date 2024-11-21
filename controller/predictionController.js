const axios = require('axios');
const Analysis = require("../mode/analysisSchema")
const Question = require("../mode/questionSchme")
const Recomendation = require("../mode/sugessionSchema")

async function saveAnalysis(userId, analysisData, carbonFootprint) {
    try {
        // Create a new analysis document
        const newAnalysis = new Analysis({
            userId: userId, // The ID of the user submitting the analysis
            analysis: analysisData, // Array of question-answer pairs
            carbonFootprint: carbonFootprint // Calculated carbon footprint value
        });

        // Save the document to the database
        await newAnalysis.save();

        console.log('Analysis saved successfully!');
    } catch (error) {
        console.error('Error saving analysis:', error);
    }
}
async function saveRecommendation (userId, recomednation){
    try{
        const newRecomendation = new Recomendation({
            userId:userId,
            recommendation:recomednation
        })
        await newRecomendation.save()
    }catch(e){
        console.log(e)

    }
}
async function prediction(req, res) {
    const answers = req.body.answers;
    const answerArray = Object.values(answers)
    const userData= req.body.userData
  
        const question = await Question.find()
     
        

  
    const analysisData = question.map((question, index) => ({
        question: question._id,  // ObjectId of the question
        answer: answerArray[index].toString() // Answer corresponding to this question
    }));

const userId = userData._id


try {
    // Make a POST request to the Flask API
    const response = await axios.post('https://finalyearproject-py.onrender.com/predict', answers);
    
    // Get the predictions and suggestions from the Flask API
    const { carbon_footprint, suggestions } = response.data;
    
    // Send the response back to the user
    res.json({
        carbon_footprint,
        suggestions
    });

        saveAnalysis(userId, analysisData, carbon_footprint);
        saveRecommendation(userId,suggestions)
    
    } catch (error) {
        console.error('Error calling Flask API:', error);
        res.status(500).json({ error: 'Error processing your request' });
    }
};

module.exports ={prediction}

