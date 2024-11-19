const express = require('express')
const {createQuestion,deleteQuestion,editQuestion,getQuestion} =require ("../controller/questionController")
const routes = express.Router()

routes.route('/').get(getQuestion).post(createQuestion)
routes.route("/:id").put(editQuestion).delete(deleteQuestion)



module.exports = routes;

