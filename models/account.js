// models/account.js

var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

// Define Schema
var schema = new mongoose.Schema({
	username: String,
	password: String,
	type: String,
	parent: String,
	time_rem: Number
});

schema.plugin(passportLocalMongoose);

// Define model
model = mongoose.model('Account', schema);

module.exports = model;