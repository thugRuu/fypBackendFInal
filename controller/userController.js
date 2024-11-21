
const user = require("../mode/userSchema")
const { sign } = require("jsonwebtoken");

const genrateToken = (id) => {
    return sign({ id }, process.env.JWT_SECRET, {expiresIn: "30d"});
  };

const createUser=async (req,res)=>{
    const validate = await user.findOne({username:req.body.username})
  
    if (!validate){
        const userData= await user.create({
            username:req.body.username,
            password:req.body.password,
            email:req.body.email,
            country:req.body.country,
            city:req.body.city,
            role:req.body.role
        })
        res.send(userData)
    }
    else{
        res.send("username already exist")
    }
    }
const getUser = async(req,res)=>{
        userData = await user.find()
        res.json(userData)
    }
const getUserById = async (req,res)=>{
    userData = await user.findById(req.params.id)
    res.json(userData)
}
const updateUser = async(req,res)=>{
    userData = await user.findById(req.params.id)
    if(userData){
        userData.username = req.body.username,
        userData.password=req.body.password,
        userData.email=req.body.email,
        userData.country = req.body.country,
        userData.city = req.body.city
        const saveData = await userData.save()
        res.json(saveData)    
    }
}
const deleteUser = async(req,res)=>{
    const userData = await user.findByIdAndDelete(req.params.id)
    res.json(userData)

}
const getUserForSignIn = async (req,res) =>{
        const userDetail = await user.findOne({username:req.body.username});
        console.log(req.body)
        if (!userDetail){
            res.json({
                message:"Invalid Username "
            })
        }
        else {
            if (userDetail.password === req.body.password){
                res.json({
                    _id:userDetail._id,
                    username:userDetail.username,
                    role:userDetail.role,
                    token:genrateToken(userDetail._id)
                })
            } else {
                console.log("invalid password")
                res.json({ message: "invalid passowrd " });
              }
        }
        
}
const getUserAnswers= async (req,res)=>{
    const userDetail = await user.findOne({username:req.body.username})
    console.log(req.body, "resbody")
    console.log(userDetail,"details")
    res.send("ss")
}
    module.exports={
        getUser,
        createUser,
        getUserForSignIn,
        updateUser,
        getUserById,
        deleteUser,
        getUserAnswers,
    }