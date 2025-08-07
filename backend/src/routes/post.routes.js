const express = require('express')
const auth = require('../middlewares/auth.middleware')
const {generateCaption, getUserHistory} = require('../controllers/post.controller')
const multer = require('multer')

const router = express.Router()
const upload = multer({storage:multer.memoryStorage()})


router.post('/' ,auth ,upload.single('image'), generateCaption)
router.get('/history' , auth , getUserHistory)


module.exports = router