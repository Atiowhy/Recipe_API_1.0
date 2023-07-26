const jwt = require('jsonwebtoken');
require('dotenv').config();

const Protect = async (req, res, next) => {
  try {
    let {authorization} = req.headers
    console.log('headers');
    let bearer = authorization.split(" ")
    console.log(bearer);

    let decode = await jwt.verify(bearer[1], process.env.JWT_TOKEN)
    console.log('decode');
    console.log(decode);
    req.payload = decode
    next()
  } catch (error) {
    return res.status(404).json({status: 404, message: 'TOKEN WRONG',error})
  }
};

module.exports = Protect