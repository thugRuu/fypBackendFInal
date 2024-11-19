const express = require('express')
const {createUser,getUser, getUserForSignIn, updateUser, getUserById, deleteUser,getUserAnswers} =require ("../controller/userController")
const routes = express.Router()

routes.route('/').get(getUser).post(createUser)
routes.route("/signin").post(getUserForSignIn)
routes.route("/:id").put(updateUser).get(getUserById).delete(deleteUser)


module.exports = routes;

