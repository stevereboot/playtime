// lib/io.js

module.exports = function(server){
  var io = require('socket.io')(server);

  io.on('error', function(err){
    throw err;
  })

  // // Set Socket.io listeners by creating a socket.io middleware
  // // attachEventlisteners would live in `/controllers`
  // io.use(attachEventlisteners);

  io.on('connection', function(socket) {
	console.log(socket.id + ' connected');


  });

  return io; 
}