const express = require ("express")
const dotenv = require('dotenv')
const dbconnect = require('./database/db')
const user = require("./mode/userSchema")
var cors = require('cors')
dotenv.config()
dbconnect()

const port = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

app.get("/",(req, res)=>{
    res.send("hello")
})
app.use("/api/user",require("./route/userRoute"))
app.use("/api/question",require("./route/questionRoute"))
app.use("/api/analysis", require("./route/analysisRoute"));
app.use("/api/prediction", require("./route/predictionRoute"));
app.use("/api/blogs", require("./route/blogRoute"));
app.use("/api/sugession", require("./route/recommendationRoute"));





app.listen(port,()=>{
    console.log(`server is running in port:${port}`)
}) 