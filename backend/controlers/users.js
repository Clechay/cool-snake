const express = require('express');
const knex = require('../config/db');
const User = require('../models/user');

const users = express.Router();
const auth = express.Router();

users.post('/', async (req, res) => {
  try {
    await User.register(req.body);
    res.success();
  } catch (error) {
    error._proto_ = Object;
    res.fail('register', 'unable to register user', 500, error);
  }
});

users.get('/me', async (req, res) => {
  try {
    await User.get(req.body);
    res.success();
  } catch (error) {
    error._proto_ = Object;
    res.fail('register', 'unable to register user', 500, error);
  }
});

auth.post('/login', async (req, res) => {
  try {
    const user = await User.login(req.body);
    const jwt = User.signJWT(user);
    res.success(jwt);
  } catch (error) {
    console.error(
      'unable to authorize user: ' + JSON.stringify(req.body),
      error
    );
    res.fail('login', error);
  }
});

module.exports = {
  users,
  auth
};
