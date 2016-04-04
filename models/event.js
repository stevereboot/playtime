// models/event.js

var mongoose = require('mongoose');

// Define Schema
var schema = new mongoose.Schema({
	parent: String,
	child: String,
	change: Number,
	message: String,
	remaining: Number
});

// Define model
model = mongoose.model('Event', schema);

module.exports = model;