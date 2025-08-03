const express = require('express')
const auth = require('../middlewares/auth.middleware')
const {generateCaption} = require('../controllers/post.controller')
const multer = require('multer')

const router = express.Router()
const upload = multer({storage:multer.memoryStorage()})


router.post('/' ,auth ,upload.single('image'), generateCaption)


module.exports = router