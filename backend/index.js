const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

const knex = require('./config/db');
const User = require('./models/user');
const jwt = require('./util/jwt')

app.use(jwt.middleware);
app.use(bodyParser.json());
app.use(require('./util/responseBuilder').middleware);

const rooms = require('./controlers/rooms');
rooms.init(io);
const users = require('./controlers/users').users;
const auth = require('./controlers/users').auth;

app.use('/rooms',rooms.route);
app.use('/users',users);
app.use('/auth',auth);

app.use(express.static('public'));



http.listen(5000, function() {
  console.log('listening on *:5000');
});
