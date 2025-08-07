const userModel = require("../models/user.model")
const uploadImg = require('../services/storage.service')
const generateImageCaption = require('../services/ai.service')
const postModel = require("../models/post.model")




async function generateCaption(req, res){
   
 
const {role} = req.body
 const rol = JSON.parse(role)
 const user = req.user
 const file = req.file
 
 const response = await generateImageCaption(file,rol)
//  const captions =  await resformater(response)
// const upload = await uploadImg(file)
const post = await postModel.create({
  image:'kk',
  // caption:response,
  user:user._id
})
   await userModel.findByIdAndUpdate(user._id,{
  $push :{
    history: {
      action: 'generate the content',
      tag:`${rol?.name}`,
      post: post._id
    }
  }
 })
 
 res.status(201).json({
   msg:'done',
   response,
   user
   
  
 })
    
}

async function getUserHistory(req , res) {
  try {
    const user = req.user;
   
    await user.populate({
      path: 'history.post',
      select: 'image caption',
    });

  
    
    res.status(200).json({ history: user.history });
  } catch (err) {
     console.error('Error fetching history:', err);
    res.status(500).json({ message: 'Error fetching history' });
  }
}

module.exports = {generateCaption , getUserHistory}