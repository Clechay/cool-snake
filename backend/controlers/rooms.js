// plansza jest 100/100
const boardWidth = 100;
const boardHeight = 100;
const minTargetLifespan = 100; // in ms
const maxTargetLifespan = 1000; // in ms
const minTargetInterval = 100; // in ms
const maxTargetInterval = 1000; // in ms

let io = null;

function randomLifespan() {
  const delta = maxTargetLifespan - minTargetLifespan;
  const randomDelta = Math.random() * delta;
  return Math.floor(minTargetLifespan + randomDelta);
}

function randomTarget() {
  const target = {
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    lasts: randomLifespan(),
    since: 0,
    to: 0
  };
  target.since = Date.now();
  target.to = target.since;
  return target;
}

class Room {
  static rooms = new Map();
  static register = id => {
    if (rooms.has(id)) throw 'room id taken';
    const newRoom = new Room(id);
    this.rooms.set(id, newRoom);
  };
  static route = e => {
    if (e && e.roomId) {
      if (this.rooms.has(e.roomId)) this.rooms.get(e.roomId).handle(e);
    }
  };
  static getList = () => {
    const list = [];
    for (const room of this.rooms.values) {
      list.push({
        id: room.roomId,
        count: room.players.length
      });
    }
    return list;
  };

  constructor(roomId) {
    this.roomId = roomId;
  }
  roomId = '';
  status = 'inactive'; // inactive, accelerating, fullspeed, on-site
  targets = new Set();
  players = [];
  acceleratingInterval = -1;
  acceleratingCountdown = 10;
  activate = () => {
    this.status = 'accelerating';
    this.acceleratingInterval = setInterval(() => {
      io.to(this.roomId).emit('countdown', this.acceleratingCountdown);
      if (this.acceleratingCountdown === 0) {
        clearInterval(this.acceleratingInterval);
        io.to(this.roomId).emit('room-state', 'fullspeed');
      }
      this.acceleratingCountdown--;
    });
  };
  click = payload => {};
  handle = payload => {
    if (payload.type === 'activate') {
      if (this.status === 'inactive') this.activate();
    }
    if (payload.type === 'click') {
      if (this.status === 'fullspeed') this.click(payload);
    }
  };
}

const express = require('express');
const route = express.Router();

route.get('/', async (req, res) => {
  res.success(Room.getList());
});

route.get('/:roomId', async (req, res) => {
  if (Room.rooms.has(req.params.roomId)) {
    res.success(Room.rooms.get(req.params.roomId));
  } else res.fail('load room', 'selected room does not exist');
});

route.post('/:roomId', async (req, res) => {
  try {
    Room.register(req.params.roomId);
    res.success({ id: req.params.roomId });
  } catch (error) {
    res.fail('register room', 'selected roomId is not avaiable');
  }
});

module.exports = {
  init: remoteIO => {
    io = remoteIO;
    io.on('connection', function(socket) {
      console.log('a user connected');
    });
  },
  route
};
