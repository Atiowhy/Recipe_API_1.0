const jwt = require('jsonwebtoken')
require('dotenv').config()

const GenerateToken = data =>{
 console.log('data');
 console.log(data);

 const token = jwt.sign(data, process.env.JWT_TOKEN)
 console.log(token);
 return token
}
module.exports = GenerateToken