require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { urlServer } = require('./utils/constants');
const auth = require('./middlewares/auth');

const {
  createUser,
  login,
} = require('./controllers/users');
const routerUsers = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect(urlServer);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get('/', (req, res) => res.send('It\'s working!'));

app.post(
  '/signup',
  createUser,
);

app.post(
  '/signin',
  login,
);

app.use(auth);

app.use('/', routerUsers);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
