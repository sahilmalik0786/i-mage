const jwt = require('jsonwebtoken')
const userModel = require('../models/user.model')

async function auth(req, res, next) {
  const token = req.cookies.token;
//   console.log(token)
  if (!token) {
    return res.status(401).json({
      msg: "token not found",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const user = await userModel.findOne({
    _id: decoded.id
  })
  req.user
    next();
  } catch (error) {
    res.status(401).json({
      msg: "Unauthorized",
      error,
    });
  }
}


module.exports = auth