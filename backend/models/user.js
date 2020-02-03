const db = require('../config/db');
const uuidv4 = require('uuid/v4');
const crypto = require('../util/crypto');
const jwt = require('../util/jwt');

const User = {
  register: async form => {
    const { nick, email, code, profile, pass } = form;
    const password_hash = pass;
    const password_salt = '';
    return db('users').insert({
      id: uuidv4(),
      nick,
      email,
      code,
      profile,
      email,
      password_hash,
      password_salt,
      profile: {}
    });
  },
  signJWT: user => {
    const { id, nick, email } = user;
    return jwt.sign({
      id,
      nick,
      email
    });
  },
  login: async form => {
    const { login, pass } = form;
    const users = await db
      .from('users')
      .select('id', 'nick', 'email', 'password_hash', 'password_salt')
      .where(function() {
        this.where('nick', login).orWhere('email', login);
      });
    if (!users.length) throw 'account missing from db';
    const user = users[0];
    console.log(user);
    const providedPassHash = await crypto.hash(pass);
    if (user.password_hash !== providedPassHash) {
      console.log(`got:${providedPassHash}|expected:${user.password_hash}`);
      throw 'wrong password';
    }
    return user;
  }
};

module.exports = User;
