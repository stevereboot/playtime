// app.js

// Express app
var express = require('express');
var app = express();

// Modules
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// Authentication
var session = require('express-session');
var passport = require('passport');
var localStrategy = require('passport-local');

// DB
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/playtime');

// Passport
var Account = require('./models/account');
passport.use(new localStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

// Socket
var io = require('socket.io');

// app.use(favicon(path.join(__dirname, 'public/img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({ 
	secret: 'ad4f56a4f6',
	resave: 'false',
	saveUninitialized: false
	 }));
app.use(passport.initialize());
app.use(passport.session());

// Routes (after static)
app.use('/api', require('./routes/api/index'));
app.use('/', require('./routes/index'));	// Declare last

module.exports = app;