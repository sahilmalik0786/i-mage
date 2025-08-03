const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerController(req, res) {
  const { username , password } = req.body;
 
  const isUserAlreadyExists = await userModel.findOne({ username });
 
  if(isUserAlreadyExists){
    return res.status(401).json({
      message: "user is already exists",
    });
  }
 
  
  const user = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
  res.cookie("token", token);

  res.status(201).json({
    message: "user created successfully",
    user,
  });
}

async function loginController(req, res) {
  const { username, password } = req.body;

  const user = await userModel.findOne({ username });

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
async function verify(req,res) {
   const user = req.user
   res.status(200).json({
    message:'success',
    user
   })
  
}

module.exports = { registerController ,  loginController ,verify};
