const Blog = require("../mode/blogSchema");

const createBlog = async (req, res) => {
    const { title, date, content, author,imageURL } = req.body;  // Extract data from the request body
  
    // Validate the data
    if (!title || !date || !content || !author|| !imageURL) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    // Create a new blog post
    const newBlog = new Blog({
      title,
      date,
      content,
      author,
      imageURL
    });
  
    try {
      const savedBlog = await newBlog.save();  // Save the new blog to the database
      res.status(201).json(savedBlog);  // Respond with the newly created blog
    } catch (error) {
      res.status(500).json({ message: error.message });  // Handle errors
    }
  };
async function getAllBlogs(req, res) {
    try {
      const blogData = await Blog.find();  // Get all blogs
      res.json(blogData);
    } catch (error) {
      res.status(500).json({ message: error.message });  // Handle error
    }
  }
  
  const getBlogById = async (req, res) => {
    try {
      const blogData = await Blog.findById(req.params.id);  // Corrected model name
      if (!blogData) {
        return res.status(404).json({ message: "Blog not found" });
      }
      res.json(blogData);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  module.exports = {
    getAllBlogs,
    getBlogById,
    createBlog
  };