const question =require("../mode/questionSchme")

const getQuestion = async (req,res)=>{
   questionData= await question.find()
    res.json(questionData)
}

const createQuestion = async (req,res)=>{

    const questionData =await question.create({
        question:req.body.question
    })
    res.json(questionData)
 }

 const editQuestion = async(req,res)=>{
    questionData= await question.findById(req.params.id)
    if (questionData){
        questionData.question = req.body.question
        const saveData = await questionData.save()
        res.json(saveData)
    }
 } 
 const deleteQuestion = async (req,res)=>{
    const questionData = await question.findByIdAndDelete(req.params.id)
    res.json(questionData)
 }
 module.exports={
    getQuestion,
    createQuestion,
    deleteQuestion,
    editQuestion
 }