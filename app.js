require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { urlServer } = require('./utils/constants');
const routes = require('./routes');
const errorHandler = require('./middlewares/error-determinant');

const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect(urlServer);

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.get('/', (req, res) => res.send('It\'s working!'));
app.use(routes);

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
