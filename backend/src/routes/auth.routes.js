const express = require('express')
const {registerController , loginController , verify} = require('../controllers/auth.controller')
const auth = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/register' , registerController)
router.post('/login' , loginController)
router.get('/verify',auth , verify )


module.exports = router