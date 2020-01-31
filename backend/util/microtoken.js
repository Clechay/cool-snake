const MicroDB = require('./microdb');
const User = require('../models/user');

class MicrotokenSet{
	db;
	constructor(){
		this.db = new MicroDB();
	}
	test = (token) => {
		this.db.find('token')
	}
	create = (nick,timeout,account) => {}
	invalidate = (token) => {}
}