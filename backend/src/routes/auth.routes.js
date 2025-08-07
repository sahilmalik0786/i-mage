const express = require('express')
const {registerController , loginController , verify, emailVerify ,verifyEmailController, logout} = require('../controllers/auth.controller')
const auth = require('../middlewares/auth.middleware')

const router = express.Router()

router.post('/register' , registerController)
router.post('/login' , loginController)
// persist login verification
router.get('/verify',auth, verify )
// send email for account verification
router.post('/verifyEmail', emailVerify)
router.get('/verify-email' , verifyEmailController)
router.post('/logout' , auth, logout)


module.exports = router