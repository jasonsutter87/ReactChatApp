const io = require('socket.io')();
require('dotenv').config()
const port = process.env.PORT || 8000;


io.on('connection', (client) => {
  // here you can start emitting events to the client
  client.on('subscribeToTimer', (interval) => {
    console.log('client is subscribing to timer with interval: ', interval)
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  })
});

io.listen(port);
console.log('listening on port ', port);
