const io = require('socket.io')();
require('dotenv').config()
const port = process.env.PORT || 8000;

//Initial state that is shared with the client
let state = {
  messages: [],
}

//Starting a server side connection with socket.io
io.on('connection', (client) => {
  //When client callssubscribeSendMessage push the message
  //into the message array
  client.on('subscribeSendMessage', (message) => {
    state.messages.push(message);
  })

  //When Client calls subscribeToMessages update the client to include
  //all the messages from the server
  client.on('subscribeToMessages', (interval) => {
    setInterval(() => {
      client.emit('move', state.messages);
    }, interval);
  })
});

//Lisen to the port that is defined in the dotenv file or default of 8000
io.listen(port);
console.log('listening on port ', port);
