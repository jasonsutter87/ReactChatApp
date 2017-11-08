import openSocket from 'socket.io-client';
import axios from 'axios';
const socket = openSocket('http://localhost:8000');

function subscribeToMessages(cb) {
  socket.on('move', message => cb(null, message));
  socket.emit('subscribeToMessages', 500);
}

function subscribeToOnlineUsers(cb) {
  socket.on('onlineUsers', users => cb(null, users));
  socket.emit('subscribeToOnlineUsers', 500);
}


function subscribeSendMessage(message) {
  socket.emit('subscribeSendMessage', message);
}

function newUser(user) {
  socket.emit('newUser', user);
}




export { subscribeToMessages, subscribeSendMessage, subscribeToOnlineUsers, newUser };
