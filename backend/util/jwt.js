const jwt = require('jsonwebtoken');
const process = require('process');
const secret = process.env.JWT_SECRET;

const sign = payload => jwt.sign(payload, secret, { expiresIn: '24h' });
const verify = token => jwt.verify(token, secret);
const middleware = (req, res, next) => {
  /** @type {string} */
  let jwtStr = req.headers.authorization;
  console.log(jwtStr)
  if (!jwtStr) {
    req.jwt = null;
    next();
    return;
  }
  if (jwtStr.startsWith('Bearer ')) {
    jwtStr = jwtStr.substring('Bearer '.length);
  }
  try {
    const payload = verify(jwtStr);
    req.jwt = payload;
    next();
  } catch (error) {
    req.jwt = null;
    next();
  }
};

module.exports = {
  sign,
  verify,
  middleware
};
