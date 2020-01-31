const db = require('../config/db');
const uuidv4 = require('uuid/v4');

const User = {
  register: async form => {
    const { nick, email, code, profile, pass } = form;
    const password_hash = pass;
    const password_salt = '';
    return db('users').insert({
      id:uuidv4(),
      nick,
      email,
      code,
      profile,
      email,
      password_hash,
      password_salt,
      profile:{}
    });
  },
  login: async form => {
    const {login, pass} = form;
    const user = await db.from('books')
      .select('nick', 'email', 'password_hash', 'password_salt')
      .where(
        function(){
          this
            .where('nick',login)
            .orWhere('email',login)
        }
      )
  }
};

module.exports = User;
