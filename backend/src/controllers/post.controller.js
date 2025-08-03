const userModel = require("../models/user.model")
const uploadImg = require('../services/storage.service')
const generateImageCaption = require('../services/ai.service')
const resformater = require("../utils/responseFormatter")


async function generateCaption(req, res){
   
 
 const file = req.file
 const response = await generateImageCaption(file)
 const captions =  await resformater(response)

 res.status(201).json({
   msg:'done',
   captions
 })
    
}

module.exports = {generateCaption}