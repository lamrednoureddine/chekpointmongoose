// app.js
require('dotenv').config();
const express = require('express');
const db = require('./db');
const Person = require('./models/person');
const app = express();




app.get('/')
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
