"use strict";

var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');
require('dotenv').config();
var app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
var connection = mongoose.connection;
connection.once('open', function () {
  console.log('MongoDB database connection established successfully');
});

// Routes
app.use('/api/users', require('./routes/users'));
var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server is running on port ".concat(PORT));
});