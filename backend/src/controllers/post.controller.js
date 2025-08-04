const userModel = require("../models/user.model")
const uploadImg = require('../services/storage.service')
const generateImageCaption = require('../services/ai.service')
const resformater = require("../utils/responseFormatter")


async function generateCaption(req, res){
   
 
const {role} = req.body
 const rol = JSON.parse(role)

 const file = req.file
 const response = await generateImageCaption(file,rol)
//  const captions =  await resformater(response)

 res.status(201).json({
   msg:'done',
   response
 })
    
}

module.exports = {generateCaption}