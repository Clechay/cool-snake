const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const knex = require('./config/db');

const User = require('./models/user');

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('user', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  console.log('a user connected');
});

http.listen(5000, function() {
  console.log('listening on *:5000');
});
