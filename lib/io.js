// lib/io.js

module.exports = function(server) {
	var io = require('socket.io')(server);

	io.on('error', function(err){
		throw err;
	})

	// Set Socket.io listeners by creating a socket.io middleware
	// attachEventlisteners would live in `/controllers`
	// io.use(attachEventlisteners);

	io.on('connection', function(socket) {
		console.log(socket.id + ' connected');

		// Listen for client msgs and send to all clients
		socket.on('timeUpdate', function(msg) {
			io.emit('timeUpdate', msg);
		});

	});

	return io; 
}