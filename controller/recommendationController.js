const Recommendation = require("../mode/sugessionSchema") 

async function getSugessionDetail (req,res){
  
    try{
        const sugession = await Recommendation.findOne({userId:req.params.id})
        if (!sugession) {
            return res.json({message:"No Recomendation"})
        }
        res.json(sugession)
    }catch(e){
        console.log(e)
    }
}
const deleteRecoomendation = async (req,res)=>{
    console.log(req.params.id)
    const userID = req.params.id;
  
    // Check if userID is provided
    if (!userID) {
      return res.status(400).json({ message: 'User ID is required' });
    }
  
    try {
      // Attempt to delete the Recommendation
      const result = await Recommendation.deleteOne({ userId: userID });
  
      // If no document was deleted
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'No Recommendation found for the given user ID' });
      }
  
      // Successful deletion
      res.status(200).json({ message: 'Recommendation deleted successfully' });
    } catch (err) {
      // Handle any errors
      console.error(err);
      res.status(500).json({ message: 'Failed to delete Recommendation', error: err.message });
    }
  }

module.exports={getSugessionDetail,deleteRecoomendation}