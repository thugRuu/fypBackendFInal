const mongoose = require("mongoose")
const resultSchema = mongoose.Schema({
    userId:{type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User',},
    result:{type:String}}) 

module.exports = mongoose.model("Result",resultSchema)