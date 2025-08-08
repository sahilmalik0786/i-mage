const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sendVerificationEmail = require('../services/mail_verification.service');



// register/signup
async function registerController(req, res) {
  const { username , password , email} = req.body;
  
  const isUserAlreadyExists = await userModel.findOne({ email });
  
  if(isUserAlreadyExists){
    return res.status(401).json({
      message: "this email is already registered",
    });
  }
  const user = await userModel.create({
    username,
    email,
    password: await bcrypt.hash(password, 10),
    
  });
  const verificationToken = jwt.sign({id:user._id},process.env.JWT_EMAIL_VERIFICATION_KEY)
   user.mailVerifyToken = verificationToken
   await user.save()
   


   res.status(201).json({
    message: "user created successfully !please verify your email",
    user
   });
}


//login 
async function loginController(req, res) {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: "user not found",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  
  if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials", // Same message as above
      });
    }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
  res.cookie('token', token, {
  httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            maxAge: 24 * 60 * 60 * 1000,
            path: '/'
});
  res.status(201).json({
    message: "login successfully",
    user,
  });
}

//verifyemail
async function verifyEmailController(req, res) {
  const { token } = req.query;

  try {
    const decoded = jwt.verify(token, process.env.JWT_EMAIL_VERIFICATION_KEY);
    console.log(decoded.id)
    console.log('jii')
    const user = await userModel.findById(decoded.id);
    
    if (!user || user.mailVerifyToken !== token) {
      return res.status(400).json({ message: 'Invalid verification token' });
    }
    
    user.isVerified = true;
    user.mailVerifyToken = null;
    await user.save();
         
    res.status(200).json({ message: 'Email verified successfully' });
  } catch (err) {
    return res.status(400).json({ message: 'Token expired r invalid' });
  }
//   let decoded;
// try {
//   decoded = jwt.verify(token, process.env.JWT_EMAIL_VERIFICATION_KEY);
//   console.log('Decoded token:', decoded);
//   res.status(200).json({
//     message:'verified'
//   })
// } catch (err) {
//   console.error('Token verification failed:', err.message);
//   return res.status(400).json({ message: 'Invalid or expired token' });
// }
}

//send email for verfication 
async function emailVerify(req,res) {
     try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(401).json({
        message: 'User is already verified'
      });
    }

    await sendVerificationEmail(user.email, user.mailVerifyToken);

    res.status(200).json({
      message: 'Email has been sent. Check your inbox to verify.'
    });
  } catch (error) {
    console.error('emailVerify error:', error); // ✅ log the actual error
    res.status(500).json({
      message: 'Internal Server Error',
      error: error.message || error
    });
  }
}

//to ensure persist login 
async function verify(req,res) {
   const user = req.user
   
   res.status(200).json({
    message:'success',
    user
   })
  
}

//logout controller 
async function logout(req , res) {
   
  res.clearCookie('token', {
    httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
           
            
  });

  return res.status(200).json({ message: 'Logged out successfully' });
   
  
}

module.exports = { registerController ,  loginController ,verify ,verifyEmailController , emailVerify ,logout};
