// db.js

const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/personbasee', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});
