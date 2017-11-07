import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

function subscribeToMessages(cb) {
  socket.on('move', message => cb(null, message));
  socket.emit('subscribeToMessages', 500);
}

function subscribeSendMessage(message) {
  socket.emit('subscribeSendMessage', message);
}


export { subscribeToMessages, subscribeSendMessage };
