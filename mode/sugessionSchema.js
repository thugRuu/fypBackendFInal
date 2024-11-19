const mongoose = require("mongoose")

const recommendationSchema = mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',
        unique: true }, 
    recommendation :{
        type: Array,
        required:true
    }
})
module.exports = mongoose.model("Recomendation",recommendationSchema)