const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const bodyParser = require('body-parser');

const knex = require('./config/db');
const User = require('./models/user');

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/users', (req, res) => {
  console.log(req);
  console.error(req.body);
  User.register(req.body).then( ()=>res.send('ok') )
});

io.on('connection', function(socket) {
  console.log('a user connected');
});

http.listen(5000, function() {
  console.log('listening on *:5000');
});
