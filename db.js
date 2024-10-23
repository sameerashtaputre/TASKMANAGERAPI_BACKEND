require('dotenv').config(); // Ensure this is at the top
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL; // Read from .env
const DB_NAME = process.env.DB_NAME; // Read from .env

console.log('MONGO_URL:', MONGO_URL); // Check if MONGO_URL is loaded

mongoose.connect(MONGO_URL, { dbName: DB_NAME })
  .then(() => console.log('Connected to database'))
  .catch((err) => console.error('Error connecting to database:', err));
