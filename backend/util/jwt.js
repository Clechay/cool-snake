const jwt = require('jsonwebtoken');
const process = require('process');
const secret = process.env.JWT_SECRET;

module.exports = {
	sign: (payload)=>jwt.sign(payload, secret, { expiresIn: '24h' }),
	verify: (token)=>jwt.verify(token,secret),
}