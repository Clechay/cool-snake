const db = require('../config/db')

const User = {
	register: (form) => {
		const { id, nick, email, code, profile, pass } = form;
		const password_hash = pass;
		const password_salt = '';
		db('users').insert({ id, nick, email, code, 
									profile, email, password_hash, password_salt });
	}
}

module.exports = User;