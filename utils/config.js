require('dotenv').config();

const {
  PORT = 3000,
  DB_URL = 'mongodb://localhost:27017/moviesdb',
  NODE_ENV,
  JWT_SECRET,
} = process.env;

module.exports = {
  PORT,
  DB_URL,
  NODE_ENV,
  JWT_SECRET,
};
