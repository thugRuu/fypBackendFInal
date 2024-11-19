const mongoose = require("mongoose")

const QandA = mongoose.Schema({
    question:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Question'
    },
    answer:{type:String,required:true}
})

const analysisSchema = mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true },                           
    analysis:[QandA],
    carbonFootprint:{
        type: String,
        required:true
    }
}) 

module.exports = mongoose.model("Analysis",analysisSchema)