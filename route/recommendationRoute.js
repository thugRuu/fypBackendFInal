const express = require('express')
const {getSugessionDetail, deleteRecoomendation} = require("../controller/recommendationController")
const routes = express.Router()

routes.route("/:id").get(getSugessionDetail).delete(deleteRecoomendation)
module.exports=routes