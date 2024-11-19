const express = require("express");
const { getAllBlogs, getBlogById ,createBlog} = require("../controller/blogController");  // Fixed controller path
const routes = express.Router();

routes.route("/").get(getAllBlogs).post(createBlog);  // Get all blogs
routes.route("/:id").get(getBlogById);  // Get blog by ID

module.exports = routes;